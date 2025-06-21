import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from 'react-hot-toast'
export const AppContext = createContext()

const AppContextProvider = (props)=>{
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const currencySymbol = '₹'
    const [loading, setLoading] = useState(false);
    const [allproduct, setAllproduct] = useState(false)
    const [totalProduct, setTotalProduct] = useState();
    const [allorder, setAllorder] = useState(false)
    const [totalOrder, setTotalOrder] = useState();
    const [totalCustomer, setTotalCustomer] = useState();
    const [totalBalance, setTotalBalance] = useState()

    const getProductData = async ()=>{
        try {
            const {data} = await axios.get('http://localhost:8000/api/product/list')
            if(data.success){
                setAllproduct(data.products)
                setTotalProduct(allproduct.length)
                
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getAllUser = async()=>{
        try{
            const {data} = await axios.get(backendUrl + '/api/admin/all-user')

            if(data.success){
                setTotalCustomer(data.users.length)
            }
        } catch{
            toast.error(error.message)
        }

    }

  useEffect(()=>{
    getProductData()
  },[allproduct])

  useEffect(()=>{
    getAllUser()
  },[])


  const getOrderData = async ()=>{
        try {
            const {data} = await axios.get('http://localhost:8000/api/product/orders')
            if(data.success){
                setAllorder(data.orders)
                setTotalOrder(allorder.length)

                const totalDeliveredBalance = data.orders
                .filter(order => order.isDelivered)
                .reduce((sum, order) => sum + order.amount, 0)
                setTotalBalance(totalDeliveredBalance)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

  useEffect(()=>{
    getOrderData()
  },[allorder])


    const value = {
        currencySymbol,
        loading,setLoading,
        allproduct, setAllproduct, totalProduct, setTotalProduct,
        allorder, setAllorder, totalOrder, setTotalOrder,
        totalCustomer, totalBalance
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider