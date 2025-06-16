
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Model from './Model'
import { StoreContext } from '../contexts/StoreContext'
import { useUser } from '@clerk/clerk-react'
import AddressForm from './AddressForm'
import Input from '../ui/Input'
import toast from 'react-hot-toast'
import axios from 'axios'

const EditAddress = () => {
    const {id} = useParams()
    const {isLoaded, isSignedIn, user} = useUser()
    const {backendUrl} = useContext(StoreContext)
    const userId = isLoaded && isSignedIn ? user.id : null;
    const [openAuthModel, setopenAuthModel] = useState(true)
    const [addresses, setAddresses] = useState([])
    const navigate = useNavigate()
        const [name, setName] = useState('')
        const [phone, setPhone] = useState('')
        const [city, setCity] = useState('')
        const [state, setState] = useState('')
        const [pin, setPin] = useState('')
        const [country, setCountry] = useState('')
        const [line1, setLine1] = useState('')
        const [line2, setLine2] = useState('')
        const [type, setType] = useState('Home')
    
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {

            const { data } = await axios.put(backendUrl + `/api/user/edit-address/${id}`, 
                { name, phone, city, state, pin, country, line1, line2, type}
            );

            if (data.success) {
            toast.success(data.message);
            setopenAuthModel(false);
            navigate('/address'); // replace with actual route
            } else {
            toast.error(data.message);
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAddress = async()=>{
        try {
            const {data} = await axios.get(backendUrl + `/api/user/get-address-byId/${id}` )

            if(data.success){
                const address = data.addresses
                setName(address.name || '');
                setPhone(address.mobile || '');
                setCity(address.city || '');
                setState(address.state || '');
                setPin(address.pincode || '');
                setCountry(address.country || '');
                setLine1(address.line1 || '');
                setLine2(address.line2 || '');
                setType(address.type || 'Home');

      console.log(address);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        getAddress()
    },[id])


  return (
    <div>
      <Model
        isOpen={openAuthModel}
        onClose={()=>{
          setopenAuthModel(false);
        }}
        hideHeader
      >
        <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>Address Form</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>Pleace enter your details for Delevery</p>

      <form onSubmit={handleSubmit} className='font-sans h-[80vh] overflow-scroll scroll-hide'>
        <Input type="text" value={name} onChange={(e)=>setName(e.target.value)} label='Full Name' placeholder='Enter full name' />
        <Input type="number" value={phone} onChange={(e)=>setPhone(e.target.value)} label='Phone no.' placeholder='Enter your Phone no.' />
        <Input type="text" value={city} onChange={(e)=>setCity(e.target.value)} label='city' placeholder='Enter your city' />
        <Input type="text" value={state} onChange={(e)=>setState(e.target.value)} label='state' placeholder='Enter your state' />
        <Input type="text" value={pin} onChange={(e)=>setPin(e.target.value)} label='pin code' placeholder='Enter your pin code' />
        <Input type="text" value={country} onChange={(e)=>setCountry(e.target.value)} label='country' placeholder='India' />
        <Input type="text" value={line1} onChange={(e)=>setLine1(e.target.value)} label='line 1' placeholder='House No, Building Name (Required)*' />
        <Input type="text" value={line2} onChange={(e)=>setLine2(e.target.value)} label='line 1' placeholder='Rode Name, Area, colony' />

        <button type='submit' className='bg-black text-white w-full rounded-sm cursor-pointer py-2 hover:bg-gray-200 hover:text-black duration-300 border-1 border-gray-300'>Save</button>
      </form>
    </div>
      </Model>
    </div>
  )
}

export default EditAddress
