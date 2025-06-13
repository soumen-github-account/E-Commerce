import { Webhook } from 'svix'
import UserModel from '../models/userModel.js'

// APi controller function

export const clerkWebhooks = async(req, res)=>{
    try {
        // create a svix instance with clerk 
        const whook = new Webhook (process.env.CLERK_WEBHOOK_SECRET)
        

        //verifying headers
        await whook.verify(JSON.stringify(req.body),{
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"]
        })

        // getting data from request body
         const { data, type } = req.body

        //switch-case statement

        switch (type) {
            case 'user.created':{
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name:data.first_name + " " + data.last_name,
                    image: data.image_url,
                    address:[],
                    cart:[],
                    orderHistory:[]
                }
                await UserModel.create(userData);
                return res.status(201).json({ success: true })
            }
            case 'user.updated':{
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name:data.first_name + " " + data.last_name,
                    image: data.image_url,
                }
                await UserModel.findByIdAndUpdate(data.id, userData)
                return res.status(200).json({ success: true })
            }
            case 'user.deleted':{
                await UserModel.findByIdAndDelete(data.id)
                res.json({})
                return res.status(200).json({ success: true })
            }
            default:
                return res.status(400).json({ success: false, message: "Unhandled webhook type" })
            
        }
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:'webhooks error'})
    }
}