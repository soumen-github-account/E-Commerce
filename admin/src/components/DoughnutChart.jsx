import { useContext } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { AppContext } from '../context/AppContext';
import { useEffect } from 'react';
import { useState } from 'react';


const COLORS = ['#22c55e', '#facc15', '#ef4444'];

const DoughnutChart = () => {
  const {allorder} = useContext(AppContext)

  const [chartData, setChartData] = useState([
    { name: 'Delivered', value: 0 },
    { name: 'Pending', value: 0 },
    { name: 'Cancelled', value: 0 },
  ]);

  
  useEffect(()=>{
    if (!Array.isArray(allorder)) return;
    let deliveredCount = 0;
    let cancelledCount = 0;
    let pendingCount = 0;
    Array.isArray(allorder) && allorder.forEach(order => {
    if (order.orderStatus === 'Cancelled') {
      cancelledCount++;
    } else if (order.isDelivered) {
      deliveredCount++;
    } else {
      pendingCount++;
    }
  });
  setChartData([
      { name: 'Delivered', value: deliveredCount },
      { name: 'Pending', value: pendingCount },
      { name: 'Cancelled', value: cancelledCount },
    ]);
  },[allorder])

  return (
    <PieChart width={250} height={250}>
      <Pie
        data={chartData}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {chartData.map((entry, i) => (
          <Cell key={`cell-${i}`} fill={COLORS[i]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default DoughnutChart;
