const express = require("express");
const {
    getHomePage,
    getPlansPage,
    getloginPage,
    getsignupPage,
    getProfilePage,
    getUpdateuserPage,
    getUpdatePasswordPage,
    getForgetPassword,
    getResetPassword
} = require("../controller/viewController");
const {
    protectRoute,
    logout
} = require("../controller/authController");
const viewRouter = express.Router();
viewRouter.route("").get(getHomePage);
viewRouter.route("/plan").get(getPlansPage);
viewRouter.route("/login").get(getloginPage);
viewRouter.route("/signup").get(getsignupPage);
viewRouter.route("/me").get(protectRoute, getProfilePage);
viewRouter.route("/updateuser").get(getUpdateuserPage);
viewRouter.route("/updatepassword").get(getUpdatePasswordPage);
viewRouter.route("/forgetpassword").get(getForgetPassword);
viewRouter.route("/reset").get(getResetPassword);
viewRouter.route("/logout").get(logout);
// viewRouter.route("/resetpassword").patch(resetPassword);

module.exports = viewRouter;