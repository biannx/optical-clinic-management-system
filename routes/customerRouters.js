const express = require("express");
const CustomerModel = require("../models/Customer");
const PurchaseHistoryModel = require("../models/Purchase_History");
const EyeHistoryModel = require("../models/Eye_History");
const AttendantModel = require("../models/Attendant");
const router = express.Router();

// READ
router.get("/customer/:id", async (request, response) => {
  const customer = await CustomerModel.findOne({_id: request.params.id});
  const purchaseHistories = await PurchaseHistoryModel.find({user_id: request.params.id});
  const eyeHistory = await EyeHistoryModel.find({user_id: request.params.id});
  const customers = await CustomerModel.find({});
  const attendants = await AttendantModel.find({});

  try {
    response.render("admin/customers/view-customer.ejs", {customer, purchaseHistories, eyeHistory, customers, attendants});

  } catch(error) {
    response.status(500).send(error);
  }
});

router.get("/customers", async (request, response) => {
  const customers = await CustomerModel.find({is_archived: false});
  try {
    response.render("admin/customers/customers.ejs", {customers});
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/customers/archives/", async (request, response) => {
  const customers = await CustomerModel.find({is_archived: true});

  try {
    response.render("admin/customers/archives.ejs", {customers});
  } catch (error) {
    response.status(500).send(error);
  }
});

// CREATE
router.post("/customer", async (request, response) => {
  const customer = new CustomerModel(request.body);

  try {
    await customer.save();
    response.redirect("customers");
  } catch (error) {
    response.status(500).send(error);
  }
});

// BATCH ARCHIVE
router.patch("/customer/archive", async (request, response) => {
  const archives = request.body;

  if(archives["archive-check"]) {
    for(let archive of archives["archive-check"]) {
      if(archive.length === 1) {
        await CustomerModel.findByIdAndUpdate(archives["archive-check"], {is_archived: true});
        break;
      }
      else {
        await CustomerModel.findByIdAndUpdate(archive, {is_archived: true});
      }
    }
  }

  response.redirect("/api/customers");
});

// BATCH RESTORE
router.patch("/customer/restore", async (request, response) => {
  const restores = request.body;

  if(restores["archive-check"]) {
    for(let restore of restores["archive-check"]) {
      if(restore.length === 1) {
        await CustomerModel.findByIdAndUpdate(restores["archive-check"], {is_archived: false});
        break;
      }
      else {
        await CustomerModel.findByIdAndUpdate(restore, {is_archived: false});
      }
    }
  }

  response.redirect("/api/customers/archives");
});

// UPDATE
router.patch("/customer/:id", async (request, response) => {
  try {
    await CustomerModel.findByIdAndUpdate(request.params.id, request.body);
    response.redirect("/api/customer/" + request.params.id);

  } catch (error) {
    response.status(500).send(error);
  }
});

// DELETE
router.delete("/customer/:id", async (request, response) => {
  try {
    const customer = await CustomerModel.findByIdAndDelete(request.params.id);

    if (!customer) response.status(404).send("No item found");
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

// ! ---------------
module.exports = router;