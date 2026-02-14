import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Download, Maximize } from 'lucide-react';
import { SlideCover } from './components/slides/SlideCover';
import { SlideLatihan1 } from './components/slides/SlideLatihan1';
import { SlideLatihan2 } from './components/slides/SlideLatihan2';
import { SlideLatihan3 } from './components/slides/SlideLatihan3';
import { SlideFormatif1 } from './components/slides/SlideFormatif1';
import { SlideFormatif2Charts } from './components/slides/SlideFormatif2Charts';
import { Button } from './components/Button';

// Declare html2pdf for TypeScript since it's loaded via CDN
declare const html2pdf: any;

const SLIDES = [
  SlideCover,
  SlideLatihan1,
  SlideLatihan2,
  SlideLatihan3,
  SlideFormatif1,
  SlideFormatif2Charts
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Touch handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Swipe threshold
  const minSwipeDistance = 50;

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlide((prev) => Math.min(prev + 1, SLIDES.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, SLIDES.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const enterFullscreen = () => {
    containerRef.current?.requestFullscreen().catch(err => {
      console.error(`Error attempting to enable fullscreen: ${err.message}`);
    });
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    // If in fullscreen, exit first to ensure proper rendering context
    if (document.fullscreenElement) {
        await document.exitFullscreen();
    }

    // Give time for the layout to change to 'print mode' (all slides visible) and charts to render without animation
    setTimeout(() => {
        const element = document.getElementById('slide-container');
        if (!element) return;
        
        const opt = {
          margin: 0,
          filename: 'statistika-presentation.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, scrollY: 0 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
        };

        if (typeof html2pdf !== 'undefined') {
          html2pdf().set(opt).from(element).save().then(() => {
            setIsExporting(false);
          });
        } else {
            console.error('html2pdf not found');
            setIsExporting(false);
            alert('PDF Export library not loaded. Please check internet connection.');
        }
    }, 2500); // Increased wait time to 2.5s to ensure rendering completion
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center font-sans text-slate-800 p-4 sm:p-8 relative">
      
      {/* Main Container */}
      <div 
        id="slide-container"
        ref={containerRef}
        className={`bg-white shadow-2xl rounded-xl overflow-hidden relative transition-all duration-300
          ${isExporting ? 'w-[297mm]' : 'w-full max-w-6xl aspect-video'}
          ${isFullscreen ? 'w-full h-full rounded-none' : ''}
        `}
        onTouchStart={!isExporting ? onTouchStart : undefined}
        onTouchMove={!isExporting ? onTouchMove : undefined}
        onTouchEnd={!isExporting ? onTouchEnd : undefined}
      >
        {/* Fullscreen Toggle Button - Only show if NOT exporting and NOT in fullscreen */}
        {!isExporting && !isFullscreen && (
             <div className="absolute top-4 right-4 z-50">
                 <Button 
                    variant="icon" 
                    onClick={enterFullscreen} 
                    className="bg-white/80 hover:bg-white shadow-sm backdrop-blur-sm transition-all hover:scale-110"
                    title="Enter Fullscreen"
                 >
                     <Maximize size={20} />
                 </Button>
             </div>
        )}

        {isExporting ? (
          /* PRINT MODE: Render all slides vertically */
          <div className="flex flex-col">
            {SLIDES.map((SlideComponent, index) => (
              <div key={index} className="w-full aspect-video border-b-2 border-gray-100 break-after-page page-break-always">
                <SlideComponent isExporting={true} />
              </div>
            ))}
            <style>{`
              .page-break-always { page-break-after: always; }
            `}</style>
          </div>
        ) : (
          /* INTERACTIVE MODE: Render single slide */
          <div className="w-full h-full relative group">
            <div className="w-full h-full animate-fade-in">
              {React.createElement(SLIDES[currentSlide], { isExporting: false })}
            </div>

            {/* Bottom Controls Bar - Hide in Fullscreen */}
            {!isFullscreen && (
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex justify-between items-end transition-opacity duration-300">
                
                {/* Left: Info & Actions */}
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    <div className="text-gray-500 text-sm font-medium bg-white/90 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm border border-gray-100">
                      {currentSlide + 1} / {SLIDES.length}
                    </div>
                    
                    <Button 
                        variant="secondary" 
                        onClick={handleExportPDF}
                        className="flex items-center gap-2 text-sm shadow-sm bg-white/90 hover:bg-white backdrop-blur-sm border-gray-200"
                        disabled={isExporting}
                    >
                        <Download size={16} />
                        <span className="hidden sm:inline">Download PDF</span>
                        <span className="sm:hidden">PDF</span>
                    </Button>
                </div>
                
                {/* Right: Navigation */}
                <div className="flex gap-2">
                    <Button 
                        variant="icon" 
                        onClick={prevSlide} 
                        disabled={currentSlide === 0}
                        className={`bg-white/90 hover:bg-white shadow-sm backdrop-blur-sm border border-gray-100 ${currentSlide === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
                    >
                        <ArrowLeft size={24} />
                    </Button>
                    <Button 
                        variant="icon" 
                        onClick={nextSlide} 
                        disabled={currentSlide === SLIDES.length - 1}
                        className={`bg-white/90 hover:bg-white shadow-sm backdrop-blur-sm border border-gray-100 ${currentSlide === SLIDES.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
                    >
                        <ArrowRight size={24} />
                    </Button>
                </div>
            </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}