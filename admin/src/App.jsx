import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AddProduct from './pages/admin/AddProduct';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/admin/Dashboard';

const App = () => {
  // const {atoken} = useContext(AdminContext)
  return (
    <div className='bg-[#F8F9FD]'>
      <Navbar />
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          {/* Admin route */}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/add-product' element={<AddProduct />} />
        </Routes>
      </div>
      <Toaster 
      toastOptions={{
        className: "",
        style:{
          fontSize:"13px",
        },
      }}
      />
    </div>
  )
}

export default App
