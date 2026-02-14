import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { StudentData, SlideProps } from '../../types';

const data: StudentData[] = [
  { faculty: 'Ekonomi', count: 130 },
  { faculty: 'Teknik', count: 150 },
  { faculty: 'Hukum', count: 125 },
  { faculty: 'Psikologi', count: 126 },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

export const SlideLatihan2: React.FC<SlideProps> = ({ isExporting }) => {
  return (
    <div className="h-full flex flex-col p-8 bg-white">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        Latihan 2: Data Mahasiswa Perguruan Tinggi
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
        {/* Table Section */}
        <div className="md:col-span-1 flex flex-col justify-center">
          <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fakultas</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item.faculty}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.faculty}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart Section */}
        <div className="md:col-span-2 flex flex-col">
          <div className="flex-1 min-h-[300px] bg-gray-50 rounded-xl p-4 border border-gray-100">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="faculty" tick={{fill: '#4B5563'}} />
                <YAxis tick={{fill: '#4B5563'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  cursor={{fill: 'transparent'}}
                />
                <Legend />
                <Bar 
                  dataKey="count" 
                  name="Jumlah Mahasiswa" 
                  radius={[6, 6, 0, 0]} 
                  animationDuration={1500} 
                  isAnimationActive={!isExporting}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % 20]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};