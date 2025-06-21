import React from 'react'
import { useState } from 'react';
import { FaArrowDown } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const Model = ({isOpen, setIsOpen, data}) => {
    
    if(!isOpen){
        return null;
    }

  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-transparent'>
      <div className={`relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden`}>
        <RxCross2 onClick={()=>setIsOpen(false)} className='cursor-pointer absolute right-3 top-3 rounded-full p-2 hover:bg-gray-200 text-[35px]'/>
            <div className=' h-[80vh] overflow-scroll py-10 mt-3 px-8 scroll-hide flex flex-col gap-4'>
                {
                    data.map((item, index)=>(
                        <div className='flex justify-between border-b-1 py-2 hover:bg-gray-100 px-2 gap-x-3 rounded-md border-b-gray-500'>
                            <img src={item.image} className='w-13' alt="" />
                            <span className='flex flex-col'>
                            <p className='line-clamp-2 text-gray-700 w-40 text-sm font-medium'>{item.name}</p>
                            <p className='text-gray-800 text-[16px]'>Unit: {item.unit}</p>
                            </span>
                            |
                            <span className='flex flex-col'>
                            <p>Qty: {item.quantity}</p>
                            <p className='flex gap-x-2 items-center'><span className='flex gap-1 items-center text-green-700'><FaArrowDown />{item.discount}%</span> <p className='text-[18px] text-gray-800'>Rs. {item.price} /-</p></p>
                            </span>
                            <span className='text-gray-700 flex flex-col text-[15px]'><p>Delevery by: </p><p>{item.deliveryDate}</p></span>
                        </div>
                    ))
                }

            </div>
      </div>
    </div>
  )
}

export default Model
