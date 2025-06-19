import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import AllCatagory from './pages/AllCatagory'
import Products from './pages/Products'
import CategoryProducts from './pages/CategoryProducts'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import PaymentPage from './pages/PaymentPage'
import SignUp from './pages/SignUp.jsx'
import { Toaster } from 'react-hot-toast'
import AddressHolder from './components/AddressHolder.jsx'
import EditAddress from './components/EditAddress.jsx'
import Navbar from './components/Navbar.jsx'
import OrderPage from './pages/OrderPage.jsx'
import SearchPage from './pages/SearchPage.jsx'
// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
// if (!PUBLISHABLE_KEY) {
//   throw new Error('Missing Publishable Key')
// }

const App = () => {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/all-catagory' element={<AllCatagory />} />
        <Route path='/all-produt/:subCategory2' element={<Products />} />
        <Route path='/allCategory-produt/:category' element={<CategoryProducts />} />
        <Route path='/produt-page/:id' element={<ProductPage />} />
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/order-summary' element={<CheckoutPage/>}/>
        <Route path='/address' element={<AddressHolder/>}/>
        <Route path='/payment-summary' element={<PaymentPage />}/>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/edit-address/:id' element={<EditAddress />} />
        <Route path='/order' element={<OrderPage />} />
        <Route path='/search-page' element={<SearchPage />} />
      </Routes>
      <Toaster 
      toastOptions={{
        className: "",
        style:{
          fontSize:"13px",
        },
      }}
      />
    </>
  )
}

export default App
