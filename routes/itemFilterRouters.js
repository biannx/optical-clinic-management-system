// itemFilterRouters.js
const express = require("express");
const IFModel = require("../models/Item_Filter");
const router = express.Router();

// READ
router.get("/item_filters", async (request, response) => {
  const item_filters = await IFModel.find({});

  try {
    response.send(item_filters);
  } catch (error) {
    response.status(500).send(error);
  }
});

// CREATE
router.post("/item_filter", async (request, response) => {
  const item_filter = new IFModel(request.body);

  try {
    await item_filter.save();
    response.send(item_filter);
  } catch (error) {
    response.status(500).send(error);
  }
});

// UPDATE
router.patch("/item_filter/:id", async (request, response) => {
  try {
    await IFModel.findByIdAndUpdate(request.params.id, request.body);
    await IFModel.save();
    response.send(item_filter);
  } catch (error) {
    response.status(500).send(error);
  }
});

// DELETE
router.delete("/item_filter/:id", async (request, response) => {
  try {
    const item_filter = await IFModel.findByIdAndDelete(request.params.id);

    if (!item_filter) response.status(404).send("No item found");
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

// ! ---------------
module.exports = router;