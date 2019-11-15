const express = require("express");
const userRouter = express.Router();

const {
  getAllUser,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  checkInput
} = require("../controller/userController");
let {
  signup,
  protectRoute,
  isAuthorized,
  updatePassword,login,forgetPassword,resetPassword
} = require("../controller/authController");

// /api/user=>
// post => user create => name
// Chaining

userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);
userRouter.route("/updatepassword").patch(protectRoute,updatePassword);
userRouter.route("/forgetpassword").patch(forgetPassword);
userRouter.route("/resetpassword").patch(resetPassword);
userRouter
  .route("")
  .get(protectRoute, isAuthorized(["admin"]), getAllUser)
  .post(checkInput, createUser);
// /api/user/myuser
// userRouter.route("/myuser").get(getMyuser);

userRouter
  .route("/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = userRouter;
