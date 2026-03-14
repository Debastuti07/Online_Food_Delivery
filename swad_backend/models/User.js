const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
   mobile: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/   // 10 digits
  },

  dob: {
    type: Date,
    required: true
  }
});


module.exports = mongoose.model("User", userSchema);