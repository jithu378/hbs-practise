const express = require("express")
const router = express.Router();
const multer = require("multer");
const auth = require("../middleware/auth")

const Product = require("../models/productModel")
const User = require("../models/userModel")
const storage = multer.diskStorage({

    destination: (req, file, callback) => {
        callback(null, "uploads/")
    },

    filename: (req, file, callback) => {
        callback(null, Date.now() + "-" + file.originalname)
    }

})
const uploads=multer({storage})
// const file = multer({dest:"uploads/"})

// const data = [
//     {name : "jithu"},
//     // {name : "prabin", age: 22},
//     // {name :"nandhakishor", age:22}                     
// ]


router.get("/",(req,res)=>{
    res.render("home")
})

router.get("/about",(req,res)=>{
    res.render("about")
})

router.get("/contact",(req,res)=>{
    res.render("contact")
})

router.get("/form",auth ,(req,res)=>{
    res.render("product")
})

router.get("/display", auth, async (req,res)=>{

        const data = await Product.find({
        user: req.session.Userid
    });

    // console.log("Current User:", req.session.Userid);
    // console.log("Products:", data);

    res.render("displayproduct", {data});
});


router.post("/add-product", auth, uploads.single("productImage"), async (req,res)=>{
    // let productName = req.body.productName;
    // let productPrice = req.body.productPrice;
    // console.log(productName,productPrice);
    // res.send("product added")

    const{productName, productPrice, productStock, productQuantity} = req.body;
    console.log(req.file)
    const image = `/uploads/${req.file.filename}`

    const data = await Product.create ({
        user: req.session.Userid,
        productName : productName,
        productPrice : productPrice,
        productStock : productStock,
        productQuantity : productQuantity,
        productImage : image
    })
    // let data = [{
    //     productName, productPrice, productStock, productQuantity
    // }]
    res.render("details",{data})
})

router.get("/singleproduct/:id", auth, async (req, res) => {

    const data = await Product.findOne({
        _id: req.params.id,
        user: req.session.Userid
    });

    // if (!data) {
    //     return res.redirect("/product/display");
    // }

    res.render("singleproductdisplay", { data });
});

router.post("/delete/:id", auth, async (req, res) => {
    try{
        await Product.findOneAndDelete({
            _id: req.params.id,
            user: req.session.Userid
        });

    }catch(error){
        console.log(error)
        res.redirect("/product/");
    }
});

//update the data
router.get("/update/:id", auth, async (req,res)=>{
    try{
        const data = await Product.findById(req.params.id);
        res.render("updateproduct",{data});
    }catch(error){
        console.log(error);
        res.render("/product/");
    }

})

router.post("/updatesave/:id", uploads.single("productImage"),auth, async (req,res)=>{
    try{
        
        const{productName,productPrice,productQuantity,productStock}= req.body
        const data = {
        productName : productName,
        productPrice : productPrice,
        productStock : productStock,
        productQuantity : productQuantity,
        };
        if(req.file){
            data.productImage = `/uploads/${req.file.filename}`;
        }
        const update = await Product.findByIdAndUpdate(req.params.id, data,{returnDocument : "after"});
        res.redirect("/product/")
    }catch(error){
        console.log(error)
        res.redirect("/product/")
    }
})


module.exports=router
