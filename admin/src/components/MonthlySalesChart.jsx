import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

const salesDataByYear = {
  2024: [
    { month: 'JAN', sales: 180000 },
    { month: 'FEB', sales: 160000 },
    { month: 'MAR', sales: 80000 },
    { month: 'APRIL', sales: 120000 },
    { month: 'MAY', sales: 90000 },
    { month: 'JUNE', sales: 60000 },
    { month: 'JULY', sales: 0 },
    { month: 'AUG', sales: 0 },
    { month: 'SEP', sales: 0 },
    { month: 'OCT', sales: 0 },
    { month: 'NOV', sales: 0 },
    { month: 'DEC', sales: 0 },
  ],
  2025: [
    { month: 'JAN', sales: 280000 },
    { month: 'FEB', sales: 132000 },
    { month: 'MAR', sales: 72000 },
    { month: 'APRIL', sales: 147570 },
    { month: 'MAY', sales: 76000 },
    { month: 'JUNE', sales: 48000 },
    { month: 'JULY', sales: 0 },
    { month: 'AUG', sales: 0 },
    { month: 'SEP', sales: 0 },
    { month: 'OCT', sales: 0 },
    { month: 'NOV', sales: 0 },
    { month: 'DEC', sales: 0 },
  ],
};

const MonthlySalesChart = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const data = salesDataByYear[selectedYear];

  return (
    <div className="bg-white shadow-md rounded p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Total Sales</h2>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border px-2 py-1 rounded-md text-gray-700 shadow-sm"
        >
          {Object.keys(salesDataByYear).map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload?.length) {
                return (
                  <div className="bg-gray-900 text-cyan-300 text-sm p-2 rounded shadow">
                    <p className="font-semibold text-yellow-300">{label}</p>
                    <p>sales : {payload[0].value.toLocaleString()}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          <Bar dataKey="sales" fill="#0050FF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySalesChart;
