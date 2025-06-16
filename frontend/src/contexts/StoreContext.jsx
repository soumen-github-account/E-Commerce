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

const addToCart = async (item) => {
  try {
    const { data } = await axios.post(
      backendUrl + '/api/user/add-to-cart',
      { userId, items: item }
    );
    if (data.success) {
      toast.success(data.message);
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
      const {data} = await axios.delete(backendUrl + "/api/user/delete-cart", {data:{userId, productId:id, unit}})
      if(data.success){
        setCartItems(data.cart);
        toast.success(data.message)
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
  // const updateCartQuantity = async(id, unit, type) => {
  //   const updatedCart = cartItems.map(item => {
  //   if (item.id === id && item.unit === unit) {
  //     const newQty = type === 'inc' ? Math.min(4, item.quantity + 1) : Math.max(1, item.quantity - 1);
  //     return { ...item, quantity: newQty };
  //   }
  //   return item;
  // });

  // setCartItems(updatedCart);
  //   console.log({userId,
  //     productId: id,
  //     unit,
  //     type,})
  // try {
  //   const res = await axios.post(backendUrl + "/api/user/update-quantity", {
  //     userId,
  //     productId: id,
  //     unit,
  //     type,
  //   });
    
  //   if (res.data.success) {
  //     toast.success("Cart updated");
  //   } else {
  //     toast.error(res.data.message || "Failed to update cart");
  //   }
  // } catch (err) {
  //   toast.error("Error updating cart");
  //   console.error(err);
  // }

  // };
    //  Total calculation
  
  
    
  // cartitems Checkout

  useEffect(()=>{
    fetchCart()
  },[cartItems, userId])
    const contextValue = {
      backendUrl,
      userId,
    cartItems, addToCart, setCartItems, removeFromCart,
    rupee, fetchCart, totalItems, allproduct
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;