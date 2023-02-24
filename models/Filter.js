const mongoose = require("mongoose");

const FilterSchema = new mongoose.Schema({

  name: {
    type: String,
  },
  type: {
    type: String,
  },
  date_added: {
    type: Date,
  },
});

// ! Ito yung collection name, First param
const Filter = mongoose.model("Filter", FilterSchema);

module.exports = Filter;