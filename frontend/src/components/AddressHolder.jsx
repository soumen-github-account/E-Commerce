import React, { useContext, useEffect, useState } from 'react'
import HeaderSearch from './HeaderSearch'
import Model from './Model'
import AddressForm from './AddressForm'
import axios from 'axios'
import { useUser } from '@clerk/clerk-react'
import { StoreContext } from '../contexts/StoreContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AddressHolder = () => {
  const {isLoaded, isSignedIn, user} = useUser()
  const {backendUrl} = useContext(StoreContext)
  const userId = isLoaded && isSignedIn ? user.id : null;
  const [openAuthModel, setopenAuthModel] = useState(false)
  const [addresses, setAddresses] = useState([])
  const navigate = useNavigate()

  


  const getAddress = async()=>{
    try {
      const {data} = await axios.get(backendUrl + '/api/user/get-address', {params:{userId}})
      if(data.success){
        setAddresses(data.addresses)
      } else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  
  useEffect(()=>{
    getAddress()
  },[userId])

 
 return (
    <div>
      <HeaderSearch />

      <div className='w-full bg-gray-50 h-[80vh] flex justify-center py-5'>

        <div className='bg-white py-4 px-5 shadow-md min-h-[50vh] md:w-[40vw] w-full overflow-scroll scroll-hide'>
            <h1 className='font-bold text-xl'>Edit Address</h1>
            {
              addresses.length > 0 ?(
                <div>
                {addresses.map((item, index) => (
                  <div key={index} className='mt-4 cursor-pointer pl-2 text-neutral-700 relative font-sans flex flex-wrap gap-2 w-full rounded-lg py-4 border-1 border-gray-300'>
                    <p>{item.name},</p>
                    <p>{item.mobile},</p>
                    <p>{item.city},</p>
                    <p>{item.state},</p>
                    <p>{item.line1},</p>
                    <p>{item.line2},</p>
                    <button onClick={()=>navigate(`/edit-address/${item._id}`)} className='absolute right-3 top-3 border-1 border-gray-300 rounded-sm px-3 py-1 bg-gray-700 text-white'>Edit</button>
                  </div>
                ))}
                </div>
              ):(
                <div className='mt-4 flex w-full border-1 border-gray-300 rounded-lg items-center justify-center py-4'>
                No address yet
                </div>
              )
            }
            
            

            <button onClick={()=>setopenAuthModel(true)} className='w-full mt-3 py-3 cursor-pointer hover:bg-white hover:text-black border-1 border-black duration-300 bg-neutral-800 text-white rounded-sm text-lg font-medium'>Add Address</button>
        </div>

      </div>

      <Model
        isOpen={openAuthModel}
        onClose={()=>{
          setopenAuthModel(false);
        }}
        hideHeader
      >
        <AddressForm onClose={()=>{
          setopenAuthModel(false);
        }} />
      </Model>
    </div>
  )
}

export default AddressHolder
