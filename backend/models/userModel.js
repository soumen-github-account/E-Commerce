import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: {type: String, required:true},
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    image: {type: String, default:"",},
    address:[
        {
            type:mongoose.Schema.ObjectId,
            ref: "address"
        }
    ],
    cart:[
        {
            type:mongoose.Schema.ObjectId,
            ref: "cartProduct"
        }
    ],
    orderHistory:[
        {
            type:mongoose.Schema.ObjectId,
            ref: "order"
        }
    ],
},{timestamps: true})

const UserModel = mongoose.model('User', userSchema)

export default UserModel