const express = require("express");
const PurchaseHistoryModel = require("../models/Purchase_History");
const CustomerModel = require("../models/Customer");
const ProductModel = require("../models/Product");
const mongoose = require('mongoose');
const router = express.Router();

// READ
router.get("/dashboard", async (request, response) => {
    const orders = await PurchaseHistoryModel.find({}, null, {sort: {date: -1}});
    const frequencies = await PurchaseHistoryModel
    .aggregate([
        {"$group" : { "_id": "$item_id", "count": { "$sum": 1 } } },
        {"$match": {"_id" :{ "$ne" : null } , "count" : {"$gt": 1} } }, 
        {"$project": {"item_id" : "$_id", "_id" : 0} }
    ]);

    let top_seller = [];
    for(let frequency of frequencies) {
        top_seller.push(mongoose.Types.ObjectId(frequency.item_id));
    }
    
    let top_seller_filtered = [];

    for(let product of top_seller) {
        top_seller_filtered.push(await ProductModel.findOne({"_id": product}))
    }
    top_seller_filtered.reverse();

    const customers = await CustomerModel.find({});

    const data = {
        total_order: await PurchaseHistoryModel.countDocuments(),
        total_customers: await CustomerModel.countDocuments(),
        total_sales: 0,
        total_profit: 0
    };

    for(let order of orders) {
        if(order.status == 1) {
            data.total_sales += 1;
            data.total_profit += (order.price * order.quantity);
        }

        
    }

    try {
      response.render("admin/dashboard.ejs", {data, orders, customers, top_seller_filtered});
    } catch (error) {
      response.status(500).send(error);
    }
  });

// ! ---------------
module.exports = router;