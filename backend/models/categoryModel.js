import mongoose from "mongoose";


const subCategorySchema = new mongoose.Schema({
  img: { type: String, required: true },
  name: { type: String, required: true },
  subCatagory2: {type: Array, required: true },
});

const categorySchema = new mongoose.Schema({
    name: {type: String, required:true},
    img:{type:String, default:''},
    subCategory: [subCategorySchema],
},{timestamps:true})

const CategoryModel = mongoose.model('category', categorySchema);

export default CategoryModel