const auth = (req,res,next)=>{
    if(req.session.Userid){
        next()
    }else{
        return res.redirect("/user/login")
    }
}
module.exports=auth;
