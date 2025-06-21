import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema({
  user: {
    type:String,
    required: true
  },
  userImage: {type: String, default:"",},
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})
const productSchema = new mongoose.Schema({
    name: {type:String,required:true},
    image: {
        type: Array,
        default: []
    },
    categoryId :{type: String, required:true},
    sub_category: {type: String, required:true},
    sub_category2: {type:String, required:true},
    unit: {type: String, required:true},
    type: {type: Array, default:[]},
    stock: {type: Number, required:true},
    price: {type:Array, default:[]},
    discountedPrice: {type:Array, default:[]},
    discount: {type:Number, required:true},
    description: {type:String, required:true},
    details: {type: Array, required:true},
    details_type:{type:Array, required:true},
    publish: {type: Boolean, default:true},
    avilable: {type:Boolean, default:true},

    reviews: [reviewSchema],
    numReviews: {
        type: Number,
        default: 0
    },
    averageRating: {
        type: Number,
        default: 4
    },
    date: {type:Number, required:true},
},{ minimize:false })

const ProductModel = mongoose.model('product', productSchema)
export default ProductModel