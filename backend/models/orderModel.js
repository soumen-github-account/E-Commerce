import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    productId: {type: String, required: true},
    userData: {type: Object, required: true},
    productData: {type: Object, required: true},
    amount: {type: Number, required: true},
    date: {type: Number, required: true},
    cancelled: {type: Boolean, default: false},
    payment: {type: Boolean, default: false},
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    orderStatus: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    invoice_receipt: {
        type: String,
        default: ""
    }
},{timestamps: true})

const OrderModel = mongoose.model('order', orderSchema)
export default OrderModel