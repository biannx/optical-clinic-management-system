const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require('method-override');
const session = require("express-session");

const app = express();
const port = process.env.PORT || 3000;

const attendantRouters = require(path.join(__dirname, "/routes/attendantRouters.js"));
const productRouters = require(path.join(__dirname, "/routes/productRouters.js"));
const customerRouters = require(path.join(__dirname, "/routes/customerRouters.js"));
const appointmentRouters = require(path.join(__dirname, "/routes/appointmentRouters.js"));
const cartRouters = require(path.join(__dirname, "/routes/cartRouters.js"));
const purchaseHistoryRouters = require(path.join(__dirname, "/routes/purchaseHistoryRouters.js"));
const eyeHistoryRouters = require(path.join(__dirname, "/routes/eyeHistoryRouters.js"));
const itemFilterRouters = require(path.join(__dirname, "/routes/itemFilterRouters.js"));
const filterRouters = require(path.join(__dirname, "/routes/filterRouters.js"));
const adminRouters = require(path.join(__dirname, "/routes/adminRouters.js"));
const clientRouters = require(path.join(__dirname, "/routes/clientRouters.js"));
const dashboardRouters = require(path.join(__dirname, "/routes/dashboardRouters.js"));



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

mongoose.connect(
	// yung database name after ng "... .net/"
  "mongodb+srv://sam123:sam123@cluster0.fpb7h.mongodb.net/eye_management_system?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
)

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "/assets")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: "sessionsecret",
  resave: false,
  saveUninitialized: false
}))

// ! dagdag sa router
// * example ni ernst ay create blog 
// ex. /sample+"/router_method_name"
// * do this after testing w frontend
// app.use("/sample",userRouter);
app.use("/api/", dashboardRouters);
app.use("/api/", attendantRouters);
app.use("/api/", productRouters);
app.use("/api/", customerRouters);
app.use("/api/", appointmentRouters);
app.use("/api/", cartRouters);
app.use("/api/", purchaseHistoryRouters);
app.use("/api/", eyeHistoryRouters);
app.use("/api/", itemFilterRouters);
app.use("/api/", filterRouters);
app.use("/api/", adminRouters);
app.use("/", clientRouters);

app.listen(port, () => {
  console.log("Beep.. Boop.. Server is running...");
});