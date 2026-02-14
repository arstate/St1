import React from 'react';
import { IntervalData, SlideProps } from '../../types';

const dataUAS: IntervalData[] = [
  { interval: '60 – 65', freq: 3 },
  { interval: '66 – 71', freq: 6 },
  { interval: '72 – 77', freq: 11 },
  { interval: '78 – 83', freq: 5 },
  { interval: '84 – 89', freq: 4 },
  { interval: '90 – 95', freq: 1 },
];

const dataMath: IntervalData[] = [
  { interval: '65 – 67', freq: 2 },
  { interval: '68 – 70', freq: 5 },
  { interval: '71 – 73', freq: 13 },
  { interval: '74 – 76', freq: 14 },
  { interval: '77 – 79', freq: 4 },
  { interval: '80 – 82', freq: 2 },
];

const TableComponent = ({ title, data }: { title: string; data: IntervalData[] }) => {
  const total = data.reduce((acc, curr) => acc + curr.freq, 0);
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 flex flex-col h-full">
      <div className="bg-indigo-600 text-white p-3 font-semibold text-center">
        {title}
      </div>
      <div className="grid grid-cols-2 bg-indigo-50 font-semibold p-2 text-sm text-indigo-900 border-b">
        <div className="text-center">Interval</div>
        <div className="text-center">Frekuensi</div>
      </div>
      <div className="divide-y divide-gray-100 overflow-auto flex-1">
        {data.map((row, idx) => (
          <div key={idx} className="grid grid-cols-2 p-2 hover:bg-gray-50 text-sm">
            <div className="text-center text-gray-700">{row.interval}</div>
            <div className="text-center text-gray-600">{row.freq}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 p-2 bg-gray-100 font-bold border-t text-sm">
        <div className="text-center">Total</div>
        <div className="text-center">{total}</div>
      </div>
    </div>
  );
};

export const SlideFormatif1: React.FC<SlideProps> = () => {
  return (
    <div className="h-full flex flex-col p-8 bg-white">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        Tes Formatif 1 & 2: Tabel Distribusi Frekuensi
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        <div className="flex flex-col h-full">
          <TableComponent title="Data UAS (30 Mhs)" data={dataUAS} />
        </div>
        
        <div className="flex flex-col h-full space-y-4">
          <TableComponent title="Nilai Matematika (40 Siswa)" data={dataMath} />
          <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-sm">
            <h4 className="font-bold text-green-800 mb-2">Analisis Interval (Formatif 2)</h4>
            <ul className="list-disc list-inside space-y-1 text-green-900">
              <li><strong>Banyak Interval Kelas:</strong> 6 Kelas</li>
              <li><strong>Panjang Kelas:</strong> 3 (cth: 65, 66, 67)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};