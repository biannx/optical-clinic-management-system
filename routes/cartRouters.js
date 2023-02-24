const express = require("express");
const cartModel = require("../models/Cart");
const router = express.Router();

// READ
router.get("/carts", async (request, response) => {
  const carts = await cartModel.find({});

  try {
    response.send(carts);
  } catch (error) {
    response.status(500).send(error);
  }
});

// CREATE
router.post("/cart", async (request, response) => {
  const cart = new cartModel(request.body);

  try {
    await cart.save();
    response.send(cart);
  } catch (error) {
    response.status(500).send(error);
  }
});

// UPDATE
router.patch("/cart/:id", async (request, response) => {
  try {
    await cartModel.findByIdAndUpdate(request.params.id, request.body);
    await cartModel.save();
    response.send(cart);
  } catch (error) {
    response.status(500).send(error);
  }
});

// DELETE
router.delete("/cart/:id", async (request, response) => {
  try {
    const cart = await cartModel.findByIdAndDelete(request.params.id);

    if (!cart) response.status(404).send("No item found");
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

// ! ---------------
module.exports = router;