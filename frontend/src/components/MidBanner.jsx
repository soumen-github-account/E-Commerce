import React from 'react'
import mid1 from '../assets/mid1.jpg'
import mid2 from '../assets/mid2.jpg'
import mid3 from '../assets/mid3.jpg'
import mid4 from '../assets/mid4.jpg'
import { useNavigate } from 'react-router-dom';

const MidBanner = () => {
  const navigate = useNavigate()
  return (
    <div className='grid md:grid-cols-4 grid-cols-1 gap-4 px-8 my-10'>
      <div onClick={()=>{navigate('/allCategory-produt/Grocery'); scrollTo(0,0)}} className='rounded-lg overflow-hidden'>
        <img src={mid1} className='w-full rounded-lg hover:scale-105 duration-150 cursor-pointer' alt="" />
      </div>
      <div onClick={()=>{navigate('/allCategory-produt/Fashion'); scrollTo(0,0)}} className='rounded-lg overflow-hidden'>
        <img src={mid2} className='w-full rounded-lg hover:scale-105 duration-150 cursor-pointer' alt="" />
      </div>
      <div onClick={()=>{navigate('/all-produt/Kurtas & Sets'); scrollTo(0,0)}} className='rounded-lg overflow-hidden'>
        <img src={mid3} className='w-full rounded-lg hover:scale-105 duration-150 cursor-pointer' alt="" />
      </div>
      <div onClick={()=>{navigate('/allCategory-produt/Bags'); scrollTo(0,0)}} className='rounded-lg overflow-hidden'>
        <img src={mid4} className='w-full rounded-lg hover:scale-105 duration-150 cursor-pointer' alt="" />
      </div>
    </div>
  )
}

export default MidBanner
