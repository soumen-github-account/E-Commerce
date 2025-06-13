import React, { useEffect, useState } from 'react'
import { IoStarSharp } from "react-icons/io5";
import { IoStarHalfSharp } from "react-icons/io5";
import { productData } from '../assets/data';
import { useNavigate } from 'react-router-dom';

const HomeProduct = ({categoryId}) => {
  const navigate = useNavigate()
    const [products, setProducts] = useState([]); // All products
    const [groceryProducts, setGroceryProducts] = useState([]);

    // const grocery = []

    useEffect(()=>{
        setProducts(productData);
    },[productData])

    useEffect(() => {
    const filtered = products.filter(product => product.categoryId === categoryId);
    setGroceryProducts(filtered);
    }, [products]);

  return (
    <div className='mt-5 px-6'>
      <h1 className='font-medium text-xl'>{categoryId}</h1>
      <div className='flex w-full gap-5 overflow-scroll scroll-hide mt-2 py-2'>
        {
            groceryProducts.map((item,index)=>(
                <div className='w-40 max-w-50 bg-neutral-100 p-2' key={index} onClick={()=>navigate(`/produt-page/${item._id}`)}>
                <div className='w-full relative'>
                    <img src={item.image} className='w-full rounded-md' alt="" />
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
                    <p className='font-sans'>₹ {item.price[0]}</p>
                </div>
            </div>
            ))
        }
        
      </div>
    </div>
  )
}

export default HomeProduct
