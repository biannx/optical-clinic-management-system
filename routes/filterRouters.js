const express = require("express");
const FilterModel = require("../models/Filter");
const router = express.Router();

// READ
router.get("/filters", async (request, response) => {
  const filters = await FilterModel.find({});

  try {
    response.send(filters);
  } catch (error) {
    response.status(500).send(error);
  }
});

// CREATE
router.post("/filter", async (request, response) => {
  const filter = new FilterModel(request.body);

  try {
    await filter.save();
    response.send(filter);
  } catch (error) {
    response.status(500).send(error);
  }
});

// UPDATE
router.patch("/filter/:id", async (request, response) => {
  try {
    await FilterModel.findByIdAndUpdate(request.params.id, request.body);
    await FilterModel.save();
    response.send(filter);
  } catch (error) {
    response.status(500).send(error);
  }
});

// DELETE
router.delete("/filter/:id", async (request, response) => {
  try {
    const filter = await FilterModel.findByIdAndDelete(request.params.id);

    if (!filter) response.status(404).send("No item found");
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

// ! ---------------
module.exports = router;