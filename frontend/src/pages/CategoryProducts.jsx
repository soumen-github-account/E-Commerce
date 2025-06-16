import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { productData } from '../assets/data'
import HeaderSearch from '../components/HeaderSearch'
import Footer from '../components/Footer'
import { IoStarHalfSharp, IoStarSharp } from 'react-icons/io5'
import { StoreContext } from '../contexts/StoreContext'

const CategoryProducts = () => {
  const { allproduct } = useContext(StoreContext)
    const {category} = useParams()
    const navigate = useNavigate()
    const [productfiltered, setProductfiltered] = useState([])
      
        useEffect(() => {
          if(Array.isArray(allproduct)){
            const filtered = allproduct.filter(product => product.categoryId === category);
            setProductfiltered(filtered);
          }
        }, [allproduct]);
  return (
    <div>
      <HeaderSearch />
      <div className='px-6 h-[86vh] overflow-scroll scroll-hide'>
        <div></div>

        <div className='grid w-full lg:grid-cols-7 md:grid-cols-4 grid-cols-2 gap-4'>
          {
          productfiltered.map((item, index)=>(
            <div className='w-40 max-w-50 bg-neutral-100 p-2' key={index} onClick={()=>navigate(`/produt-page/${item._id}`)}>
              <div className='w-full relative'>
                  <img src={item.image[0]} className='w-full rounded-md' alt="" />
                  <button className='border-2 border-green-600 px-3 py-0.5 rounded-lg font-bold text-green-600 absolute -bottom-2 right-1 bg-white text-md'>Add</button>
              </div>
              <div className='flex items-start flex-col'>
                  <p className='font-bold text-gray-900 mt-1'>{item.name}</p>
                  <div className='flex gap-1 text-yellow-500'>
                  {
                      [1,2,3,4].map((item,index)=>(
                          <IoStarSharp key={index} />
                      ))
                  }
                  <IoStarHalfSharp />
                  </div>
                  <p className='text-blue-900 text-sm font-sans'>{item.discount}% off</p>
                  <span className='flex gap-4 items-center'><p className='font-sans text-[14px]'>₹ {item.price[0]}</p><p className='text-[12px]'>Free Delevary</p></span>
              </div>
          </div>
          ))
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CategoryProducts
