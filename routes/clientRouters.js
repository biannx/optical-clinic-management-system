const express = require("express");
const ProductModel = require("../models/Product")
const CustomerModel = require("../models/Customer")
const AppointmentModel = require("../models/Appointment");
const PurchaseHistoryModel = require("../models/Purchase_History");
const EyeHistoryModel = require("../models/Eye_History");
const CartModel = require("../models/Cart");
const FilterModel = require("../models/Filter");
const fs = require("fs");
const path = require("path");
const pdf = require("pdf-creator-node");
const mongoose = require('mongoose');
const router = express.Router();

// READ
router.get("/home", async (request, response) => {
  const products = await ProductModel.find({});
  const {session} = request;
  try {
    response.render("client/home.ejs", {products, session});
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/products", async (request, response) => {
  // const products = await ProductModel.find({
  //   "lens": request.query.lens,
  //   "width": request.query.width,
  //   "material": request.query.material,
  //   "hinge": request.query.hinge,
  //   "finish": request.query.finish});

   const products = await ProductModel.find({
    "lens": (request.query.lens)? request.query.lens: {$ne:null},
    "width": (request.query.width)? request.query.width: {$ne:null},
    "material": (request.query.material)? request.query.material: {$ne:null},
    "hinge": (request.query.hinge)? request.query.hinge: {$ne:null},
    "finish": (request.query.finish)? request.query.finish: {$ne:null}
   });
  const {session} = request;
  const id = mongoose.Types.ObjectId(session.user_id)
  const user = await CustomerModel.findById(id);
  const filters = await FilterModel.find({});

  try {
    response.render("client/products/all-products.ejs", {products, filters, session, user});
  } catch (error) {
    response.status(500).send(error);
  }

});

router.get("/product/:id", async (request, response) => {
  const product = await ProductModel.findById(request.params.id);
  const {session} = request;
  request.session.cartqty = await CartModel.countDocuments({user_id: session.user_id});
  const id = mongoose.Types.ObjectId(session.user_id)
  const user = await CustomerModel.findById(id);

  try {
    response.render("client/products/product-details.ejs", {product, user, session});
  } catch (error) {
    response.status(500).send(error);
  }

});

router.get("/cart", async (request, response) => {
  const {session} = request;
  request.session.cartqty = await CartModel.countDocuments({user_id: session.user_id});
  const cart = await CartModel.find({user_id: session.user_id});
  const id = mongoose.Types.ObjectId(session.user_id)
  const user = await CustomerModel.findById(id);

  try {
    response.render("client/products/cart.ejs", {user, session, cart} );
  } catch (error) {
    response.status(500).send(error);
  }

});

router.post("/product/add-to-cart/:id", async (request, response) => {
  const {session} = request;
  const id = mongoose.Types.ObjectId(session.user_id)
  const user = await CustomerModel.findById(id);

  const cart = new CartModel(request.body);
  try {
    await cart.save();
    response.redirect("/cart");
  } catch (error) {
    response.status(500).send(error);
  }

});

router.delete("/cart/checkout/:id", async (request, response) => {
  const {session} = request;
  const id = mongoose.Types.ObjectId(session.user_id)
  const user = await CustomerModel.findById(id);
  const cart = await CartModel.find({user_id: session.user_id})

  if(request.body["cart-checks"]) {
    if(request.body["cart-checks"].length === 1) {
      for(let product of cart) {

          if(mongoose.Types.ObjectId(request.body["cart-checks"]).equals(product._id)) {
            let purchaseHistory = new PurchaseHistoryModel({user_id: product.user_id, 
              item_id: product.item_id,
              name: user.first_name + " " + user.middle_name + " " + user.last_name,
              contact: user.contact,
              address: user.address,
              product_name: product.item_name,
              lens: product.lens,
              width: product.width,
              material: product.material,
              hinge: product.hinge,
              finish: product.finish,
              date: Date.now(),
              quantity: product.qty,
              item_img: product.image,
              price: product.item_price,
              payment_type: 1,
              status: 1,
              date_added: Date.now()});
    
            await purchaseHistory.save();
    
            break;
          }
        
      }
    
      // await CartModel.deleteMany({user_id: session.user_id});
    
      const html = fs.readFileSync(path.join(__dirname, "../views/template.html"), "utf-8");
      const filename = "invoice" + Math.random() + "_doc.pdf"; 
      let array = [];
      let subtotal = 0;
      let shippingFee = 50;
      let total = 50;
    
      for(let product of cart) {
        for(let cartID of request.body["cart-checks"].split(",")) { 
          if(mongoose.Types.ObjectId(cartID).equals(product._id)) {
            subtotal += product.item_price * product.qty;
            total += product.item_price * product.qty;
            const prod = {
              name: product.item_name,
              quantity: product.qty,
              price: product.item_price,
              total: product.item_price * product.quantity,
            }
            array.push(prod);
    
            break;
          }
        }
      }
    
      const obj = {
        prodlist: array,
        subtotal,
        shippingFee,
        total
      }
    
      const document = {
        html: html,
        data: {
            products: obj
        },
        path: './docs/' + filename
      }
      const options = {
        formate: 'A3',
        orientation: 'portrait',
        border: '2mm',
      }
    
      pdf.create(document, options)
                .then(res => {
                  response.download("./docs/" + filename);
                }).catch(error => {
                  response.status(500).send(error);
                });
    
      const filepath = 'http://localhost:3000/docs/' + filename;
    }
    else {
      for(let product of cart) {
        for(let cartID of request.body["cart-checks"].split(",")) {
          if(mongoose.Types.ObjectId(cartID).equals(product._id)) {
            let purchaseHistory = new PurchaseHistoryModel({user_id: product.user_id, 
              item_id: product.item_id,
              name: user.first_name + " " + user.middle_name + " " + user.last_name,
              contact: user.contact,
              address: user.address,
              product_name: product.item_name,
              lens: product.lens,
              width: product.width,
              material: product.material,
              hinge: product.hinge,
              finish: product.finish,
              date: Date.now(),
              quantity: product.qty,
              item_img: product.image,
              price: product.item_price,
              payment_type: 1,
              status: 1,
              date_added: Date.now()});
    
            await purchaseHistory.save();
    
            break;
          }
        }
      }
    
      // await CartModel.deleteMany({user_id: session.user_id});
    
      const html = fs.readFileSync(path.join(__dirname, "../views/template.html"), "utf-8");
      const filename = "invoice" + Math.random() + "_doc.pdf"; 
      let array = [];
      let subtotal = 0;
      let shippingFee = 50;
      let total = 50;
    
      for(let product of cart) {
        for(let cartID of request.body["cart-checks"].split(",")) { 
          if(mongoose.Types.ObjectId(cartID).equals(product._id)) {
            subtotal += product.item_price * product.qty;
            total += product.item_price * product.qty;
            const prod = {
              name: product.item_name,
              quantity: product.qty,
              price: product.item_price,
              total: product.item_price * product.quantity,
            }
            array.push(prod);
    
            break;
          }
        }
      }
    
      const obj = {
        prodlist: array,
        subtotal,
        shippingFee,
        total
      }
    
      const document = {
        html: html,
        data: {
            products: obj
        },
        path: './docs/' + filename
      }
      const options = {
        formate: 'A3',
        orientation: 'portrait',
        border: '2mm',
      }
    
      pdf.create(document, options)
                .then(res => {
                  response.download("./docs/" + filename);
                }).catch(error => {
                  response.status(500).send(error);
                });
    
      const filepath = 'http://localhost:3000/docs/' + filename;
    }
  }
  else {
    response.redirect("/cart");
  }
  

});

router.delete("/cart/:id", async (request, response) => {
  await CartModel.deleteOne({_id: request.params.id});

  try {
    response.redirect("/cart");

  } catch (error) {
    response.status(500).send(error);
  }

});

router.get("/signin", async (request, response) => {

  try {
    response.render("client/sign-in.ejs");
  } catch (error) {
    response.status(500).send(error);
  }

});

router.get("/register", async (request, response) => {

  try {
    response.render("client/register.ejs");
  } catch (error) {
    response.status(500).send(error);
  }

});

router.get("/set-appointment", async (request, response) => {
  const {session} = request;
  const id = mongoose.Types.ObjectId(session.user_id)
  const user = await CustomerModel.findById(id);

  try {
    response.render("client/appointment.ejs", {user, session});
  } catch (error) {
    response.status(500).send(error);
  }

});

router.post("/set-appointment", async (request, response) => {
  const appointment = new AppointmentModel(request.body);
  const {session} = request;
  const id = mongoose.Types.ObjectId(session.user_id)
  const user = await CustomerModel.findById(id);

  try {
    await appointment.save();
    response.redirect("/account-history");
  } catch (error) {
    response.status(500).send(error);
  }

});

router.get("/faqs", async (request, response) => {
  const {session} = request;
  const id = mongoose.Types.ObjectId(session.user_id)
  const user = await CustomerModel.findById(id);

  try {
    response.render("client/faqs.ejs", {user, session});
  } catch (error) {
    response.status(500).send(error);
  }

});

router.get("/profile", async (request, response) => {
  const {session} = request;
  const id = mongoose.Types.ObjectId(session.user_id)
  const user = await CustomerModel.findById(id);

  try {
    response.render("client/profile/user-profile.ejs", {user, session});
  } catch (error) {
    response.status(500).send(error);
  }

});

router.get("/account-settings", async (request, response) => {
  const {session} = request;
  const id = mongoose.Types.ObjectId(session.user_id)
  const user = await CustomerModel.findById(id);

  try {
    response.render("client/profile/account-settings.ejs", {user, session});
  } catch (error) {
    response.status(500).send(error);
  }

});

router.get("/account-history", async (request, response) => {
  const {session} = request;
  const id = mongoose.Types.ObjectId(session.user_id)
  const user = await CustomerModel.findById(id);
  const appointments = await AppointmentModel.find({user_id: session.user_id});
  const eyeHistory = await EyeHistoryModel.find({user_id: session.user_id});
  const purchaseHistory = await PurchaseHistoryModel.find({user_id: session.user_id});
  try {
    response.render("client/profile/history.ejs", {user, session, appointments, eyeHistory, purchaseHistory});
  } catch (error) {
    response.status(500).send(error);
  }

});

router.get("/signout", async (request, response) => {

  request.session.loggedin = false;
  try {
    response.redirect("/signin");
  } catch (error) {
    response.status(500).send(error);
  }

});

// SIGN IN
router.post("/signin", async (request, response) => {
  const customer = await CustomerModel.findOne({email: request.body.email, password: request.body.password})

  try {
    if(customer) {
      request.session.user_id = customer._id;
      request.session.loggedin = true;
      request.session.cartqty = await CartModel.countDocuments({user_id: customer._id});
      response.redirect("/home");
    }
    else {
      response.redirect("/signin");
    } 
  } catch (error) {
    response.status(500).send(error);
  }

});

//REGISTER
router.post("/register", async (request, response) => {
  const customer = new CustomerModel(request.body);

  try {
    await customer.save();
    response.redirect("/signin");
  } catch (error) {
    response.status(500).send(error);
  }

});

//EDIT USER
router.patch("/profile/:id", async (request, response) => {
  await CustomerModel.findByIdAndUpdate(request.params.id, request.body);

  try {
    response.redirect("/profile");
  } catch (error) {
    response.status(500).send(error);
  }

});

// ! ---------------
module.exports = router;