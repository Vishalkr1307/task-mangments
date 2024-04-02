const express = require('express');
const router=express.Router()
const authonicate=require("..//middileware/authonicate")
const {PaymentController,UpdatePayment}=require("..//controller/payment")

router.get("/premium",authonicate,PaymentController)
router.post("/updatePremium",authonicate,UpdatePayment)

module.exports = router
