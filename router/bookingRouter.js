const express=require('express');
let bookingRouter=express.Router();
const {checkout}=require('../controller/bookingController');
bookingRouter.route("/checkout").post(checkout);
module.exports=bookingRouter;