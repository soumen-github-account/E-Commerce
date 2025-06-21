import express from 'express'


import upload from '../middlewares/multer.js'
import { addProduct, getAllOrder, getOrderById, orderUpdate, productList } from '../controllers/adminController.js';
import { addReview, deleteProduct, getProductById, updateProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/add-product',upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),addProduct)
productRouter.get('/list',productList)
productRouter.post('/review-add/:id',addReview)
productRouter.post('/product-edit/:id',upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),updateProduct)
productRouter.get('/products/:id',getProductById)
productRouter.delete('/delete-product/:id',deleteProduct)
productRouter.get('/orders',getAllOrder)
productRouter.post('/order-update/:id',orderUpdate)
productRouter.get('/get-order-status/:id', getOrderById)



export default productRouter