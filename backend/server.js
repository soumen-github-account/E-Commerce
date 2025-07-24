import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectdb from './config/mongodb.js'
import { clerkWebhooks } from './controllers/webHooks.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'


//app config 
 const app = express()
 const port = process.env.PORT || 8000

 app.use(express.json())
 app.use(cors())


connectdb();
connectCloudinary()

app.post('/webhooks', clerkWebhooks)

   app.use('/api/user', userRouter)
   app.use('/api/product/', productRouter)
   app.use('/api/admin/',adminRouter)
   
   app.get('/',(req, res)=>{
      res.send("api working")
   })

   app.listen(port, ()=>{
      console.log("App is started in", port)
   })