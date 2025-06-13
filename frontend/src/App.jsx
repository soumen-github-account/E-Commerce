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

// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
// if (!PUBLISHABLE_KEY) {
//   throw new Error('Missing Publishable Key')
// }

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/all-catagory' element={<AllCatagory />} />
        <Route path='/all-produt/:subCategory2' element={<Products />} />
        <Route path='/allCategory-produt/:category' element={<CategoryProducts />} />
        <Route path='/produt-page/:id' element={<ProductPage />} />
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/order-summary' element={<CheckoutPage/>}/>
        <Route path='/payment-summary' element={<PaymentPage />}/>
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
