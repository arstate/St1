import React from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell 
} from 'recharts';
import { IntervalData, SlideProps } from '../../types';

const data: IntervalData[] = [
  { interval: '65-67', freq: 2 },
  { interval: '68-70', freq: 5 },
  { interval: '71-73', freq: 13 },
  { interval: '74-76', freq: 14 },
  { interval: '77-79', freq: 4 },
  { interval: '80-82', freq: 2 },
];

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57'];

export const SlideFormatif2Charts: React.FC<SlideProps> = ({ isExporting }) => {
  return (
    <div className="h-full flex flex-col p-6 bg-white">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
        Visualisasi Data Matematika (Formatif 2d)
      </h2>
      
      <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">
        
        {/* Bar Chart */}
        <div className="bg-white border rounded-lg shadow-sm p-2 flex flex-col">
          <h3 className="text-center font-semibold text-gray-600 mb-2 text-sm">Diagram Batang</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="interval" tick={{fontSize: 10}} interval={0} />
                <YAxis tick={{fontSize: 10}} />
                <Tooltip contentStyle={{fontSize: 12}} />
                <Bar 
                  dataKey="freq" 
                  fill="#8884d8" 
                  name="Frekuensi"
                  isAnimationActive={!isExporting}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white border rounded-lg shadow-sm p-2 flex flex-col">
          <h3 className="text-center font-semibold text-gray-600 mb-2 text-sm">Diagram Garis</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="interval" tick={{fontSize: 10}} interval={0} />
                <YAxis tick={{fontSize: 10}} />
                <Tooltip contentStyle={{fontSize: 12}} />
                <Line 
                  type="monotone" 
                  dataKey="freq" 
                  stroke="#82ca9d" 
                  strokeWidth={3} 
                  dot={{r:4}} 
                  isAnimationActive={!isExporting}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white border rounded-lg shadow-sm p-2 flex flex-col">
          <h3 className="text-center font-semibold text-gray-600 mb-2 text-sm">Diagram Lingkaran</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={60}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="freq"
                  nameKey="interval"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                  isAnimationActive={!isExporting}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};