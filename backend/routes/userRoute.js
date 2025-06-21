import express from 'express'
import { addToCart, createAddress, createOrder, editAddress, getAddress, getAddressById, getOrderStatusById, getUserCart, getUserOrders, removeFromCart } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post('/add-to-cart', addToCart)
userRouter.get('/get-cart', getUserCart)
userRouter.delete('/delete-cart', removeFromCart)
userRouter.post('/order-placed', createOrder)
userRouter.post('/address-create', createAddress)
userRouter.get('/get-address', getAddress)
userRouter.get('/get-address-byId/:id', getAddressById)
userRouter.put('/edit-address/:id', editAddress)
userRouter.get('/get-order', getUserOrders)
userRouter.get('/get-order-status/:id', getOrderStatusById)


export default userRouter