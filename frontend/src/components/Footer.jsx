import React from 'react'
import logo from '../assets/logo3.jpeg'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='md:mx-10 px-2 mb-12'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mt-10 text-sm'>
      {/*----------- Left Section---------- */}
      <div>
        <img className='mb-5 w-35' src={logo} alt="" />
        <p className='w-full md:w-2/3 text-gray-600 '>Shop top brands effortlessly with our secure, mobile-friendly eCommerce app. Fast delivery, easy returns, and unbeatable deals—no extra fees, just great products. Start shopping smarter today!
        Would you like a version focused on a specific niche (like fashion, tech, or groceries)?</p>
      </div>

      {/*----------- Center Section---------- */}
      <div>
        <p className='text-xl font-medium mb-5'>Company</p>
        <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
        </ul>
      </div>

      {/*----------- Right Section---------- */}
      <div>
        <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
        <ul className='flex flex-col gap-2 text-gray-600'>
          <li>+91-7584818990</li>
          <li>soumendas@gmail.com</li>
        </ul>
      </div>
    </div>
      {/*----------- copyright Section---------- */}
      <div>
      <hr />
        <p className='py-3 text-sm text-center font-sans'>Copyright 2024 @ sdking.dev - All Right Reserved.</p>
        <span className='md:flex w-full flex-col items-center justify-center gap-x-3 font-sans text-sm md:text-md'><Link to={'/privacy-policy'}>Privacy and Policy</Link> | <Link to={'/condition'}>Terms and Conditions</Link> | <Link to={'/shipping'}>Shipping Policy</Link> | <Link to={'/refund'}>Cancellations and Refunds</Link></span>
      </div>
    </div>
  )
}

export default Footer
