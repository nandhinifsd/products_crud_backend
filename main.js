const express=require("express");
const app=express();
require("dotenv").config();
const cors=require("cors");
const userRouter=require("./router/user.router");
const productRouter=require("./router/product.router");
const dbConnection=require("./config/dbConnection");

app.use(cors({
  origin: [
    "http://localhost:5174",
    "http://localhost:5173",
    "https://ecomappdemo1.netlify.app"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));



dbConnection();
app.use(express.json());
//app.use(cors());
app.use("/auth",userRouter);
app.use("/product",productRouter);
//app.listen(process.env.PORT,()=>{console.log(`Server running on ${process.env.PORT}`)})
module.exports=app;


