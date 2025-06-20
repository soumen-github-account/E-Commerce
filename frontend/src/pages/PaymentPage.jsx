import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { StoreContext } from '../contexts/StoreContext'
import axis from '../assets/axis.jpeg'
import razor from '../assets/razorpay-logo.png'
import gpay from '../assets/gpay.png'
import PhonePeLogo from '../assets/PhonePe-Logo.png'
import paytm from '../assets/paytm.png'
import { BsCashCoin } from "react-icons/bs";
import { useUser } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { ImSpinner9 } from 'react-icons/im'

const PaymentPage = () => {
  const {isSignedIn, isLoaded, user} = useUser();
  const userId = isLoaded && isSignedIn ? user.id : null;
  const {backendUrl, loading, setLoading} = useContext(StoreContext)
  const [selected, setSelected] = useState('Online Payment');
  const {rupee} = useContext(StoreContext)
  const location = useLocation()
  const total = location.state?.total
  const items = location.state?.items
  const address = location.state?.address

  const [orderSuccess, setOrderSuccess] = useState(false);

  //popup
  const navigate = useNavigate();

  useEffect(() => {
    if (orderSuccess) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [orderSuccess, navigate]);

  const orderhandler = async()=>{
    try {
      setLoading(true)
      const {data} = await axios.post(backendUrl + '/api/user/order-placed', {userId, items, amount:total, address, paymentType: selected})
      if(data.success){
        setOrderSuccess(true)
        setLoading(false)
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const onlinePayment = async()=>{
    try{
      toast.error("online payment is disable for demo !")
    } catch{
      toast.error(error.message)
    }
    
  }


  return (
    <div className='flex w-full h-[100vh] bg-[#F1F0E9] items-center justify-center'>
      <div className={`w-[90vw] mt-4 bg-[#F1F0E9] rounded-md ${orderSuccess ? 'blur-sm':""}`}>
        <div className='bg-white px-2 py-2 shadow-sm'>
        <div className='rounded-md font-medium font-sans bg-blue-100 flex items-center justify-between text-blue-800 px-2 py-2'>
            <p>Total Amount</p><p>{rupee} {total}</p>
        </div>
        <div className='w-full flex items-center justify-between rounded-lg bg-green-200 text-green-900 px-3 py-2 my-3'>
          <div>
              <p>5% Cashback</p>
              <p>Claim now with payment offers</p>
          </div>
            <img src={axis} className='w-8 rounded-full' alt="" />
        </div>
        </div>
        <hr className='my-3 text-gray-400 border-dotted' />
        <div className='bg-white my-1 shadow-sm py-2 px-2 font-sans'>
            <div>
                <span className='flex items-center justify-between gap-3 cursor-pointer' onClick={() => setSelected('Online Payment')}>
                  <div className='flex gap-2 items-center py-2 px-3'>
                    <input
                      type="radio"
                      checked={selected === 'Online Payment'}
                      className="w-5 h-5 rounded-full text-blue-600 accent-blue-600"
                    />
                      <p className='text-blue-900'>Razor Pay</p>
                  </div>
                  
                  <img src={razor} className='w-30' alt="" />  
                </span>
                {selected === 'Online Payment' && (
                <div className='w-full flex items-center justify-center my-4'>
                  <button onClick={()=>onlinePayment()} className='bg-blue-800 rounded-sm py-1 px-20 text-white cursor-pointer'>Pay {rupee} {total}</button>
                </div>
                )}
            </div>
            <hr className='text-gray-400 border-dotted' />
            <span className='flex items-center justify-between py-1 px-3'>
              <p>Google Pay</p>
              <img src={gpay} className='w-15' alt="" />
            </span>
            <hr className='text-gray-400 border-dotted' />
            <span className='flex items-center justify-between py-1 px-3'>
              <p>Phone Pay</p>
              <img src={PhonePeLogo} className='w-20' alt="" />
            </span>
            <hr className='text-gray-400 border-dotted' />
            <span className='flex items-center justify-between py-1 px-3'>
              <p>Paytem</p>
              <img src={paytm} className='w-13' alt="" />
            </span>
            <hr className='text-gray-400 border-dotted' />
            <span className='flex items-center justify-between py-1 px-3 my-2 cursor-pointer' onClick={() => setSelected('Cash On Delevery')} >
              <div className='flex gap-3 items-center'>
                <input
                  type="radio"
                  checked={selected === 'Cash On Delevery'}
                  className="w-5 h-5 rounded-full text-blue-600 accent-blue-600"
                />
                <BsCashCoin className='text-xl mt-2' />
              </div>
              <p className='font-medium'>Cash on Delevery</p>
            </span>
            {selected === 'Cash On Delevery' && (
            <div className='w-full flex items-center justify-center my-4'>
              {
                loading ?
                <button className='md:px-7 md:py-2 px-4 py-2 flex items-center text-white bg-emerald-600 rounded-full cursor-pointer md:text-[17px] text-md'><ImSpinner9 className='text-md animate-spin' />Please Wait...</button>
                
                :
                <button className='bg-emerald-800 rounded-sm py-1 px-20 text-white cursor-pointer' onClick={orderhandler}>Place Order</button>
              }
            </div>
            )}
        </div>
      </div>

      {
        orderSuccess && (
            <div className="fixed inset-0 bg-transparent bg-opacity-40 flex items-center justify-center z-50 px-4">
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center animate-scale-in">
                <div className="text-green-500 text-5xl mb-2">✓</div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
                <p className="text-gray-600">You will get your product to your ordered placed.</p>
              </div>
            </div>
        )
      }
      
    </div>
  )
}

export default PaymentPage
