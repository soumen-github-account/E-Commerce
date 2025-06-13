import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectdb from './config/mongodb.js'
import { clerkWebhooks } from './controllers/webHooks.js'


//app config 
 const app = express()
 const port = process.env.PORT || 8000

 app.use(express.json())
 app.use(cors())


connectdb();

app.post('/webhooks', clerkWebhooks)
 app.get('/',(req, res)=>{
    res.send("api working")
 })

 app.listen(port, ()=>{
    console.log("App is started in", port)
 })