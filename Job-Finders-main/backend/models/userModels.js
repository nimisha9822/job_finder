const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Require"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is Require"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is Require"],
      minLength: [6, "Password length should be greather than 6"],
      select : true
    },
    location: {
      type: String,
      default: "India",
    },
    role:{
      type : String,
      default : "Student"
    }
  },
  { timestamps: true }
);
userSchema.pre("save", async function () {
  if(!this.isModified)return ;
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});
// userSchema.methods.comparePassword=async function(userPassword){
//     const isMatch = await bcryptjs.compare(userPassword,this.password)
//     return isMatch
// }
// userSchema.methods.createJWT = function () {
//   return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
//     expiresIn: "1d",
//   });
// };
module.exports = new mongoose.model("User", userSchema);
