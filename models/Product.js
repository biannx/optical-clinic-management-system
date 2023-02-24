const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({

  name: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  stock: {
    type: Number,
  },
  price: {
    type: Number,
  },
  is_archived: {
    type: Boolean,
	default:false,
  },
  lens: {
    type: String
  },
  width: {
    type: String
  },
  material: {
    type: String
  },
  hinge: {
    type: String
  },
  finish: {
    type: String
  },
  date_added: {
    type: Date,
    default: new Date()
  },
});

// ! Ito yung collection name, First param
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;