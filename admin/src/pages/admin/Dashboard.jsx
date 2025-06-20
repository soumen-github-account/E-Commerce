import React from 'react'
import customer from '../../assets/Vector.png'
import orderimg from '../../assets/Order.png'
import balanceimg from '../../assets/solar_dollar-bold.png'
import growthimg from '../../assets/growth.png'
import productimg from '../../assets/shopping-bag-outline.png'


const Dashboard = () => {
  return (
    <div className='w-full px-2 py-2'>
      <div className='flex w-full items-center justify-between px-3 py-2'>
        <div className='flex flex-col items-center px-15 py-3 rounded-md shadow-lg gap-1'>
            <img src={customer} className='w-10' alt="" />
            <p className='text-gray-600 text-lg font-medium'>Total Customer</p>
            <p className='text-[19px] font-medium text-gray-800'>354</p>
        </div>
        <div className='flex flex-col items-center px-15 py-3 rounded-md shadow-lg gap-1'>
            <img src={productimg} className='w-10' alt="" />
            <p className='text-gray-600 text-lg font-medium'>Total Product</p>
            <p className='text-[19px] font-medium text-gray-800'>344</p>
        </div>
        <div className='flex flex-col items-center px-15 py-3 rounded-md shadow-lg gap-1'>
            <img src={orderimg} className='w-10' alt="" />
            <p className='text-gray-600 text-lg font-medium'>Total Orders</p>
            <p className='text-[19px] font-medium text-gray-800'>652</p>
        </div>
        <div className='flex flex-col items-center px-15 py-3 rounded-md shadow-lg gap-1'>
            <img src={balanceimg} className='w-10' alt="" />
            <p className='text-gray-600 text-lg font-medium'>Total Balance</p>
            <p className='text-[19px] font-medium text-gray-800'>7536</p>
        </div>
        <div className='flex flex-col items-center px-15 py-3 rounded-md shadow-lg gap-1'>
            <img src={growthimg} className='w-10' alt="" />
            <p className='text-gray-600 text-lg font-medium'>Earn Growth</p>
            <p className='text-[19px] font-medium text-gray-800'>67%</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
