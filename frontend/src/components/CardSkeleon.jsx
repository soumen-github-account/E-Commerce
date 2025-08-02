import React from 'react'

const CardSkeleon = () => {
  return (
    <div className='w-full max-w-md p-4 rounded-xl shadow flex flex-col gap-y-2'>
      <div className='w-full md:h-64 h-30 skeleton rounded-xl'></div>
      <div className='flex flex-col gap-y-3 md:mt-6'>
        <div className='h-4 w-11/12 skeleton rounded'></div>
        <div className='h-4 w-11/12 skeleton rounded'></div>
        <div className='h-4 w-11/12 skeleton rounded'></div>
      </div>
    </div>
  )
}

export default CardSkeleon
