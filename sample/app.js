// 1. Import packages
const express = require ("express");
const mongoose = require("mongoose");
const session = require("express-session");

// 2. Initialize Express
const app = express();


// 3. Configure view engine
app.set("view engine","hbs")


// 4. Register middleware
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use("/uploads",express.static("uploads"))
app.use(session({
    secret : "mySecretKey",
    resave : false,
    saveUninitialized : false
}))


// 5. Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/E-commerce-study")
.then(()=>{
    console.log("connected")
}).catch(() =>{
    console.log("connection failed")
});


// 6. Import and register routes
const productRouter = require("./router/product")
app.use("/product",productRouter);
const userRouter = require("./router/user")
app.use("/user",userRouter);


// 7. Start the server
app.listen(3000, ()=>{
    console.log("Server is running on http://localhost:3000/product")
})
