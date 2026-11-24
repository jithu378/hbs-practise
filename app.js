const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();

app.set("view engine", "hbs");

app.use(express.static("public"))
app.use(express.urlencoded({extended : true}));
app.use("/uploads", express.static("uploads"));
app.use(session({
    secret : "mySecretKey",
    resave : false,
    saveUninitialized : false
}))

mongoose.connect("mongodb://localhost:27017/practice")
.then(()=>{
    console.log("connection successful")
}).catch(()=>{
    console.log("connection failed")
})

// const userRouter = require("./router/user");
// app.use("/user", userRouter);

app.listen(3000, ()=>{
    console.log("server connected to port 3000");
})