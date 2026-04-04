
import {v2 as cloudinary} from 'cloudinary'
import ProductModel from '../models/productModel.js'
import OrderModel from '../models/orderModel.js'
import UserModel from '../models/userModel.js'

const addProduct = async(req, res)=>{
    try{
        const {name, categoryId, sub_category,sub_category2, unit,type, stock, price, discountedPrice ,discount,description,details,details_type } = req.body
        const image1 = req.files.image1[0]
        const image2 = req.files.image2[0]
        const image3 = req.files.image3[0]
        const image4 = req.files.image4[0]

        const image = [image1,image2,image3,image4].filter((item)=> item != undefined)

        if(!name || !categoryId || !sub_category ||  !sub_category2 || !unit || !type || !stock || !description || !price || !discount || !details || !details_type){
           return res.json({success:false, message: "Missing Details"})
        }
        
        
        let imagesUrl = await Promise.all(
            image.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type:"image"})
            return result.secure_url
            })
        )
        const productData = {
            name,
            categoryId,
            sub_category,
            sub_category2,
            unit,
            type,
            stock,
            price,
            discountedPrice,
            discount,
            description,
            details,
            details_type,
            image:imagesUrl,
            date:Date.now()
        }
        const newProduct = new ProductModel(productData)
        await newProduct.save()
        res.json({success:true, message: "Product added"})

    } catch(error){
        console.log(error)
        res.json({success:false , message: error.message})
    }
}


const productList = async(req, res)=>{
    try {
        const products = await ProductModel.find({})
        res.json({success:true, products})
    } catch (error) {
        console.log(error)
        res.json({success:false , message: error.message})
    }
}

const getAllOrder = async(req, res)=>{
    try {
        const orders = await OrderModel.find({})
        res.json({success:true, orders})
    } catch (error) {
        return res.json({success:false, message:error.message})
    }
}

const orderUpdate = async(req, res) =>{
    try {
        const { id } = req.params
        const { orderStatus } = req.body

        const isDelivered = orderStatus === "Delivered" ? true : false;

        await OrderModel.findByIdAndUpdate(id,{orderStatus, isDelivered})

        return res.json({success:true, message: "Order Updated"})

    } catch (error) {
        return res.json({success:false, message:error.message})
    }
}

const getOrderById = async(req, res)=>{
    try {
        const { id } = req.params

        const order = await OrderModel.findById(id)
        const items = order.items
        return res.json({success:true, items})
    } catch (error) {
        return res.json({success: false, message:error.message})
    }
}

const getAllUser = async(req, res)=>{
    try {
        const users = await UserModel.find({})

        return res.json({success:true, users})

    } catch (error) {
        return res.json({success: false, message:error.message})
    }
}

export { addProduct, productList, getAllOrder, orderUpdate, getOrderById,getAllUser }