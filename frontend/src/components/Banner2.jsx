import React from 'react'
import b1 from '../assets/b1img.svg'
import b2 from '../assets/b2img.svg'
import b3 from '../assets/b3img.svg'
import b4 from '../assets/b4img.svg'
import b5 from '../assets/b5img.svg'


const Banner2 = () => {
  return (
    <div className='grid md:grid-cols-5 grid-cols-1 md:px-7 px-4 md:mt-10 mt-6 md:gap-8 gap-2'>
      <div className='rounded-md bg-gray-200 flex items-center justify-between px-7 py-7 gap-4'>
        <div><img src={b1} className='w-10 hover:-translate-y-1.5 duration-150' alt="" /></div>
        <span>
            <p className='text-md font-medium'>Best prices & offers</p>
            <p className='text-md text-neutral-600'>Orders $50 or more</p>
        </span>
      </div>

      <div className='rounded-md bg-gray-200 flex items-center justify-between px-7 py-7 gap-4'>
        <div><img src={b2} className='w-10 hover:-translate-y-1.5 duration-150' alt="" /></div>
        <span>
            <p className='text-md font-medium'>Free delivery</p>
            <p className='text-md text-neutral-600'>Orders $50 or more</p>
        </span>
      </div>

      <div className='rounded-md bg-gray-200 flex items-center justify-between px-8 py-7'>
        <div><img src={b3} className='w-10 hover:-translate-y-1.5 duration-150' alt="" /></div>
        <span>
            <p className='text-md font-medium'>Great daily deal</p>
            <p className='text-md text-neutral-600'>Orders $50 or more</p>
        </span>
      </div>

      <div className='rounded-md bg-gray-200 flex items-center justify-between px-8 py-7'>
        <div><img src={b4} className='w-10 hover:-translate-y-1.5 duration-150' alt="" /></div>
        <span>
            <p className='text-md font-medium'>Wide assortment</p>
            <p className='text-md text-neutral-600'>Orders $50 or more</p>
        </span>
      </div>

      <div className='rounded-md bg-gray-200 flex items-center justify-between px-8 py-7'>
        <div><img src={b5} className='w-10 hover:-translate-y-1.5 duration-150' alt="" /></div>
        <span>
            <p className='text-md font-medium'>Easy returns</p>
            <p className='text-md text-neutral-600'>Orders $50 or more</p>
        </span>
      </div>
    </div>
  )
}

export default Banner2
