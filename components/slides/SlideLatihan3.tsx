import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { WaterData, SlideProps } from '../../types';

const data: WaterData[] = [
  { month: 'Jan', value: 300 }, { month: 'Feb', value: 250 },
  { month: 'Mar', value: 400 }, { month: 'Apr', value: 350 },
  { month: 'May', value: 300 }, { month: 'Jun', value: 200 },
  { month: 'Jul', value: 100 }, { month: 'Aug', value: 400 },
  { month: 'Sep', value: 250 }, { month: 'Oct', value: 300 },
  { month: 'Nov', value: 350 }, { month: 'Dec', value: 200 },
];

export const SlideLatihan3: React.FC<SlideProps> = ({ isExporting }) => {
  return (
    <div className="h-full flex flex-col p-8 bg-white">
      <h2 className="text-3xl font-bold text-gray-800 mb-2 border-b pb-2">
        Latihan 3: Kebutuhan Air Minum
      </h2>
      
      <div className="mb-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <p className="text-blue-900 text-lg">
          <strong>Kesimpulan:</strong> Peningkatan kebutuhan air paling banyak terjadi pada <span className="text-blue-700 font-bold">Bulan Agustus</span> (peningkatan sebesar 300 liter dari Juli ke Agustus).
        </p>
      </div>

      <div className="flex-1 min-h-[300px] w-full bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
         <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="month" tick={{fill: '#6B7280'}} axisLine={false} tickLine={false} />
            <YAxis tick={{fill: '#6B7280'}} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1F2937', color: '#fff', borderRadius: '8px', border: 'none' }}
              itemStyle={{ color: '#fff' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              name="Liter Air" 
              stroke="#2563EB" 
              strokeWidth={4} 
              dot={{ r: 6, fill: '#2563EB', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 8 }}
              isAnimationActive={!isExporting}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};