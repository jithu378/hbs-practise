const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"login"
        },
        productName : String,
        productPrice : Number,
        productStock : Number,
        productQuantity : Number,
        productImage : String
    }
)
module.exports=mongoose.model("Product",productSchema)
