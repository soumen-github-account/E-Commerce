import React, { useState } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { useClerk, useUser, UserButton } from '@clerk/clerk-react';
import { NavLink } from 'react-router-dom'
import cat1 from '../assets/cat1.png'


const Navbar = () => {
    const { isSignedIn, isLoaded, user } = useUser();

  return (
    <div>
      <div className='bg-white border-t-1 rounded-t-md border-t-gray-300 md:hidden block fixed bottom-0 left-0 w-full h-[4rem] px-0 z-10 items-center' id="nav-menu">
      <ul className="flex justify-between">
        <li className='hover:bg-gray-200 hover:rounded-full py-3 px-3'>
            <NavLink to='/' className={({isActive})=>`active-link flex flex-col items-center gap-x-4 text-sm justify-center font-bold ${isActive ? 'text-blue-800' :'text-gray-700'}`}>
                <AiFillHome className='text-[22px]' />
                <span className="nav__name">Home</span>
            </NavLink>
        </li>

        <li className='hover:bg-gray-200 hover:rounded-full py-3 px-3'>
            <NavLink to='/all-catagory' onClick={() => window.scrollTo(0, 0)} className={({isActive})=>`active-link flex flex-col items-center gap-x-4 text-sm justify-center font-bold ${isActive ? 'text-blue-800' :'text-gray-700'}`}>
                <BiSolidCategoryAlt className='text-[22px]' />
                <span className="nav__name">Categories</span>
            </NavLink>
        </li>

        <li className='hover:bg-gray-200 hover:rounded-full px-3'>
            <NavLink to='/allCategory-produt/Grocery' onClick={() => window.scrollTo(0, 0)} className={({isActive})=>`active-link flex flex-col items-center gap-x-4 text-sm justify-center font-bold ${isActive ? 'text-blue-800' :'text-gray-700'}`}>
                    <img src={cat1} className='w-10' alt="" />
                <span className="nav__name">Grocery</span>
            </NavLink>
        </li>

        <li className='hover:bg-gray-200 hover:rounded-full py-3 px-3'>
            <NavLink to='/order' onClick={() => window.scrollTo(0, 0)} className={({isActive})=>`active-link flex flex-col items-center gap-x-4 text-sm justify-center font-bold ${isActive ? 'text-blue-800' :'text-gray-700'}`}>
                <FaBox className='text-[22px]' />
                <span className="nav__name">Orders</span>
            </NavLink>
        </li>

        <li className='hover:bg-gray-200 hover:rounded-full py-3 px-3 mr-1'>
            <NavLink to='/cart' onClick={() => window.scrollTo(0, 0)} className={({isActive})=>`active-link flex flex-col items-center gap-x-4 text-sm justify-center font-bold ${isActive ? 'text-blue-800' :'text-gray-700'}`}>
                <FaShoppingCart className='text-[22px]' />
                <span className="nav__name">Cart</span>
            </NavLink>
        </li>
    </ul>
    </div>
    </div>
  )
}

export default Navbar
