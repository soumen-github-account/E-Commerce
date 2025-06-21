import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { MdHome } from "react-icons/md";
import { FaProductHunt } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa6";
import { CgProductHunt } from "react-icons/cg";
import { IoIosAddCircle } from "react-icons/io";

const Sidebar = () => {
    // const {atoken} = useContext(AdminContext)
    // const {dtoken} = useContext(DoctorContext)

  return (
    <div className='min-h-screen bg-white border-r-1 border-r-gray-300'>
      <ul className='text-[#515151] mt-5'>
            <NavLink className={({isActive})=> `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-teal-600 text-white rounded-md' : ''}`} to={'/admin-dashboard'}>
                <MdHome className='text-[26px]' />
                <p className='hidden md:block text-[18px]'>Dashboard</p>
            </NavLink>
            <NavLink className={({isActive})=> `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-teal-600 text-white rounded-md' : ''}`} to={'/all-orders'}>
                <FaCartArrowDown className='text-[26px]' />
                <p className='hidden md:block'>Orders</p>
            </NavLink>
            <NavLink className={({isActive})=> `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-teal-600 text-white rounded-md' : ''}`} to={'/add-product'}>
                <IoIosAddCircle className='text-[26px]' />
                <p className='hidden md:block'>Add Product</p>
            </NavLink>
            <NavLink className={({isActive})=> `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-teal-600 text-white rounded-md' : ''}`} to={'/all-product'}>
                <FaProductHunt className='text-[26px]' />
                <p className='hidden md:block'>All Product List</p>
            </NavLink>
        </ul>
      
      {/* {
        dtoken && <ul className='text-[#515151] mt-5'>
            <NavLink className={({isActive})=> `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`} to={'/doctor-dashboard'}>
                <img src={assets.home_icon} alt="" />
                <p className='hidden md:block'>Dashboard</p>
            </NavLink>
            <NavLink className={({isActive})=> `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`} to={'/doctor-appointments'}>
                <img src={assets.appointment_icon} alt="" />
                <p className='hidden md:block'>Appointments</p>
            </NavLink>

            <NavLink className={({isActive})=> `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`} to={'/doctor-profile'}>
                <img src={assets.people_icon} alt="" />
                <p className='hidden md:block'>Profile</p>
            </NavLink>
        </ul>
      } */}
    </div>
  )
}

export default Sidebar
