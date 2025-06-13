import React, { useState } from 'react'
import { catagoryData } from '../assets/categoryData'
import { Link, useNavigate } from "react-router-dom";

const AllCatagory = () => {
    const navigate = useNavigate()
    const [change, setChange] = useState(0)

    const changeHandle = (indexNo)=>{
        setChange(indexNo)
    }

  return (
    <div className='mt-4 md:px-6'>
        <h1 className='font-bold text-2xl ml-3 md:ml-0'>All Categories</h1>
        <div className='flex mt-7 h-[600px]'>
            <div className='flex-none h-[80vh] border-r-1 border-r-gray-500 px-2 overflow-scroll scroll-hide'>
            {
            catagoryData.map((item, index)=>(
                        <div key={index} onClick={()=>{changeHandle(index); scrollTo(0,0)}} className={`hover:bg-emerald-100 rounded-lg flex flex-col items-center my-1 py-1 cursor-pointer ${change === index ? 'bg-emerald-100' :'bg-emerald-50'} duration-100`}>
                            <img src={item.img} className='w-15' alt="" />
                            <p className='text-sm text-gray-900'>{item.name}</p>    
                        </div>
                ))
            }
            </div>
            <div className='flex-auto pl-3 h-[80vh] overflow-scroll scroll-hide'>
                {
                    catagoryData[change].subCategory.map((item, index)=>(
                        <div key={index} className='py-2'>
                            <h1 className='text-lg font-medium'>{item.name}</h1>
                            <div className='grid lg:grid-cols-9 md:grid-cols-7 grid-cols-3'>
                            {
                                item.subCatagory2?.map((subItem, subIndex)=>(
                                    <div key={subIndex} className='flex flex-col items-center gap-3' onClick={()=>navigate(`/all-produt/${item.subCatagory2[subIndex].name}`)}>
                                        <img src={subItem.img} className='md:w-20 w-15 bg-gray-100 rounded-full cursor-pointer' alt="" />
                                        <p className='text-sm text-gray-800'>{subItem.name}</p>
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                    ))
                }
                
            </div>
        </div>
    </div>
  )
}

export default AllCatagory
