import {v2 as cloudinary} from 'cloudinary'
import ProductModel from '../models/productModel.js'

import UserModel from "../models/userModel.js"

export const addReview = async (req, res) => {
  try {
    const { userId, rating, comment } = req.body
    const productId = req.params.id
    const user = await UserModel.findById(userId)

    const product = await ProductModel.findById(productId)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }


    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === userId.toString()
    )
    if (alreadyReviewed) {
      return res.json({ success:false,message: 'Product already reviewed by you' })
    }

    const review = {
      user: userId,
      userImage: user.image,
      name: user.name,
      rating: Number(rating),
      comment
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.averageRating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ success: true,message: 'Review added'})

  } catch (error) {
    res.status(500).json({ success:false, message: error.message })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
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
      details_type
    } = req.body;

   
    if (
      !name || !categoryId || !sub_category || !sub_category2 || !unit ||
      !type || !stock || !description || !price || !discount || !details || !details_type
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];
    const imageFiles = [image1, image2, image3, image4].filter(Boolean);

    let imagesUrl = [];
    if (imageFiles.length > 0) {
      imagesUrl = await Promise.all(
        imageFiles.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path, { resource_type: "image" });
          return result.secure_url;
        })
      );
    }

    const existingProduct = await ProductModel.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const finalImages = imagesUrl.length > 0 ? imagesUrl : existingProduct.image;

    await ProductModel.findByIdAndUpdate(id, {
      name,
      categoryId,
      sub_category,
      sub_category2,
      unit,
      type,
      price,
      stock,
      discountedPrice,
      discount,
      description,
      details,
      details_type,
      image: finalImages,
      date: Date.now(),
    });

    res.status(200).json({ success: true, message: "Product Updated" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getProductById = async(req, res)=>{
  try {
    const { id } = req.params
    const product = await ProductModel.findById(id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: 'Update failed' });
  }
}


export const deleteProduct = async(req, res)=>{
  try {
    const { id } = req.params

    await ProductModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted successfully" });

  } catch (error) {
    return res.json({success: false, message:error.message})
  }
}


