import mongoose from "mongoose";

const cartSchema = new mongoose.model({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    productId:{
        type: mongoose.Schema.ObjectId,
        ref:'product'
    },
    quantity:{type: String, required:true},
    price:{type: Number, required:true}
},{timestamps: true})

const CartModel = mongoose.model('cart', cartSchema)

export default CartModel 