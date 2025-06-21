import React, { useContext, useEffect } from 'react'
import Footer from '../components/Footer'
import './checkout.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { StoreContext } from '../contexts/StoreContext';
import { CiCreditCard1 } from "react-icons/ci";
import { BiSolidOffer } from "react-icons/bi";
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import Model from '../components/Model';

const CheckoutPage = () => {
  const {isLoaded, isSignedIn, user} = useUser()
  const userId = isLoaded && isSignedIn ? user.id : null;

  const location = useLocation();
  const navigate = useNavigate();
  const { backendUrl, cartItems , totalAmount, totalItems, rupee } = useContext(StoreContext);

  const buyNowItem = location.state?.buyNowItem;
  const items = buyNowItem ? [buyNowItem] : cartItems?.items;
  const total = buyNowItem ? buyNowItem.price * buyNowItem.quantity : cartItems.totalAmount;
  const platformFee = 5
  const lastTotal = total+platformFee
  const [address, setAddress] = useState([])
  const [openAuthModel, setopenAuthModel] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState({})


    const getAddress = async()=>{
    try {
      const {data} = await axios.get(backendUrl + '/api/user/get-address', {params:{userId}})
      if(data.success){
        setSelectedAddress(data.addresses[0])
        setAddress(data.addresses)
      } else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }



  useEffect(()=>{
    getAddress()
    console.log(items)
  },[userId])

  const handleSelected = (item)=>{
    setSelectedAddress(item)
  }



const nextpage = ()=>{
  if(address.length === 0){
    toast.error("Please add Address")
  } else{
    navigate('/payment-summary', { state: { total: lastTotal, items:items, address:selectedAddress } });
  }
}


  return (

      <div className="flex flex-col items-center justify-center lg:px-90 md:mt-10">
        <div className="bg-[#F2F2F2] py-2 px-3 w-full rounded-md">
          <h2 className='font-medium text-2xl text-gray-800'>Order Summary</h2>
          <hr className='my-1 text-gray-400'/>
          {
            Array.isArray(items) && items.map((item, index)=>(
              <div className='my-5 cursor-pointer' key={index}>
                  <div className='flex gap-3'>
                    <div><img src={item.image} className='w-30' alt="" /></div>
                    <div>
                        <p className='md:text-xl text-md font-medium text-neutral-800 line-clamp-2'>{item.name}</p>
                        <p className='text-md font-medium text-neutral-800'>size: {item.unit}</p>
                        <p className='flex text-md font-medium text-neutral-800 font-sans'>qty: <p>{item.quantity}</p></p>
                        <span className='font-sans flex gap4 items-center'><p>₹ {item.price * item.quantity}</p><p className='text-sm text-gray-500 line-through ml-3'>₹ 3345</p><p className='text-green-600 ml-3'>{item.discount ?? 0}% off</p></span>
                        <p className='flex text-sm font-sans text-gray-700'>Delevery by: {item.deliveryDate}</p>
                    </div>
                    <p className='text-sm text-green-600 mt-1 ml-9 hidden md:block'>free delevary</p>
                    
                </div>
                
                <hr className='text-gray-400 mt-1' />
            </div>
            ))
          }
          <div>
            {
              selectedAddress && (
                <div>
              <p className='text-neutral-900 ml-1 mb-1 font-medium'>Deliver to :</p>
              <div className='flex gap-3 font-sans items-center ml-1'><p>{selectedAddress.name}</p><div className='px-2 py-[2px] rounded-sm bg-gray-50 border-1 border-gray-200 text-neutral-600 cursor-pointer'>{selectedAddress.type}</div></div>
              <div className='flex rounded-sm bg-white py-1 px-3 shadow-sm gap-1 justify-between items-center my-2'>
                <div className='text-neutral-700'>
                <span className='flex gap-1'>
                  <p>{selectedAddress.city}</p>,
                  <p>{selectedAddress.state}</p>
                </span>
                <span className='flex gap-1'>
                  <p>{selectedAddress.ine1}</p>,
                  <p>{selectedAddress.line2}...</p>
                </span>
                </div>
                <button onClick={()=>setopenAuthModel(true)} className='border-1 border-gray-300 rounded-sm py-1 px-2 text-emerald-600 font-medium cursor-pointer'>Change</button>
              </div>
            </div>
              )
            }

            {
              address.length === 0 ?(
                <div className='w-full flex items-center justify-center mb-2'>
                  <button onClick={()=>navigate('/address')} className='py-2 bg-gray-800 rounded-md text-white px-6'>+ Add Address</button>
                </div>
              ):(
                <div></div>
              )
            }
            
          
            <div className='w-full bg-[#E3F6FF] flex justify-between items-center px-2 py-[2px] text-neutral-800 text-[15px]'>
              <CiCreditCard1 />
              <p>Continue to next page for Bank Offers</p>
            </div>

            <div className='bg-white rounded-lg my-2 py-3 px-4 shadow-sm border-1 border-gray-200'>
              <h1 className='text-black font-medium text-[18px]'>Price Details</h1>
              <hr className='my-2 text-[#EBE8DB] border-dotted gap-1' />
              <div className='font-sans'>
                <span className='flex items-center justify-between'><p className='text-gray-700'>Price ({items[0].quantity} item)</p><p>{rupee} {total}</p></span>
                <span className='flex items-center justify-between'><p className='text-gray-700'>Platform Fee</p><p>{rupee} 5</p></span>
                <span className='flex items-center justify-between'><p className='text-gray-700'>Discount</p><p className='text-green-800'>{Array.isArray(items) && items.reduce((acc, item) => acc + (item.discount || 0), 0) / items.length} %</p></span>
                <span className='flex items-center justify-between'><p className='text-gray-700'>Delevery Chargs</p><p className='text-green-800 gap-2 flex'><span className='text-gray-400 line-through'>{rupee}40</span>Free</p></span>
              </div>
              <hr className='my-2 text-gray-400 border-dotted gap-1' />
              <span className='flex items-center justify-between font-medium text-neutral-950 font-sans'><p className=''>Total Amount</p><p>{rupee} {lastTotal}</p></span>
              <div className='flex my-2 py-1 px-2 bg-green-100 rounded-lg mx-2 items-center gap-2 text-md text-green-800 justify-center'>
                <BiSolidOffer />
                <p>You will save 320 on this order !</p>
              </div>
            </div>

          </div>

          
          <button onClick={()=>{nextpage();scrollTo(0,0)}} className='bg-emerald-600 text-white px-4 py-2 cursor-pointer font-sans'>
            CONTINUE
          </button>
        </div>

        <Model
        isOpen={openAuthModel}
        onClose={()=>{
          setopenAuthModel(false);
        }}
        hideHeader
      >
        <div className='w-full bg-gray-50 h-[80vh] flex justify-center py-5'>

        <div className='bg-white py-4 px-5 shadow-md min-h-[50vh] md:w-[40vw] w-full overflow-scroll scroll-hide'>
            <h1 className='font-bold text-xl'>Select a Address</h1>
            {
              address.length > 0 ?(
                <div>
                {address.map((item, index) => (
                  <div key={index} onClick={()=>handleSelected(item)} className={`mt-4 cursor-pointer pl-2 text-neutral-700 relative font-sans flex flex-wrap gap-2 w-full rounded-lg py-4 ${selectedAddress._id === item._id ? 'border-2 border-blue-700' : 'border-1 border-gray-300'}`}>
                    <p>{item.name},</p>
                    <p>{item.mobile},</p>
                    <p>{item.city},</p>
                    <p>{item.state},</p>
                    <p>{item.line1},</p>
                    <p>{item.line2},</p>
                  </div>
                ))}
                </div>
              ):(
                <div className='mt-4 flex w-full border-1 border-gray-300 rounded-lg items-center justify-center py-4'>
                No address yet
                </div>
              )
            }
            
            

            <button onClick={()=>setopenAuthModel(false)} className='w-full mt-3 py-3 cursor-pointer hover:bg-white hover:text-black border-1 border-black duration-300 bg-neutral-800 text-white rounded-sm text-lg font-medium'>Select</button>
        </div>

      </div>
      </Model>
      <Footer />
      </div>
      

  )
}

export default CheckoutPage
