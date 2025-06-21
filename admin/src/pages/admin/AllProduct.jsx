import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';

const AllProduct = () => {
  const {allproduct, setAllproduct, totalProduct, setTotalProduct} = useContext(AppContext)
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');


  const navigate = useNavigate()
 const filtered = Array.isArray(allproduct)
    ? allproduct.filter(p =>
        (category === 'All' || p.categoryId === category) &&
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

    const deleteHandle = async(id)=>{
      try {
          const {data} = await axios.delete(`http://localhost:8000/api/product/delete-product/${id}`)
          if(data.success){
              toast.success(data.message)
              setAllproduct(prev => prev.filter(p => p._id !== id));
          } else{
              toast.error(data.message)
          }
      } catch (error) {
          toast.error(error.message)
      }
    }

  return (
    <div className='w-full'>
    <div className="bg-white w-full p-4 rounded shadow-md">
      <h1 className='text-xl mt-2 py-2 text-emerald-700 font-bold'>All Product ({totalProduct})</h1>
      <div className="flex justify-between items-center mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">CATEGORY BY</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border px-2 py-1 rounded-md"
          >
            {
              ['All', ...new Set(
                Array.isArray(allproduct)
                  ? allproduct.map((item) => item.categoryId)
                  : []
              )].map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))
            }
          </select>
        </div>
        <input
          type="text"
          placeholder="🔍 Search here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-md w-1/3"
        />
      </div>


    <div className='w-full bg-blue-600 text-white py-2 px-10 flex items-center justify-between'>
      <span>PRODUCT</span>
      <span>CATEGORY</span>
      <span>SUB CATEGORY</span>
      <span>PRICE</span>
      <span>RATING</span>
      <span>ACTION</span>
    </div>
    <div className='h-[33vw] overflow-scroll scroll-hide px-8'>
      {
      filtered.map((item, index) => (
        <div key={index} className='flex justify-between items-center border-b-1 border-b-gray-500 py-2'>
          <div className='flex items-center flex-col w-35 line-clamp-2'>
            <img src={item.image[0]} className='w-14' alt="" />
            <p>{item.name}</p>
          </div>
          <div>
            {item.categoryId}
          </div>
          <div>
            {item.sub_category}
          </div>
          <div className='flex flex-col'>
            <p className="line-through text-gray-400 text-sm">Rs {item.price[0]}</p>
            <p className="text-red-500 font-bold">Rs {item.discountedPrice[0]}</p>
          </div>
          <div className='flex gap-1 items-center text-[18px] text-yellow-500'>
            {[...Array(5)].map((_, i) =>
                i < item.averageRating ? <IoMdStar key={i} /> : <IoMdStarOutline key={i} />
            )}
          </div>
          <div>
            <button onClick={()=>navigate(`/product-edit/${item._id}`)} className='bg-emerald-700 text-white px-4 py-1 cursor-pointer rounded-md'>Edit</button>
            <button onClick={()=>deleteHandle(item._id)} className='bg-red-500 text-white px-4 py-1 cursor-pointer ml-2 rounded-md'>Delete</button>
          </div>
        </div>
      ))}
    </div>
    </div>
    </div>
  );
};

export default AllProduct;

