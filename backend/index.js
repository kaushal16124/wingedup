import express from "express";
import { connectDB } from "./config/database.js";
 import { config } from "dotenv";
 config({ path: "./config/config.env" });
 import dotenv from "dotenv";
dotenv.config();
 import cors from "cors";
import Razorpay from "razorpay";
import paymentRoute from "./routes/paymentRoutes.js";
import rideRoute from "./routes/ridepost.js";
import memberRoute from "./routes/memberRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadImage from "./routes/uploadimage.js"
import cookieParser from "cookie-parser";
import fileUpload from 'express-fileupload';




connectDB();

const app = express()



app.use(cors({
  origin: 'https://wingedup.in' // Allow requests only from this domain
}));

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});


app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles:true
}))
app.use(express.urlencoded({ extended: true }));

app.use("/api", paymentRoute);
app.use('/api/ride',rideRoute);
app.use('/api/member',memberRoute);
app.use('/api/products',productRoutes);
app.use('/api/blogs',blogRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api',uploadImage);
app.use('/user',userRoutes);
app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);


app.listen(process.env.PORT, () =>
  console.log(`Server is working on ${process.env.PORT}`)
);