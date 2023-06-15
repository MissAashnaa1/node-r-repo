const express=require("express")
const fs = require("fs")
const router=express.Router()

app = express();
const session = require("express-session")//


app.use(session({
    secret: 'keyboard cat',//encoding
    resave: false,//for every request to    server even if req is from same user or browser it resetssession cookie 
    saveUninitialized: false,//if something not added then no sessions would b created
    //cookie sec//the session cookie will be considered third party and blocked by your browser
}))

router.get("/",(req, res) =>{
    res.render("login.ejs",{phrase:""})

    // if (req.session.login) {
    //     res.redirect("/")
    // }
    // else {
       
    // }
})
.post('/',(req,res)=>{
    if(req.body.email =="training@jalaacademy.com" && req.body.password == "jobprogram"){
        req.session.is_logged_in = true;
        res.redirect('/home');
    }else{
        res.render("login",{phrase:"enter correct email and password"})
    }
})

module.exports=router;