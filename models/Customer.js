const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({

  //  customer id, meron na agad...
  first_name: {
    type: String,
	required: true
  },
  middle_name: {
    type: String,
  },
  last_name: {
    type: String,
	required: true
  },
  suffix: {
    type: String,
    default: ""
  },
  sex: {
    type: String,
  },
  birthday: {
	//    !check kung gagana, or baka string nalang kaya?
    type: Date,
  },
  address: {
    type: String,
	required: true
  },
  contact: {
    type: String,
	required: true
  },
  type: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  is_archived: {
    type: Boolean,
	default:false,
  },
  is_admin: {
    type: String,
	default:false,
  },
  date_added: {
    type: Date,
  },

});

// ! Ito yung collection name, First param
const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;