import { createContext, useEffect, useState } from "react";
import { productData } from "../assets/data";
import axios from 'axios'
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const { user, isLoaded, isSignedIn } = useUser();
    const userId = isLoaded && isSignedIn ? user.id : null;

    const rupee = '₹'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [cartItems, setCartItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0)
    const [allproduct, setAllproduct] = useState(false)
    const [loading, setLoading] = useState(false)


const addToCart = async (item) => {
  try {
    setLoading(true)
    const { data } = await axios.post(
      backendUrl + '/api/user/add-to-cart',
      { userId, items: item }
    );
    if (data.success) {
      toast.success(data.message);
      setLoading(false)
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error("Server error: " + error.message);
  }
};

const fetchCart = async () => {
      if (userId) {
        try {
          const res = await axios.get(backendUrl + "/api/user/get-cart", {params: {userId}});
          const cart = res.data.carts || { items: [] };
          // Make sure cart.items is always an array
          const items = Array.isArray(cart.items) ? cart.items : [];
          setCartItems(cart);
          
        const totalQuantity = items.reduce(
          (acc, item) => acc + (item.quantity || 0),
          0
        );

      setTotalItems(totalQuantity);
        } catch (err) {
          console.error("Failed to fetch cart from backend:", err);
        }
      }
    };

    //  Load cart from backend on login


  const removeFromCart = async(id, unit) => {
    try {
      setLoading(true)
      const {data} = await axios.delete(backendUrl + "/api/user/delete-cart", {data:{userId, productId:id, unit}})
      if(data.success){
        setCartItems(data.cart);
        toast.success(data.message)
        setLoading(false)
      }

    } catch (error) {
      toast.error(error.message)
    }
  };

    const getProductData = async ()=>{
    try {
        const {data} = await axios.get(backendUrl + '/api/product/list')
        if(data.success){
            setAllproduct(data.products)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
  }

  useEffect(()=>{
    getProductData()
  },[])

  useEffect(()=>{
    fetchCart()
  },[cartItems, userId])
    const contextValue = {
      backendUrl,
      userId,
      cartItems, addToCart, setCartItems, removeFromCart,
      rupee, fetchCart, totalItems, allproduct, loading, setLoading
    };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;