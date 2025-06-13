import { createContext, useEffect, useState } from "react";
import { productData } from "../assets/data";


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const rupee = '₹'
    const [cartItems, setCartItems] = useState([]);

//   const addToCart = (product) => {
//     // Check if product already in cart
//     const existingItem = cartItems.find((item) => item.id === product.id && item.unit === product.unit);
//     if (existingItem) {
//       // Increase quantity
//       setCartItems((prev) =>
//         prev.map((item) =>
//           item.id === product.id && item.unit === product.unit
//             ? { ...item, quantity: item.quantity + product.quantity }
//             : item
//         )
//       );
//     } else {
//       // Add new product
//       setCartItems([...cartItems, product]);
//     }
//   };


  const addToCart = (item) => {
    const existing = cartItems.find(p => p.id === item.id && p.unit === item.unit);
    if (existing) {
      setCartItems(cartItems.map(p =>
        p.id === item.id && p.unit === item.unit
          ? { ...p, quantity: p.quantity + item.quantity }
          : p
      ));
    } else {
      setCartItems([...cartItems, item]);
    }
  };

  const removeFromCart = (id, unit) => {
    setCartItems(cartItems.filter(item => !(item.id === id && item.unit === unit)));
  };

  const updateCartQuantity = (id, unit, type) => {
    
    setCartItems(prevCart =>
      prevCart.map(item => {
        if (item.id === id && item.unit === unit) {
            const newQty = type === 'inc' ? Math.min(4 , item.quantity + 1) : Math.max(1, item.quantity - 1);
            return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };
    //  Total calculation
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  // cartitems Checkout
  const checkCart = ()=>{
    
  }
    const contextValue = {
    cartItems, addToCart, setCartItems, removeFromCart, updateCartQuantity, totalAmount, totalItems,
    rupee
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;