import React, { useContext, useState } from 'react'
import { LuGitCompare } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { RiContactsLine } from "react-icons/ri";
import logo from "../assets/logo3.jpeg"
import { IoSearch } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import SelectDropdown from './SelectDropdown';
import { IoIosMenu } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../contexts/StoreContext';
import { useClerk, useUser, UserButton } from '@clerk/clerk-react';
import { RxCross2 } from "react-icons/rx";
import { NavLink } from 'react-router-dom'


const HeaderSearch = () => {
    const { totalItems } = useContext(StoreContext)
    const { signOut } = useClerk();
    const handleLogout = () => {
        signOut();
        navigate('/')
    };

    const [isOpen, setIsOpen] = useState(false)
    const { isSignedIn, isLoaded, user } = useUser();
    const [open, setOpen] = useState(false)
    const {openSignIn} = useClerk()
        const navigate = useNavigate()
        const [location , setLocation] = useState(
            [
            'All',
            'China',
            'America',
            'India',
            'USA',
            'Brazil',
            'Mumbai',
            'Tokio',
            'France',
            'Brandi'
            ]
        )
    
        const [selectLocation, setSeletLocation] = useState("All")
        const toggleSwitch = () => {
            setOpen(!open);
        };
  return (
     <div className='flex items-center justify-between py-4 px-5'>
        {/* <div className='md:hidden w-[50px] flex'>
            <IoIosMenu className='text-3xl' />
        </div> */}
        <div>
            <img src={logo} className='md:w-35 w-28 md:pl-2 cursor-pointer' alt="" />
        </div>

        <div onClick={()=>navigate('/search-page')} className='border-1 border-gray-300 py-2 rounded-sm hidden md:block cursor-pointer'>
            <div className='flex px-2'>
                <div className='flex border-r-1 border-r-emerald-400 items-center'>
                    <p>All Categories</p>
                </div>
                <div className='flex items-center px-2 ml-1'>
                    <input type="text" placeholder='search hare...' className='w-90 outline-none flex items-center h-7' />
                    <IoSearch className='cursor-pointer'/>
                </div>
                
            </div>
        </div>
        {/* <div className='hidden md:block'>
            <div onClick={()=>navigate('/search-page')} className='w-[85vw] flex items-center mt-3 bg-white shadow-sm border-1 border-gray-300 py-1 px-4 rounded-md ml-5 cursor-pointer'>
                <div className='pr-7 border-r-1 w-[32px] py-2 border-r-gray-400'>
                    <IoSearch className='text-gray-500 text-lg' />
                </div>
                <p className='ml-3 text-gray-500'>Search here...</p>
            </div>
        </div> */}
        
        
        <div className="w-40 p-1 border-2 border-gray-300 rounded-sm text-green-800 hidden md:block">
            <div className='flex items-center'>
            <IoLocationOutline className='w-6'/>
            <div className='flex items-center justify-between w-35 relative'>
                <p>{selectLocation}</p>{open ? <RxCross2 className='m-1 text-md cursor-pointer' onClick={toggleSwitch}/> :<RiArrowDropDownLine className='ml-1 text-2xl cursor-pointer'  onClick={toggleSwitch}/>}
                    {
                        open &&
                        (<SelectDropdown setSeletLocation={setSeletLocation} location={location} offswitch={toggleSwitch}/> )
                    }
                    
            </div>
            </div>
        </div>
        <div className=''>
        <div className='flex gap-4 md:ml-5 '>
        <div className="flex p-1 items-center justify-between">
            <div className='relative'>
            {/* <div className='absolute rounded-full bg-emerald-600 text-white w-5 h-5 flex items-center justify-center -top-3 left-3 text-center pb-1'>0</div> */}
            </div>
            <NavLink to='/order'>
            <p className='ml-2 hidden md:block bg-gray-100 px-4 py-1 rounded-md border-1 border-gray-300 cursor-pointer'>My Orders</p>
            </NavLink>
        </div>

        <div onClick={()=>navigate('/cart')} className="flex p-1 items-center justify-between cursor-pointer">
            <div className='relative'>
            <IoCartOutline className='text-2xl' />
            <div className='absolute rounded-full bg-emerald-600 text-white w-5 h-5 flex items-center justify-center -top-3 left-3 text-center pb-1'>{totalItems}</div>
            </div>
            <p className='ml-2 hidden md:block'>Cart</p>
        </div>
        </div>
        </div>
        {
            user ? 
                <div className='flex md:gap-x-5 gap-x-2 text-sm items-center'>
                    <button onClick={()=>navigate('/address')} className='py-1 md:px-3 px-2 rounded-sm bg-emerald-700 text-white'>My Address</button>
                    <UserButton />
                </div>
            :
            <button className='px-3 py-2 bg-emerald-600 text-white rounded-sm cursor-pointer' onClick={e =>openSignIn()}>
                SignUp
            </button>
        }

        {
        isOpen && (
            <div className="absolute right-0 mt-25 w-32 bg-white rounded shadow-lg z-50">
                <RxCross2 className='cursor-pointer absolute right-2 top-1' onClick={()=>setIsOpen(false)} />
            <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-neutral-700 hover:bg-gray-100"
            >
                Sign out
            </button>
            </div>
        )}

        
        
      </div>
  )
}

export default HeaderSearch
