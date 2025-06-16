import AddressModel from "../models/addressModel.js";
import CartModel from "../models/cartModel.js";
import OrderModel from "../models/orderModel.js";


export const addToCart = async (req, res) => {
    try {
        const { userId, items } = req.body;

        if (!userId || !Array.isArray(items)) {

            return res.status(400).json({ success: false, message: "Invalid data format" });
        }

        // Check if cart already exists for the user
        let cart = await CartModel.findOne({ userId });

        if (cart) {
            // Update existing cart
            for (let newItem of items) {
                const existingItemIndex = cart.items.findIndex(
                    (item) => item.id === newItem.id && item.unit === newItem.unit
                );

                if (existingItemIndex !== -1) {
                    cart.items[existingItemIndex].quantity += newItem.quantity;
                } else {
                    cart.items.push(newItem);
                }
                cart.markModified("items");
            }

            // Recalculate totalAmount
            cart.totalAmount = cart.items.reduce(
                (acc, item) => acc + item.price * item.quantity, 0
            );


            await cart.save();
            return res.status(200).json({ success: true, message: "Cart updated", cart });
        } else {
            // Create a new cart
            const totalAmount = items.reduce(
                (acc, item) => acc + item.price * item.quantity, 0
            );
            
            const newCart = new CartModel({
                userId,
                items,
                totalAmount,
            });

            await newCart.save();
            return res.status(201).json({ success: true, message: "Cart created", cart: newCart });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to add to cart", error: error.message });
    }
};



export const getUserCart = async (req, res) => {
  try {
    const { userId } = req.query;
    const carts = await CartModel.findOne({ userId });
    const items = carts.items
    return res.status(201).json({ success:true, carts });
  } catch (error) {
    return res.status(500).json({ success:false, message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
    try {
        const { userId, productId, unit } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({ success: false, message: "userId and productId are required" });
        }

        // Find the user's cart
        const cart = await CartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        // Filter out the item to be removed
        cart.items = cart.items.filter(item => {
            const isSameProduct = item.id.toString() === productId.toString();
            const isSameUnit = unit ? item.unit === unit : true;
            return !(isSameProduct && isSameUnit);
        });

        // Recalculate totalAmount
        cart.totalAmount = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

        await cart.save();

        return res.status(200).json({ success: true, message: "Item removed from cart", cart });
    } catch (error) {
      console.error("Remove from cart error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to remove item from cart",
            error: error.message,
        });
    }
};



export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      items,
      amount,
      address,
      paymentType,
      invoice_receipt
    } = req.body;

    const currentDate = Date.now(); // store as timestamp (Number)

    const newOrder = new OrderModel({
      userId,
      items,
      amount,
      address,
      paymentType,
      date: currentDate,
      invoice_receipt: invoice_receipt || ""
    });

    await newOrder.save();
    
    const cart = await CartModel.findOne({ userId });
    if (cart) {
      cart.items = cart.items.filter(cartItem => {
        return !items.some(orderedItem =>
          cartItem.id === orderedItem.id && cartItem.unit === orderedItem.unit
        );
      });

      // Recalculate total amount
      cart.totalAmount = cart.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
    }

    

    res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      order: newOrder
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error placing order",
      error: error.message
    });
  }
};


export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.query;

    const orders = await OrderModel.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const createAddress = async(req, res)=>{
  try{
    
  const { userId, name, phone, city, state, pin, country, line1, line2, type } = req.body

  if(!name || !phone || !city || !state || !pin || !country || !line1 || !line2){
    return res.json({success:false, message:"Missing Details"})
  }

  const newAddress = new AddressModel({
    userId,name, mobile:phone, city, state, pincode:pin, country, line1, line2, type
  })

  await newAddress.save();
  
  return res.json({success: true, message:'Address Saved'})
  } catch(error){
    return res.json({success: false, message:error.message})
  }
}


export const getAddress = async(req, res)=>{
  const { userId } = req.query;
  try{
    const addresses = await AddressModel.find({ userId })

    return res.json({success:true, addresses})

  } catch(error){
    return res.json({success:false, message:error.message})
  }
}

export const getAddressById = async(req, res)=>{
  const { id } = req.params;
  try{
    const addresses = await AddressModel.findById(id)

    return res.json({success:true, addresses})

  } catch(error){
    return res.json({success:false, message:error.message})
  }
}


export const editAddress = async(req, res)=>{
  const { id } = req.params;
  const { name, phone, city, state, pin, country, line1, line2, type } = req.body
  try {
    
    await AddressModel.findByIdAndUpdate(id, {name, phone, city, state, pin, country, line1, line2, type})

    res.status(200).json({ success: true, message:"Address Changed" });

  } catch(error){
    return res.json({success:false, message:error.message})
  }
}