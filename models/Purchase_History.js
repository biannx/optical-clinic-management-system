const mongoose = require("mongoose");

const PHSchema = new mongoose.Schema({

  user_id: {
    type: String,
  },
  item_id: {
    type: String,
  },
  name: {
    type: String
  },
  product_name: {
    type: String
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
  contact: {
    type: String
  },
  address: {
    type: String
  },
  date: {
    type: Date,
  },
  quantity: {
    type: Number
  },
  item_img: {
    type: String,
  },
  price: {
    type: Number,
  },
  payment_type: {
    type: Number,
    default: 1
  },
  status: {
    type: Number,
  },
  date_added: {
    type: Date,
  },
});

// ! Ito yung collection name, First param
const Purchase_History = mongoose.model("Purchase_History", PHSchema);

module.exports = Purchase_History;