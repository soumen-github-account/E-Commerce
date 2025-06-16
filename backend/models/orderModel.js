import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{
        type: String,
        required:true,
        ref: 'User'
    },
    items: {type: Array, required: true},
    amount: {type: Number, required: true},
    address: {type: Object, required: true, ref:'address'},
    date: {type: Date, required: true},
    cancelled: {type: Boolean, default: false},
    paymentType: {type: String, required:true},
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    orderStatus: {
      type: String,
      enum: ['Order Confirmed', 'Shipped', 'Out For Delivery', 'Delivered' ,'Cancelled'],
      default: 'Order Confirmed',
    },
    invoice_receipt: {
        type: String,
        default: ""
    }
},{timestamps: true})

const OrderModel = mongoose.model('order', orderSchema)
export default OrderModel