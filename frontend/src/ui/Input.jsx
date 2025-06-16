import React, { useState } from 'react'

const Input = ({
    value, onChange, label, placeholder, type
}) => {
  return (
    <div>
      <label htmlFor="" className='text-[16px] text-slate-800'>{label}</label>

      <div className='mt-2 mb-5 border-1 border-gray-400 py-2 px-2'>
        <input type={type} placeholder={placeholder}
        className='w-full bg-transparent outline-none'
        value={value}
        onChange={(e)=>onChange(e)}
        />
        
      </div>
    </div>
  )
}

export default Input
