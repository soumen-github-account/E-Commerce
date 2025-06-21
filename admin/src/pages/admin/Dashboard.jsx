import React from 'react'
import customer from '../../assets/Vector.png'
import orderimg from '../../assets/Order.png'
import balanceimg from '../../assets/solar_dollar-bold.png'
import growthimg from '../../assets/growth.png'
import productimg from '../../assets/shopping-bag-outline.png'
import ChartLine from '../../components/ChartLine'
import DoughnutChart from '../../components/DoughnutChart'
import Tasks from '../../components/Tasks'
import CustomerReview from '../../components/CustomerReview'
import MonthlySalesChart from '../../components/MonthlySalesChart'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'


const Dashboard = () => {
  const {totalCustomer, totalProduct, totalOrder, totalBalance} = useContext(AppContext)
  return (
    <div className='w-full px-2 py-2'>
      <div className='flex w-full items-center justify-between px-3 py-2'>
        <div className='flex flex-col items-center px-15 py-3 rounded-md shadow-lg gap-1'>
            <img src={customer} className='w-10' alt="" />
            <p className='text-gray-600 text-lg font-medium'>Total Customer</p>
            <p className='text-[19px] font-medium text-gray-800'>{totalCustomer}</p>
        </div>
        <div className='flex flex-col items-center px-15 py-3 rounded-md shadow-lg gap-1'>
            <img src={productimg} className='w-10' alt="" />
            <p className='text-gray-600 text-lg font-medium'>Total Product</p>
            <p className='text-[19px] font-medium text-gray-800'>{totalProduct}</p>
        </div>
        <div className='flex flex-col items-center px-15 py-3 rounded-md shadow-lg gap-1'>
            <img src={orderimg} className='w-10' alt="" />
            <p className='text-gray-600 text-lg font-medium'>Total Orders</p>
            <p className='text-[19px] font-medium text-gray-800'>{totalOrder}</p>
        </div>
        <div className='flex flex-col items-center px-15 py-3 rounded-md shadow-lg gap-1'>
            <img src={balanceimg} className='w-10' alt="" />
            <p className='text-gray-600 text-lg font-medium'>Total Balance</p>
            <p className='text-[19px] font-medium text-gray-800'>{totalBalance}</p>
        </div>
        <div className='flex flex-col items-center px-15 py-3 rounded-md shadow-lg gap-1'>
            <img src={growthimg} className='w-10' alt="" />
            <p className='text-gray-600 text-lg font-medium'>Earn Growth</p>
            <p className='text-[19px] font-medium text-gray-800'>67%</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded p-4">
          <h2 className="font-semibold mb-2">Goal Completion</h2>
      <ChartLine />
      </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="font-semibold mb-2">Order Status</h2>
          <DoughnutChart />
        </div>
        <Tasks />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <MonthlySalesChart />
        <CustomerReview />
      </div>
    </div>
  )
}

export default Dashboard
