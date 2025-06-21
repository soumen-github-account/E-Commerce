import React, { useContext, useEffect } from 'react'
import HeaderSearch from '../components/HeaderSearch'
import { StoreContext } from '../contexts/StoreContext';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Footer from '../components/Footer';

const CartPage = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const userId = isLoaded && isSignedIn ? user.id : null;
  const { cartItems,fetchCart , removeFromCart, totalAmount, totalItems } = useContext(StoreContext)
  const navigate = useNavigate()

   // remove

  //  const handleRemove = (id, unit) => {
  //   const updated = cartItems.filter(item => !(item.id === id && item.unit === unit));
  //   setCartItems(updated);
  // };

useEffect(()=>{

},[cartItems])
  return (
    <div>
      <HeaderSearch />

      <section className='w-full md:px-40 md:py-4 mt-6 md:flex bg-gray-100 grid grid-cols-1'>
        <div className='bg-white shadow-md'>
            {
            cartItems?.items?.length === 0 ? (
                    <p className='text-center my-4'>Your cart is empty.</p>
                  ):
              (
                  cartItems?.items?.slice().reverse().map((item, index)=>(
                    <div className='mx-7 my-5 cursor-pointer' key={index}>
                  <div className='flex gap-3 hover:bg-gray-100'>
                    <div><img src={item.image} className='w-30' alt="" /></div>
                    <div className='font-sans'>
                        <p className='md:text-xl text-sm font-medium line-clamp-1'>{item.name}</p>
                        <p className='text-md font-medium'>size: {item.unit}</p>
                        <p className='flex text-md font-medium'>qty: <p>{item.quantity}</p></p>
                        <span className='font-sans flex gap4 items-center'><p>₹ {item.price * item.quantity}</p><p className='text-sm text-gray-500 line-through ml-3'>₹ {item.originalPrice}</p><p className='text-green-600 ml-3'>{item.discount}% off</p></span>
                    </div>
                    <p className='text-sm text-green-600 mt-1 ml-9 hidden md:block'>free delevary</p>
                </div>
                <div className='w-full flex'>
                  <button onClick={() => removeFromCart(item.id, item.unit)} className='px-3 my-1 py-1 text-sm rounded-sm text-white bg-red-500'>Remove</button>
                </div>
                <hr className='text-gray-400 mt-1' />
            </div>
                  )
          )
                  
        )}
                    
        </div>
        <div className='md:ml-8 mt-4 h-[250px] bg-white rounded-sm px-3 py-3 shadow-md'>
            <h1 className='text-xl text-gray-800 font-medium'>Price Details</h1>
            <hr className='my-2 text-gray-400' />
            <span className='font-sans flex justify-between'>Price ({totalItems} items) <p className=''>₹ {cartItems.totalAmount}</p></span>
            <span className='font-sans text-md flex justify-between'>Delevary Charge <p>Free</p></span>
            <hr className='my-2 text-gray-400' />
            <p className='flex justify-between text-md font-sans gap-8'>Total Ammount : <span>₹ {cartItems.totalAmount}</span></p>
            <hr className='my-2 text-gray-400' />
            {
              cartItems?.items?.length === 0 ? 
              "" :
            <button className='bg-emerald-700 text-white rounded-sm px-4 py-1 cursor-pointer' onClick={()=>navigate('/order-summary')}>Place Order</button>
              
            }
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default CartPage
