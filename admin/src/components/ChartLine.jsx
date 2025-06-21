import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: '05 Dec', goal: 100 },
  { date: '10 Dec', goal: 150 },
  { date: '15 Dec', goal: 130 },
  { date: '20 Dec', goal: 170 },
  { date: '25 Dec', goal: 140 },
];
const ChartLine = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="goal" stroke="#3b82f6" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ChartLine
