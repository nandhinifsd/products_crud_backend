const express=require("express");
const app=express();
require("dotenv").config();
const cors=require("cors");
const userRouter=require("./router/user.router");
const productRouter=require("./router/product.router");
const dbConnection=require("./config/dbConnection");




dbConnection();
app.use(express.json());
app.use(cors());
app.use("/auth",userRouter);
app.use("/product",productRouter);
app.listen(process.env.PORT,()=>{console.log(`Server running on ${process.env.PORT}`)})


