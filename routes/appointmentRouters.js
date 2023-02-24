const express = require("express");
const AppointmentModel = require("../models/Appointment");
const AttendantModel = require("../models/Attendant");
const router = express.Router();

// ! Emailing Customer
const sendMail = require('../sendMail');

// READ
router.get("/appointments", async (request, response) => {
  const appointments = await AppointmentModel.find({is_archived: false});
  const attendants = await AttendantModel.find({});

  try {
    response.render("admin/appointment/appointment.ejs", {appointments, attendants});
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/appointments/archives", async (request, response) => {
  const appointments = await AppointmentModel.find({is_archived: true});
  const attendants = await AttendantModel.find({});

  try {
    response.render("admin/appointment/archives.ejs", {appointments, attendants});
  } catch (error) {
    response.status(500).send(error);
  }
});

// CREATE
router.post("/appointment", async (request, response) => {
  const appointment = new AppointmentModel(request.body);

  try {
    await appointment.save();
    response.send(appointment);
  } catch (error) {
    response.status(500).send(error);
  }
});

// UPDATE
// BATCH ARCHIVE
router.patch("/appointment/archive", async (request, response) => {
  const archives = request.body;

  if(archives["archive-check"]) {
    for(let archive of archives["archive-check"]) {
      if(archive.length === 1) {
        await AppointmentModel.findByIdAndUpdate(archives["archive-check"], {is_archived: true});
        break;
      }
      else {
        await AppointmentModel.findByIdAndUpdate(archive, {is_archived: true});
      }
    }
  }

  response.redirect("/api/appointments");
});

// BATCH RESTORE
router.patch("/appointment/restore", async (request, response) => {
  const restores = request.body;

  if(restores["archive-check"]) {
    for(let restore of restores["archive-check"]) {
      if(restore.length === 1) {
        await AppointmentModel.findByIdAndUpdate(restores["archive-check"], {is_archived: false});
        break;
      }
      else {
        await AppointmentModel.findByIdAndUpdate(restore, {is_archived: false});
      }
    }
  }

  response.redirect("/api/appointments/archives");
});

router.patch("/appointment/:id", async (request, response) => {
  try {
    await AppointmentModel.findByIdAndUpdate(request.params.id, request.body);
    await AppointmentModel.save();
    response.send(appointment);
  } catch (error) {
    response.status(500).send(error);
  }
});

// UPDATE STATUS
router.patch("/appointment/status/:id", async (request, response) => {
	 if (request.body.status == 2){
// TODO NODEMAILER
// request.body.
		let customerEmail = request.body.email;
		// magiging laman ng details, time date, name
		let details = request.body;

	sendMail.transporter.sendMail(
	sendMail.myFunction(customerEmail, details),
	(err, data) => {
		if (err) { return log('Error occurs', err); }
		return log('Email sent!!!');
});

	 }
  try {
    await AppointmentModel.findByIdAndUpdate(request.params.id, request.body);
    response.redirect("/api/appointments");
  } catch (error) {
    response.status(500).send(error);
  }
});

// DELETE
router.delete("/appointment/:id", async (request, response) => {
  try {
    const appointment = await AppointmentModel.findByIdAndDelete(request.params.id);

    if (!appointment) response.status(404).send("No item found");
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

// ! ---------------
module.exports = router;