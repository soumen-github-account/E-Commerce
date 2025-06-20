import express from 'express'


import upload from '../middlewares/multer.js'
import { addProduct, productList } from '../controllers/adminController.js';
import { addReview } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/add-product',upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),addProduct)
productRouter.get('/list',productList)
productRouter.post('/review-add/:id',addReview)



export default productRouter