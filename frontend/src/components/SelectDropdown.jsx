import React from 'react'

const SelectDropdown = ({location, setSeletLocation, offswitch}) => {
  return (
    <div className='absolute w-[180px] h-[300px] bg-gray-100 rounded-sm top-10 left-0 z-10 shadow-md px-2 py-3'>
      <div className=''>
        <input type="text" className='w-[170px] border-1 outline-none border-gray-300 rounded-sm px-2 py-1' />
        <ul className='h-[210px] overflow-scroll scroll-hide mt-3'>
             {
              location.map((item, index)=>(
                  <li key={index} className='py-1 px-2 rounded-sm hover:bg-green-300 cursor-pointer' onClick={()=>{setSeletLocation(item);offswitch()}}>{item}</li>
             )
            )
            }
        </ul>
      </div>
    </div>
  )
}

export default SelectDropdown
