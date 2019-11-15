const express = require("express");
// const pug = require("pug");
const cookieParser=require("cookie-parser");
//
const app = express();
app.use(cookieParser());
const userRouter = require("./router/userRouter");
const planRouter = require("./router/planRouter");
const viewRouter = require("./router/viewRouter");
const bookingRouter=require("./router/bookingRouter");
const rateLimit = require("express-rate-limit");
const mongoSanitize=require('express-mongo-sanitize');
const hpp=require('hpp');
// Middleware
//  to serve static files
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message:"Cannot give more requests"
  });
app.use(limiter);
app.use(express.static("public"));
// to express to not to ignore icoming json data from body
app.use(express.json());
// Sub Apps
// Routes
//templating engine=> handlebar,EJS ,pug
app.set("view engine", "pug");
// template folder
app.set("views", "view");
// app.get("/", function(req, res) {
//   res.status(200).render("home.pug");
// });
// app.get("/plan", function(req, res) {
//   res.status(200).render("plan.pug");
// });
// /plans
app.use("/api/user", userRouter);
app.use("/api/plan", planRouter);
app.use("/", viewRouter);
app.use("/api/booking",bookingRouter);
app.use(mongoSanitize());
app.use(hpp()); 
// app.use("", function(req, res) {
//   res.status(200).json({
//     Result: "Response from api"
//   });
// });

module.exports = app;
