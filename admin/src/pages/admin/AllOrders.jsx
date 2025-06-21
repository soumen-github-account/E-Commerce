import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'
import { FaPhone } from "react-icons/fa6";
import toast from 'react-hot-toast';
import axios from 'axios';
import Model from '../../components/Model';
import { useState } from 'react';

const AllOrders = () => {
  const [isOpen, setIsOpen] = useState(false)
    const {allorder, setAllorder, totalOrder, setTotalOrder} = useContext(AppContext)
    const [statusData, setStatusData] = useState([])

    const orderUpdateHandler = async(id, orderStatus)=>{
      try {
        const {data} = await axios.post(`http://localhost:8000/api/product/order-update/${id}`, {orderStatus})

        if(data.success){
          toast.success(data.message)

        //   const updatedOrders = allorder.map(order =>
        //   order._id === id ? { ...order, orderStatus: orderStatus } : order
        // )
        // setAllorder(updatedOrders)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    const openStatus = async(id)=>{
      try {
        const {data} = await axios.get(`http://localhost:8000/api/product/get-order-status/${id}`)
        if(data.success){
          setIsOpen(true)
          setStatusData(data.items)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
    
  return (
    <div className='w-full px-5'>
        <div className="bg-white w-full p-4 rounded shadow-md">
          <h1 className='text-xl mt-2 py-2 text-emerald-700 font-bold'>All Product ({totalOrder})</h1>
    
    
        <div className='w-full bg-blue-600 text-white py-2 px-10 flex items-center justify-between'>
          <span>ORDER ID</span>
          <span>PAYMENT METHOD</span>
          <span>NAME</span>
          <span>PHONE</span>
          <span>ADDRESS</span>
          <span>ACTION</span>
        </div>
        <div className='h-[33vw] overflow-scroll scroll-hide'>
          {
           Array.isArray(allorder) && allorder.length > 0 ? (
            allorder.slice().reverse().map((item, index)=> (
            <div key={index} className={`flex justify-between items-center border-b-1 border-b-gray-500 py-2 ${item.orderStatus === 'Delivered' ? 'bg-green-400 line-through' : item.orderStatus === 'Cancelled' ? 'bg-red-400 line-through' : ''}`}>
              <div className='flex flex-col'>
                {item._id}
                <Link onClick={()=>openStatus(item._id)} className='text-blue-600 underline'>Click to view product</Link>
              </div>

              <div className='text-red-500'>
                {item.paymentType}
              </div>
              <div className='flex gap-x-2 items-center'>
                <p>
                {new Date(item.date).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
                </p> |
                <p>
                {item.address.name}
                </p>
              </div>
              <div className='flex gap-x-1 items-center'>
                <FaPhone />
                +91-{item.address.mobile}
              </div>
              <div>
                <span className='flex items-center'><p>{item.address.city}</p>, <p>{item.address.state}</p> , <p>{item.address.pincode}</p></span>
                <span className='flex items-center'><p>{item.address.line1}</p>, <p>{item.address.line2}</p></span>
              </div>
               <div>
                  <select
                    value={item.orderStatus}
                    onChange={(e) => orderUpdateHandler(item._id, e.target.value)} 
                    className="border rounded px-2 py-1 text-sm">

                    <option value="Order Confirmed">Order Confirmed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out For Delivery">Out For Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              <Model isOpen={isOpen} setIsOpen={setIsOpen} data={statusData}>
              </Model>
            </div>
          ))):
          (<div>Empty</div>)
        }
        </div>
        </div>
        
        </div>
  )
}

export default AllOrders
