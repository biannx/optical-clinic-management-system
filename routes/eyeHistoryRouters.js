const express = require("express");
const EhModel = require("../models/Eye_History");
const router = express.Router();

// READ
router.get("/eye_histories", async (request, response) => {
  const eye_histories = await EhModel.find({});

  try {
    response.send(eye_histories);
  } catch (error) {
    response.status(500).send(error);
  }
});

// CREATE
router.post("/eye_history/:id", async (request, response) => {
  const eye_history = new EhModel(request.body);

  try {
    await eye_history.save();
    response.redirect("/api/customer/" + request.params.id);
  } catch (error) {
    response.status(500).send(error);
  }
});

// UPDATE
router.patch("/eye_history/:id", async (request, response) => {
  try {
    await EhModel.findByIdAndUpdate(request.params.id, request.body);
    await EhModel.save();
    response.send(eye_history);
  } catch (error) {
    response.status(500).send(error);
  }
});

// DELETE
router.delete("/eye_history/:id", async (request, response) => {
  try {
    const eye_history = await EhModel.findByIdAndDelete(request.params.id);

    if (!eye_history) response.status(404).send("No item found");
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

// ! ---------------
module.exports = router;