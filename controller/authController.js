const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const secret = "mysecret";
const email=require("../utility/email");
const bcrypt=require("bcrypt");
// define secret key
module.exports.signup = async function(req, res) {
  // 1. create user
  const user = await userModel.create(req.body);
  // 2. payload
  const id = user["_id"];
  //jwt.sign
  const token = await jwt.sign({ id }, secret);
  res.cookie("jwt",token,{
    httpOnly:true
  });
  res.status(201).json({
    success: "User  Created ",
    user
  });
};
module.exports.login = async function(req, res) {
  // 1. create user
  try {

    const user = await userModel.findOne({ email: req.body.email });
    const dbpassword = user.password;
    // console.log(user);
    // 2. payload
    if (user) {
   
    const id = user["_id"];
    const answer=bcrypt.compare(dbpassword,user.password);
    if (answer) {
      const token = await jwt.sign({ id }, secret);
      res.cookie("jwt",token,{
        httpOnly:true
      });
      return res.status(201).json({
        success: "User  loggedIn",
        user,
        token
      });
    } else {
      return res.status(201).json({
        status: "please enter correct email or passwordf"
      });
    }
       
  }else{
    res.status(201).json({
      data:"user not foud"
    });
  }

    //jwt.sign
  } catch (err) {
    res.status(401).json({
      data: err
    });
  }
};

module.exports.protectRoute = async function(req, res, next) {
  const token=req.cookies? req.cookies.jwt : null||req.headers.authorization?req.headers.authorization.split(" ")[1]:null;
  // console.log(token);
  try {
    if (token) {
      // const token = req.headers.authorization.split(" ")[1];
      const ans = await jwt.verify(token, secret);
      // console.log(ans);
      if (ans) {
        const user = await userModel.findOne({ _id: ans.id });
        req.role = user.role;
        req.user = user;
        next();
      } else {
        return res.status(401).json({
          data: "Something went wrong please login again"
        });
      }
    } else {
      return res.status(401).json({
        data: "User not logged in"
      });
    }
  } catch (err) {
    res.json({
      data: err
    });
  }
};

module.exports.isAuthorized = function(roles) {
  return function(req, res) {
    // console.log(roles);
    if (roles.includes(req.role)) {
      next();
    } else {
      res.status(401).json({
        data: "You are not authorized"
      });
    }
  };
  //1. Get  user
  // 2. User role
  // 3.role==admin
  // if(res.role==)
};
module.exports.updatePassword =async function(req, res) {
  console.log("reached");
  const user = req.user;
  if (req.body.password && req.body.newpassword && req.body.confirmpassword) {
    const prevPass = req.body.password;
    const newPass = req.body.newpassword;
    const confirmpassword = req.body.confirmpassword;
    const answer=await bcrypt.compare(user.password,prevPass);
    if (answer) {
      user.password = newPass;
      user.confirmpassword = confirmpassword;
      user.save();
      return res.json({
        success: "password updated"
      });
    }
  } else {
    return res.json({
      data: "Please enter correct input"
    });
  }
};

// forget Password

// reset Password
// res.status(201).json({
//   data: req.headers
// });

module.exports.forgetPassword =async function(req, res) {
  try{
  //1.  findOne using email
  const user=await userModel.findOne({email:req.body.email});
  if(user){
    // 2. add token property to that user

const token=user.generateToken();
await user.save({validateBeforeSave:false});
let options={
  to:user.email,
  subject:"Reset Token",
  text:token,
  html:`<h1></h1>${token}`
}
await email(options);
res.status(201).json({
  // token
  success:"Reset token has been sent to registered emailid"
})    
  }else{
    res.json({
      data:"user with this email does not exist"
    })
  }}
  catch(err){res.status(401).json({data:err});

  }
  // 3. send token to the client
};
module.exports.resetPassword=async function (req,res) {
  try{
    const token = req.body.token
  let user=await userModel.findOne({
    token :token
  });
  if (user) {
    if (req.body.password === req.body.confirmpassword) {
      user.password = req.body.password;
      user.token=undefined;
      await user.save({validateBeforeSave:false});
    
   return res.json({
     data:"password updated",
     user
   });
  }else{
    res.json({
      data:"Can't update password"
    });
  }
}
} catch (err) {
  console.log(err);
  res.status(401).json({
    data: err
  });
}

}
module.exports.logout=function(req,res){
  res.cookie("jwt","randomstring",{
    httpOnly:true,
    expires:new Date(Date.now())
  });
  res.redirect("/");
}