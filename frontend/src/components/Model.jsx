import React from 'react'
import { FiX } from "react-icons/fi";

const Model = ({
    children,
    isOpen,
    hideHeader,
    onClose,
    title,
    showActionBtn=null,
    actionBtnIcon,
    actionBtnText,
    onActionClick,
}) => {
    
    if(!isOpen){
        return null;
    }

  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40'>
      {/* Model Content */}
      <div className={`relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden`}>
        {/* Model Header */}
        {
            !hideHeader && (
                <div className='flex items-center justify-between p-4 border-b border-gray-200'>
                    <h3 className='md:text-lg font-medium text-gray-900'>{title}</h3>
                    {showActionBtn && (
                        <button className='flex items-center justify-center text-center text-purple-800 border border-purple-300 rounded-sm bg-purple-100 gap-2 py-1 px-2.5 mr-12' onClick={()=>onActionClick()}>
                            {actionBtnIcon}
                            {actionBtnText}
                        </button>
                    )}
                </div>
            )}

            <button type='button' className='text-gray-600 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5' onClick={onClose}>
                {/* <svg className='w-3 h-3' aria-hidden="true" xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 14'>
                    <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth="2" d='M1 116 6m0 0l6 6M7 716-6M7 7l-6 6' />
                </svg> */}
                <FiX />
            </button>
            {/* Model Body Scroll Table */}

            <div className='flex-1 overflow-y-auto custom-scrollbar '>
                {children}
            </div>
      </div>
    </div>
  )
}

export default Model
