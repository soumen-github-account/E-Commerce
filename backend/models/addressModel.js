import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
    label: {type: String, default: ""}, // e.g. Home, Work
    line1: {type: String, default: ""},
    line2: {type: String, default: ""},
    city: {type: String, default: ""},
    state: {type: String, default: ""},
    pincode: {type: String, default: ""},
    country: {type: String, default: ""},
    mobile: {type: Number, default: "null"}

},{timestamps: true})

const AddressModel = mongoose.model('address', addressSchema)

export default AddressModel