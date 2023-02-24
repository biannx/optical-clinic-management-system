const express = require("express");
const AdminModel = require("../models/Attendant");
const router = express.Router();

// READ
router.get("/admins", async (request, response) => {
  const admins = await AdminModel.find({is_admin: true});

  try {
    response.render("admin/admins/admin-accounts.ejs", {admins});
  } catch (error) {
    response.status(500).send(error);
  }
});

// READ
router.get("/change-password", async (request, response) => {
  const admins = await AdminModel.find({is_admin: true});

  try {
    response.render("admin/admin-change-password.ejs", {admins});
  } catch (error) {
    response.status(500).send(error);
  }
});

// CREATE
router.post("/admin", async (request, response) => {
  const admin = new AdminModel(request.body);

  try {
    await admin.save();
    response.redirect("/api/admins")
  } catch (error) {
    response.status(500).send(error);
  }
});

// UPDATE
router.patch("/admin/:id", async (request, response) => {
  try {
    await AdminModel.findByIdAndUpdate(request.params.id, request.body);
    response.redirect("/api/admins");
  } catch (error) {
    response.status(500).send(error);
  }
});

// DELETE
router.delete("/admin/:id", async (request, response) => {
  try {
    const admin = await AdminModel.findByIdAndDelete(request.params.id);

    if (!admin) response.status(404).send("No item found");
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

// ! ---------------
module.exports = router;