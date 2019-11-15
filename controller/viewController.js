const planModel = require("../model/planModel");
module.exports.getHomePage = async function(req, res) {
  let plans = await planModel.find();
  plans = plans.slice(0, 3);
  res.status(200).render("home.pug", {
    plans: plans,
    pageName:"Home Page"
  });
};

module.exports.getPlansPage = async function(req, res) {
  let plans = await planModel.find();
  // get All plans
  res.status(200).render("planPage.pug",{plans:plans,
  pageName:"Plan Page"});
};
module.exports.getloginPage=async function (req,res) {
  res.status(200).render("login.pug");
};
module.exports.getsignupPage=async function (req,res) {
  res.status(200).render("signup.pug");
}
module.exports.getProfilePage= async function(req,res) {
  const user=req.user;
  res.status(200).render("me.pug",{
    user:req.user
  });
}
module.exports.getUpdateuserPage=async function (req,res) {
  res.status(200).render("updateuser.pug");
}
module.exports.getUpdatePasswordPage=async function (req,res) {
  res.status(200).render("updatepassword.pug");
}
module.exports.getForgetPassword=async function(req,res){
  res.status(200).render("forgetpassword.pug");
}
module.exports.getResetPassword=async function(req,res){
  res.status(200).render("reset.pug");
}