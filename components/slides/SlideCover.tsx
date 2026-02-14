import React from 'react';
import { SlideProps } from '../../types';

export const SlideCover: React.FC<SlideProps> = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8 border-4 border-double border-blue-200 rounded-xl">
      <div className="bg-white p-12 rounded-2xl shadow-xl max-w-3xl w-full">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-6 tracking-tight">
          Penyajian Data Statistik
        </h1>
        <div className="h-2 w-32 bg-blue-500 mx-auto mb-8 rounded-full"></div>
        <h2 className="text-2xl text-gray-600 font-light mb-4">
          Latihan & Tes Formatif
        </h2>
        <p className="text-gray-500">
          Visualisasi Data dan Pembahasan Soal
        </p>
      </div>
    </div>
  );
};