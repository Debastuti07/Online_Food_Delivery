const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  foodType: String,
  image: String   
});

module.exports = mongoose.model("Menu", menuSchema);