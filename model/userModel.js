// Driver
const mongoose = require("mongoose");
// const crypto=require("crypto");
const validatior = require("validator");
const crypto = require("crypto");
const bcrypt=require('bcrypt');
// DB
const DB =
  "mongodb+srv://admin:123abc@cluster0-asaze.mongodb.net/test?retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(function(conn) {
    console.log("user DB connected");
    // console.log(conn.connection);
  })
  .catch({
    function(err) {
      console.log("Data Base could not be connected");
    }
  });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is a required Field"],
    maxlength: 40,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    validate: validatior.isEmail
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "Restaurant Owner", "user", "Delivery Boy"],
    default: "user"
  },
  confirmpassword: {
    type: String,
    required: true,
    validate: {
      validator: function() {
        return this.password === this.confirmpassword;
      },
      message: "Password and confirm password are not equal"
    }
  },
  token: String
});

userSchema.pre("save", async function() {
  this.password=await bcrypt.hash(this.password,8);
  this.confirmpassword = undefined;
});
userSchema.method("generateToken", function() {
  const token = crypto.randomBytes(32).toString("hex");//was coming in array and we want string in hexa decimal
  
  this.token = token;
  return token;
});

// collection
const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;
