import React from 'react'
import Header from '../components/Header'
import HeaderBanner from '../components/HeaderBanner'

import HomeProduct from '../components/HomeProduct'
import MidBanner from '../components/MidBanner'
import Footer from '../components/Footer'
import Banner from '../components/Banner'
import Banner2 from '../components/Banner2'
import { catagoryData } from '../assets/categoryData'
import { useNavigate } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";

const Home = () => {
    const navigate = useNavigate()
  return (
    <>
        <Header />
        <HeaderBanner />
            <div onClick={()=>navigate('/search-page')} className='w-[85vw] flex items-center mt-3 bg-white shadow-sm border-1 border-gray-300 py-1 px-4 rounded-md ml-5 cursor-pointer md:hidden'>
                <div className='pr-7 border-r-1 w-[32px] py-2 border-r-gray-400'>
                    <IoSearch className='text-gray-500 text-lg' />
                </div>
                <p className='ml-3 text-gray-500'>Search here...</p>
            </div>


        <div className='px-7 mt-5'>
            <h1 className='text-2xl font-bold'>Featured Categories</h1>
            <div className='grid md:grid-cols-11 grid-cols-4 md:gap-5 gap-4 mt-4'>
                {
                    catagoryData.map((item, index)=>(
                        <div key={index} onClick={()=>{navigate(`/allCategory-produt/${item.name}`); scrollTo(0,0)}}>
                            <div className='rounded-xl bg-emerald-100 p-2 flex items-center justify-center'>
                            <img src={item.img} className='w-full' alt="" />
                            </div>
                            <p className='text-center text-sm'>{item.name}</p>
                        </div>
                    ))
                }
            </div>
        </div>
        <HomeProduct categoryId='Grocery' />

        <HomeProduct categoryId='Fashion' />
        <HomeProduct categoryId='Jewellery' />
        <HomeProduct categoryId='Appliances' />
        <HomeProduct categoryId='Mobiles' />
        
        <MidBanner />
        
        <Banner />
        <Banner2 />
        <Footer />
    </>
  )
}

export default Home
