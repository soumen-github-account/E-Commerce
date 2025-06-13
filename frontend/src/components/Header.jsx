import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import { RiArrowDropDownLine } from "react-icons/ri";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import HeaderSearch from './HeaderSearch';
import { catagoryData } from '../assets/categoryData';


const Header = () => {
  const navigate = useNavigate();
  const [dropdowns, setDropdowns] = useState({
    Grocery: false,
    Fashion: false,
    Appliances: false,
    Mobiles: false,
    Electronics: false,
    shop: false,
  });

  const toggleDropdown = (key) => {
    setDropdowns(prev => {
    const newDropdowns = Object.keys(prev).reduce((acc, currKey) => {
      acc[currKey] = false; // close all dropdowns
      return acc;
    }, {});
    newDropdowns[key] = !prev[key]; // open only the clicked one (or toggle if it's already open)
    return newDropdowns;
  });
  };
  const [drop, setDrop] = useState([])

  const clickTop = (item)=>{
    const filtered = catagoryData.find(product => product.name === item);
    setDrop(filtered || null)
    console.log(drop)
  }
  useEffect(() => {
  console.log('Updated drop:', drop);
  }, [drop]);
        

  return (
    <div className='md:py-0 py-2'>
      <HeaderSearch />

      <div className='py-3 border-t border-b border-gray-300 px-5 hidden md:block relative'>
        <div className='flex justify-between items-center'>
          {/* Browse All Categories Button */}
          <button
            className='bg-emerald-600 text-white rounded-sm py-2 px-4 cursor-pointer'
            onClick={() => navigate('/all-catagory')}
          >
            Browse All Categories
          </button>

          {/* Menu Items */}
          <div className='flex'>
            {
            catagoryData.slice(0,5).map(item => (
              <div key={item.name} className='relative'>
                <span className='flex gap-2 hover:bg-emerald-50 py-2 px-3 cursor-pointer'>
                  {item.name}
                  {item.name && (
                    dropdowns[item.name] ? (
                      <RxCross2
                        className='text-md cursor-pointer'
                        onClick={() => toggleDropdown(item.name)}
                      />
                    ) : (
                      <RiArrowDropDownLine
                        className='text-2xl cursor-pointer'
                        onClick={() => {toggleDropdown(item.name);clickTop(item.name)}}
                      />
                    )
                  )}
                </span>

                {/* Mega Menu for Shop */}
                {
                  dropdowns[item.name] && drop?.name === item.name && (
                  <div className="absolute bg-white shadow-lg w-[65vw] -left-100 p-6 flex z-50">
                    {drop.subCategory?.map((sub, index) => (
                      <div className="w-1/5" key={index}>
                        <h3 className="text-green-600 font-semibold mb-2 cursor-pointer">{sub.name}</h3>
                        <ul className="space-y-1 text-gray-700">
                          {sub.subCatagory2?.map((subItem, subIndex) => (
                            <li key={subIndex} onClick={()=>navigate(`/all-produt/${sub.subCatagory2[subIndex].name}`)} className='cursor-pointer hover:text-emerald-800 hover:scale-105 duration-300 font-medium'>{subItem.name}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            ))}
          </div>

          {/* Support Info */}
          <div className='flex items-center px-4 gap-2'>
            <TfiHeadphoneAlt className='text-2xl text-emerald-600' />
            <div>
              <p className='text-emerald-600 text-lg'>1900 - 888</p>
              <p>24/7 Support Center</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
