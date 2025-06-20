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
    const [color, setColor] = useState('home')
    const { isSignedIn, isLoaded, user } = useUser();

  return (
    <div>
      <div className='bg-white border-t-1 rounded-t-md border-t-gray-300 md:hidden block fixed bottom-0 left-0 w-full h-[4rem] px-0 z-10 items-center' id="nav-menu">
      <ul className="flex justify-between">
        <li className='hover:bg-gray-200 hover:rounded-full py-3 px-3'>
            <NavLink onClick={()=>{setColor('home'); scrollTo(0,0)}} to='/' className={`active-link flex flex-col items-center gap-x-4 text-sm justify-center font-bold ${color==='home' ? 'text-blue-800' :'text-gray-700'}`}>
                <AiFillHome className='text-[22px]' />
                <span className="nav__name">Home</span>
            </NavLink>
        </li>

        <li className='hover:bg-gray-200 hover:rounded-full py-3 px-3'>
            <NavLink onClick={()=>{setColor('category'); scrollTo(0,0)}} to='/all-catagory' className={`active-link flex flex-col items-center gap-x-4 text-sm justify-center font-bold ${color==='category' ? 'text-blue-800' :'text-gray-700'}`}>
                <BiSolidCategoryAlt className='text-[22px]' />
                <span className="nav__name">Categories</span>
            </NavLink>
        </li>

        <li className='hover:bg-gray-200 hover:rounded-full px-3'>
            <NavLink onClick={()=>{setColor('account'); scrollTo(0,0)}} to='/allCategory-produt/Grocery' className={`active-link flex flex-col items-center gap-x-4 text-sm justify-center font-bold ${color==='account' ? 'text-blue-800' :'text-gray-700'}`}>
                    <img src={cat1} className='w-10' alt="" />
                <span className="nav__name">Grocery</span>
            </NavLink>
        </li>

        <li className='hover:bg-gray-200 hover:rounded-full py-3 px-3'>
            <NavLink onClick={()=>{setColor('order'); scrollTo(0,0)}} to='/order' className={`active-link flex flex-col items-center gap-x-4 text-sm justify-center font-bold ${color==='order' ? 'text-blue-800' :'text-gray-700'}`}>
                <FaBox className='text-[22px]' />
                <span className="nav__name">Orders</span>
            </NavLink>
        </li>

        <li className='hover:bg-gray-200 hover:rounded-full py-3 px-3 mr-1'>
            <NavLink onClick={()=>{setColor('cart'); scrollTo(0,0)}} to='/cart' className={`active-link flex flex-col items-center gap-x-4 text-sm justify-center font-bold ${color==='cart' ? 'text-blue-800' :'text-gray-700'}`}>
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
