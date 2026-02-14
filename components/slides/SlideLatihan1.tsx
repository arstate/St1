import React from 'react';
import { FrequencyData, SlideProps } from '../../types';

const data: FrequencyData[] = [
  { value: 66, freq: 2 }, { value: 67, freq: 1 }, { value: 68, freq: 2 },
  { value: 69, freq: 1 }, { value: 70, freq: 2 }, { value: 71, freq: 3 },
  { value: 72, freq: 6 }, { value: 73, freq: 3 }, { value: 74, freq: 8 },
  { value: 75, freq: 5 }, { value: 76, freq: 1 }, { value: 78, freq: 2 },
  { value: 79, freq: 2 }, { value: 80, freq: 2 }
];

export const SlideLatihan1: React.FC<SlideProps> = () => {
  const total = data.reduce((acc, curr) => acc + curr.freq, 0);

  return (
    <div className="h-full flex flex-col p-8 bg-white">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        Latihan 1: Distribusi Frekuensi Tunggal
      </h2>
      <div className="flex-1 overflow-hidden flex flex-col items-center">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 flex flex-col h-full">
          <div className="bg-blue-600 text-white p-3 font-semibold grid grid-cols-2 text-center">
            <div>Nilai</div>
            <div>Frekuensi (f)</div>
          </div>
          <div className="overflow-y-auto flex-1">
            <table className="w-full text-center">
              <tbody className="divide-y divide-gray-100">
                {data.map((row) => (
                  <tr key={row.value} className="hover:bg-blue-50 transition-colors">
                    <td className="py-2 text-gray-700 font-medium">{row.value}</td>
                    <td className="py-2 text-gray-600">{row.freq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-100 p-3 font-bold grid grid-cols-2 text-center border-t border-gray-200">
            <div>Total</div>
            <div>{total}</div>
          </div>
        </div>
      </div>
    </div>
  );
};