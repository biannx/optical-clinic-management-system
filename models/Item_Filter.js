const mongoose = require("mongoose");

const Item_FilterSchema = new mongoose.Schema({

  item_id: {
    type: String,
  },
  filter_id: {
    type: String,
  },
  date: {
    type: Date,
  },
});

// ! Ito yung collection name, First param
const Item_Filter = mongoose.model("Item_Filter", Item_FilterSchema);

module.exports = Item_Filter;