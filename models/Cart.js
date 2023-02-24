const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({

  user_id: {
    type: String,
  },
  item_id: {
    type: String,
  },
  item_name: {
    type: String
  },
  item_price: {
    type: Number
  },
  image: {
    type: String
  },
  qty: {
    type: Number,
  },
  lens: {
    type: String,
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
  }

});

// ! Ito yung collection name, First param
const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;