import ProductModel from "../models/productModel.js"
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

    // Check if user already reviewed
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
    res.status(201).json({ success: true,message: 'Review added' })

  } catch (error) {
    res.status(500).json({ success:false, message: error.message })
  }
}