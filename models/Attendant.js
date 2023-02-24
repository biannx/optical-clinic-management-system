const mongoose = require("mongoose");

const AttendantSchema = new mongoose.Schema({

  //  user id, meron na agad...
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
  title: {
    type: String,
  required: true
  },
  sex: {
    type: String,
  },
  birthday: {
	//    !check kung gagana, or baka string nalang kaya?
    type: Date,
  },
  contact: {
    type: String,
	required: true
  },
  address: {
    type: String
  },
  email: {
    type: String
  },
  is_archived: {
    type: Boolean,
	  default:false,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
  date_added: {
    type: Date
  },
});

// ! Ito yung collection name, First param
const Attendant = mongoose.model("Attendant", AttendantSchema);

module.exports = Attendant;