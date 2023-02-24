const express = require("express");
const PurchaseHistoryModel = require("../models/Purchase_History");
const CustomerModel = require("../models/Customer");
const router = express.Router();

// READ
router.get("/orders", async (request, response) => {
  const orders = await PurchaseHistoryModel.find({});
  const customer = await CustomerModel.find({});

  try {
    response.render("admin/orders/orders.ejs", {orders, customer});
  } catch (error) {
    response.status(500).send(error);
  }
});

// CREATE
router.post("/purchase_history/:id", async (request, response) => {
  request.body.user_id = request.params.id;
  
  const purchase_history = new PurchaseHistoryModel(request.body);

  try {
    await purchase_history.save();
    response.send(purchase_history);
  } catch (error) {
    response.status(500).send(error);
  }
});

// UPDATE
router.patch("/purchase_history/:id", async (request, response) => {
  try {
    await PurchaseHistoryModel.findByIdAndUpdate(request.params.id, request.body);
    await PurchaseHistoryModel.save();
    response.send(purchase_history);
  } catch (error) {
    response.status(500).send(error);
  }
});

// DELETE
router.delete("/purchase_history/:id", async (request, response) => {
  try {
    const purchase_history = await PurchaseHistoryModel.findByIdAndDelete(request.params.id);

    if (!purchase_history) response.status(404).send("No item found");
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

// ! ---------------
module.exports = router;