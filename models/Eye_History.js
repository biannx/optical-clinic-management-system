const mongoose = require("mongoose");

const EHSchema = new mongoose.Schema({

  user_id: {
    type: String,
  },
  attendant_name: {
    type: String,
  },
  previous_grade: {
    type: String,
  },
  current_grade: {
    type: String,
  },
  date_added: {
    type: Date,
  },
});

// ! Ito yung collection name, First param
const Eye_History = mongoose.model("Eye_History", EHSchema);

module.exports = Eye_History;