import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { StoreContext } from '../contexts/StoreContext'
import { useUser } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import Footer from '../components/Footer'
import Model from '../components/Model'
import OrderModel from '../components/OrderModel'
import { RxCross2 } from 'react-icons/rx'
import InvoiceDownload from '../components/InvoiceDownload'
import { useNavigate } from 'react-router-dom'

const OrderPage = () => {
    const {backendUrl} = useContext(StoreContext)
    const { isLoaded, isSignedIn, user } = useUser()
    const userId = isLoaded && isSignedIn ? user.id : null;
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()
    const [deliveryDate, setDeliveryDate] = useState('');
    const [openAuthModel, setopenAuthModel] = useState(false)
    const [statusData, setStatusData] = useState({})

    const openStatus = async(id)=>{
      try {
        const {data} = await axios.get(backendUrl + `/api/user/get-order-status/${id}`)
        if(data.success){
          setopenAuthModel(true)
          setStatusData(data.order)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    const getOrder = async()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/user/get-order', {params:{userId}})
            
            if(data.success){
                if (data.success) {
            // Map each order and compute a fixed delivery date
            const updatedOrders = data.orders.map(order => {
                const orderDate = new Date(order.date);
                const daysToAdd = 3; // Fixed 3 days or change logic here
                const deliveryDate = new Date(orderDate);
                deliveryDate.setDate(orderDate.getDate() + daysToAdd);

                return {
                    ...order,
                    deliveryDate: deliveryDate.toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                    }),
                };
            });

            setOrders(updatedOrders);
        }
            } else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if (userId) {
            getOrder()
         console.log(orders)
        }
    },[userId])
    // useEffect(()=>{
    //     setDeliveryDate(generateDeliveryDate());
    // },[])

    const InvoiceDownload = async(item)=>{
        navigate('/invoice', { state: { order: item } })
    }
    

  return (
    <div>
      <Header />

      <div className='w-full'>
        <div className='md:ml-37 mt-10 md:pr-50 px-4'>
            <h1 className='font-medium text-3xl my-5'>My Orders</h1>
            {
                orders.length === 0 ? (
                    <p>No items yet</p>
                ) :
                (
                    <div className=' h-[80vh] overflow-scroll py-6 scroll-hide flex flex-col gap-4'>
                        {
                            orders.map((item, index)=>(
                                <div key={index} className='border-1 font-sans text-gray-700 border-gray-300 rounded-lg px-6 py-6'>
                                    <div className='md:flex text-lg justify-between'>
                                        <span className='flex gap-2'>OrderId : <p>{item._id}</p></span>
                                        <span className='flex gap-2'>Payment : <p>{item.paymentType}</p></span>
                                        <span className='flex gap-2'>Total amount: <p>{item.amount}</p></span>
                                    </div>
                                    {
                                        item.items?.slice().reverse().map((subItem, subIndex)=>(
                                            <div className='md:flex items-center justify-between my-2' key={subIndex}>
                                                <div><img src={subItem.image} className='w-22' alt="" /></div>
                                                <div>
                                                    <p className='text-lg font-medium line-clamp-2'>{subItem.name}</p>
                                                    <p>Order Date: {new Date(item.date).toLocaleDateString('en-IN', {
                                                            day: '2-digit',
                                                            month: 'long',
                                                            year: 'numeric'
                                                        })}
                                                    </p>
                                                    {
                                                        orders.items?.length === 0 ? (
                                                            <p>Expected Delivery: {subItem.deliveryDate}</p>
                                                        ) : 
                                                        (
                                                            <p>Expected Delivery: {item.deliveryDate}</p>
                                                        )
                                                    }
                                                    
                                                </div>
                                                <div>
                                                    <p>Quantity: {subItem.quantity}</p>
                                                    <span className='flex items-center gap-x-2'>Status: <p className='text-lg text-green-700'>{item.orderStatus}</p></span>
                                                </div>
                                                <div>
                                                    <span className='flex'>Price : <p>{subItem.price}</p></span>
                                                </div>
                                            
                                                
                                            </div>
                                        ))
                                    }
                                    <Model
                                        isOpen={openAuthModel}
                                        onClose={()=>{
                                        setopenAuthModel(false);
                                        }}
                                        hideHeader
                                    >
                                        <OrderModel data={statusData} orders={orders} index={index} />
                                        <RxCross2 onClick={()=>setopenAuthModel(false)} className='cursor-pointer absolute right-3 top-3 rounded-full p-2 hover:bg-gray-200 text-[35px]'/>
                                    </Model>

                                    <div className='flex gap-x-3 items-center'>
                                        <button onClick={()=>openStatus(item._id)} className='text-emerald-700 underline cursor-pointer'>Check Status</button>
                                        <button
                                        onClick={()=>{InvoiceDownload(item); scrollTo(0,0)}}
                                        className="bg-gray-200 border-1 border-gray-400 text-gray-700 px-4 py-1 rounded text-sm cursor-pointer"
                                        >
                                        Download Invoice
                                        </button>
                                    </div>
                                    
                                    
                                </div>
                            ))
                        }

                    </div>
                )
            }
        </div>
      </div>
        

      <Footer />
    </div>
  )
}

export default OrderPage
