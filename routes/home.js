const express=require("express")
const router=express.Router()
const fs = require("fs");

const dir="H:\\javascript\\node-project";
router.route("/").get(function (req, res) {
    res.render("home.ejs")
})
module.exports=router;