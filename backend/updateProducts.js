import mongoose from 'mongoose';
import ProductModel from './models/productModel.js';
import dotenv from 'dotenv';
dotenv.config();
const start = async () => {
  try {
    console.log("Starting update");
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connected');

    const result = await ProductModel.updateMany({}, {
      $set: {
        discountedPrice: []
      }
    });

    console.log(`Updated ${result.modifiedCount} products`);
    mongoose.disconnect();
  } catch (err) {
    console.error('Update failed:', err);
    mongoose.disconnect();
  }
};

start();
