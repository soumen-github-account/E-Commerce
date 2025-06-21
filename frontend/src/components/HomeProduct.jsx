import React, { useContext, useEffect, useState } from 'react'
import { IoStarSharp } from "react-icons/io5";
import { IoStarHalfSharp } from "react-icons/io5";
import { productData } from '../assets/data';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../contexts/StoreContext';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { ImSpinner9 } from 'react-icons/im';

const HomeProduct = ({categoryId}) => {
  const {allproduct} = useContext(StoreContext)
  const navigate = useNavigate()
    const [products, setProducts] = useState([]); // All products
    const [groceryProducts, setGroceryProducts] = useState([]);

    useEffect(()=>{
        setProducts(allproduct);
        console.log(productData)
    },[allproduct])

    // useEffect(() => {
    // const filtered = products.filter(product => product.categoryId === categoryId);
    // setGroceryProducts(filtered);
    // }, [products]);
    useEffect(() => {
      if (Array.isArray(products)) {
        const filtered = products.filter(product => product.categoryId === categoryId);
        setGroceryProducts(filtered);
      }
    }, [products, categoryId]);

  return (
    <div className='mt-5 px-6'>
      <h1 className='font-medium text-xl'>{categoryId}</h1>
      <div className='flex w-full gap-5 overflow-scroll scroll-hide mt-2 py-2'>
        {
          groceryProducts.length > 0  ?
            (
              groceryProducts.map((item,index)=>(
                  <div className='min-w-40 max-w-10 bg-neutral-100 p-2' key={index} onClick={()=>{navigate(`/produt-page/${item._id}`); scrollTo(0,0)}}>
                  <div className='w-full relative'>
                      <img src={item.image[0]} className='w-full rounded-md' alt="" />
                      {/* <button className='border-2 border-green-600 px-3 py-0.5 rounded-lg font-bold text-green-600 absolute -bottom-2 right-1 bg-white text-md'>Add</button> */}
                  </div>
                  <div className='flex items-start flex-col'>
                      <p className='font-bold text-gray-900 mt-1 line-clamp-2'>{item.name}</p>
                      <div className='flex gap-1 text-yellow-500'>
                      {
                          [1,2,3,4].map((item,index)=>(
                              <IoStarSharp key={index} />
                          ))
                      }
                      <IoStarHalfSharp />
                      </div>
                      <p className='flex items-center gap-x-2 text-sm font-sans'><p className='text-blue-900 font-medium'>{item.discount}% off</p> <p className='text-[16px] line-through text-gray-500'>₹{item.price[0]}</p></p>
                      <p className='font-sans'>₹ {item.discountedPrice[0]}</p>
                  </div>
              </div>
              ))
            )
         : 
         (<div className='w-full items-center justify-center mt-3'>
          <div className='md:px-7 gap-2 md:py-2 px-4 py-2 flex items-center text-gray-800 rounded-full cursor-pointer md:text-[17px] text-md'><ImSpinner9 className='text-md animate-spin' />Please Wait...</div>
         </div>)
        }
        
      </div>
      <div className='w-full md:w-60 flex items-center justify-center'>
        <button onClick={()=>{navigate(`/allCategory-produt/${categoryId}`); scrollTo(0,0)}} className='bg-gray-100 w-full justify-center px-3 py-2 text-[14px] text-green-700 flex items-center gap-x-1'>See all product<MdKeyboardDoubleArrowRight /></button>
      </div>
    </div>
  )
}

export default HomeProduct
