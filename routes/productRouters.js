const express = require("express");
const ProductModel = require("../models/Product");
const FilterModel = require("../models/Filter");
const router = express.Router();

// READ
router.get("/product/:id", async (request, response) => {
  const product = await ProductModel.findOne({_id: request.params.id});

  try {
    response.render("admin/products/view-product.ejs", {product});
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/products", async (request, response) => {
  const products = await ProductModel.find({is_archived: false});

  try {
    response.render("admin/products/products.ejs", {products});
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/add-product", async (request, response) => {
  try {
    response.render("admin/products/add-product.ejs");
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/update-product/:id", async (request, response) => {
  const product = await ProductModel.findOne({_id: request.params.id});
  const filters = await FilterModel.find({});

  try {
    response.render("admin/products/update-product.ejs", {product, filters});
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/products/archives", async (request, response) => {

  const products = await ProductModel.find({is_archived: true});

  try {
    response.render("admin/products/archives.ejs", {products});
  } catch (error) {
    response.status(500).send(error);
  }
});


// CREATE
router.post("/product", async (request, response) => {
  const product = new ProductModel(request.body);

  try {
    await product.save();
    response.redirect("add-product");
  } catch (error) {
    response.status(500).send(error);
  }
});

// BATCH ARCHIVE
router.patch("/product/archive", async (request, response) => {
  const archives = request.body;

  if(archives["archive-check"]) {
    for(let archive of archives["archive-check"]) {
      if(archive.length === 1) {
        await ProductModel.findByIdAndUpdate(archives["archive-check"], {is_archived: true});
        break;
      }
      else {
        await ProductModel.findByIdAndUpdate(archive, {is_archived: true});
      }
    }
  }

  response.redirect("/api/products");
});

// BATCH RESTORE
router.patch("/product/restore", async (request, response) => {
  const restores = request.body;

  if(restores["archive-check"]) {
    for(let restore of restores["archive-check"]) {
      if(restore.length === 1) {
        await ProductModel.findByIdAndUpdate(restores["archive-check"], {is_archived: false});
        break;
      }
      else {
        await ProductModel.findByIdAndUpdate(restore, {is_archived: false});
      }
    }
  }

  response.redirect("/api/products/archives");
});

// UPDATE
router.patch("/product/:id", async (request, response) => {
  try {
    await ProductModel.findByIdAndUpdate(request.params.id, request.body);
    response.redirect("/api/product/" + request.params.id);
  } catch (error) {
    response.status(500).send(error);
  }
});

// DELETE
router.delete("/product/:id", async (request, response) => {
  try {
    const product = await ProductModel.findByIdAndDelete(request.params.id);

    if (!product) response.status(404).send("No product found");
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

// ! ---------------
module.exports = router;