import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
    userId: {
    type: String,
    required: true
    },
    name: {type: String, required:true},
    mobile: {type: Number, required:true},
    city: {type: String, required:true},
    state: {type: String, required:true},
    pincode: {type: String, required:true},
    country: {type: String, required:true},
    line1: {type: String, required:true},
    line2: {type: String, required:true},
    type: {type: String, enum: ['Home', 'Work'], default:'Home'}, // e.g. Home, Work
},{timestamps: true})

const AddressModel = mongoose.model('address', addressSchema)

export default AddressModel