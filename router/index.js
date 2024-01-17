const express=require("express")
var router=express.Router()
const user =require("./user")
const note =require("./note")

router.use(user)
router.use(note)

module.exports=router;
