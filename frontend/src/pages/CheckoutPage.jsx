import React, { useContext } from 'react'
import Footer from '../components/Footer'
import './checkout.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { StoreContext } from '../contexts/StoreContext';
import { CiCreditCard1 } from "react-icons/ci";
import { BiSolidOffer } from "react-icons/bi";

const CheckoutPage = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems , totalAmount, totalItems, rupee } = useContext(StoreContext);

  const buyNowItem = location.state?.buyNowItem;
  const items = buyNowItem ? [buyNowItem] : cartItems;
  const total = buyNowItem ? buyNowItem.price * buyNowItem.quantity : totalAmount;
  const platformFee = 5
  const lastTotal = total+platformFee

  const address = [
  {
    "id": "addr1",
    "fullName": "Soumen Das",
    "mobileNumber": "9876543210",
    "addressLine1": "22B, Lake Road",
    "city": "Kolkata",
    "state": "West Bengal",
    "pincode": "700029",
    "country": "India",
    "addressType": "Home",
    "isDefault": true
  },
  {
    "id": "addr2",
    "fullName": "Soumen Das",
    "mobileNumber": "9876543210",
    "addressLine1": "17, Sector 5",
    "city": "Salt Lake",
    "state": "West Bengal",
    "pincode": "700091",
    "country": "India",
    "addressType": "Work",
    "isDefault": false
  }
]
const nextpage = ()=>{
  navigate('/payment-summary', { state: { total: lastTotal } });
}

  return (

      <div className="flex items-center justify-center lg:px-90 mt-10">
        <div className="bg-[#F2F2F2] py-2 px-3 w-full rounded-md">
          <h2 className='font-medium text-2xl text-gray-800'>Order Summary</h2>
          <hr className='my-1 text-gray-400'/>
          {
            items.map((item, index)=>(
              <div className='my-5 cursor-pointer' key={index}>
                  <div className='flex gap-3'>
                    <div><img src={item.image} className='w-20' alt="" /></div>
                    <div>
                        <p className='md:text-xl text-md font-medium text-neutral-800'>{item.name}</p>
                        <p className='text-md font-medium text-neutral-800'>size: {item.unit}</p>
                        <p className='flex text-md font-medium text-neutral-800 font-sans'>qty: <p>{item.quantity}</p></p>
                        <span className='font-sans flex gap4 items-center'><p>₹ {item.price * item.quantity}</p><p className='text-sm text-gray-500 line-through ml-3'>₹ 3345</p><p className='text-green-600 ml-3'>{item.discount}% off</p></span>
                    </div>
                    <p className='text-sm text-green-600 mt-1 ml-9 hidden md:block'>free delevary</p>
                </div>
                
                <hr className='text-gray-400 mt-1' />
            </div>
            ))
          }
          <div>
            <div>
              <p className='text-neutral-900 ml-1 mb-1 font-medium'>Deliver to :</p>
              <div className='flex gap-3 font-sans items-center ml-1'><p>{address[0].fullName}</p><div className='px-2 py-[2px] rounded-sm bg-gray-50 border-1 border-gray-200 text-neutral-600 cursor-pointer'>{address[0].addressType}</div></div>
              <div className='flex rounded-sm bg-white py-1 px-3 shadow-sm gap-1 justify-between items-center my-2'>
                <div className='text-neutral-700'>
                <span className='flex gap-1'>
                  <p>{address[0].addressLine1}</p>,
                  <p>{address[0].city}</p>
                </span>
                <span className='flex gap-1'>
                  <p>{address[0].state}</p>,
                  <p>{address[0].pincode}...</p>
                </span>
                </div>
                <button className='border-1 border-gray-300 rounded-sm py-1 px-2 text-emerald-600 font-medium cursor-pointer'>Change</button>
              </div>
            </div>
          
            <div className='w-full bg-[#E3F6FF] flex justify-between items-center px-2 py-[2px] text-neutral-800 text-[15px]'>
              <CiCreditCard1 />
              <p>Continue to next page for Bank Offers</p>
            </div>

            <div className='bg-white rounded-lg my-2 py-3 px-4 shadow-sm border-1 border-gray-200'>
              <h1 className='text-black font-medium text-[18px]'>Price Details</h1>
              <hr className='my-2 text-[#EBE8DB] border-dotted gap-1' />
              <div className='font-sans'>
                <span className='flex items-center justify-between'><p className='text-gray-700'>Price ({totalItems} item)</p><p>{rupee} {total}</p></span>
                <span className='flex items-center justify-between'><p className='text-gray-700'>Platform Fee</p><p>{rupee} 5</p></span>
                <span className='flex items-center justify-between'><p className='text-gray-700'>Discount</p><p className='text-green-800'>{cartItems.discount} %</p></span>
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
          <button onClick={nextpage} className='bg-emerald-600 text-white px-4 py-2 cursor-pointer font-sans'>
            CONTINUE
          </button>
        </div>
      </div>
      

  )
}

export default CheckoutPage
