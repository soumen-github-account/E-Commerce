import React from 'react'
import bannerImg from '../assets/bottomBannerImg.png'
import { IoIosSend } from "react-icons/io";

const Banner = () => {
  return (
    <div className='flex items-center justify-between rounded-2xl bg-emerald-100 md:mx-7 mt-10 md:px-6'>
      <div className='flex items-center flex-col md:ml-5 p-10'>
        <span>
            <p className='md:text-3xl text-xl font-bold gap-2'>Stay home & get your daily <br/>
            needs from our shop</p>
            <p className='md:text-xl text-md text-gray-700 mt-2'>Start You'r Daily Shopping with ShopsTic</p>
        </span>
        <div className='bg-white rounded-full md:w-full flex items-center mt-4 justify-between'>
            <IoIosSend className='text-4xl ml-3' />
            <input type="email" className='w-full flex py-2 text-lg px-1 outline-none' placeholder='Your Email address' />
            <button className='rounded-full text-white bg-emerald-500 px-6 py-3 text-sm md:text-lg'>Subscribe</button>
        </div>
      </div>
      <div className='hidden md:block'><img src={bannerImg} alt="" /></div>
    </div>
  )
}

export default Banner
