/*
    Video: https://www.youtube.com/watch?v=Va9UKGs1bwI
*/

require('dotenv').config();

const nodemailer = require('nodemailer');
const log = console.log;

// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD 
    }
});

// Step 2
function myFunction(customerEmail, aptDetails) {
	// TODO: email receiver, 

let mailOptions = {
    from: process.env.EMAIL,
    to: customerEmail, 
    subject: `Appointment Details for ${aptDetails}`,
    text: `Dear ${aptDetails.first_name} ${aptDetails.last_name} your schedule is on ${aptDetails.appointment_date} at ${aptDetails.appointment_time}. \n\nThank you\nNEW VISION TEAM`
};
  return mailOptions;   // The function returns the product of p1 and p2
}


// // Step 3
// transporter.sendMail(myFunction('sam17.bello@ymail.com', 'This are the appointment details'), (err, data) => {
//     if (err) {
//         return log('error occurs', err);
//     }
//     return log('email sent!!!', data);
// });


module.exports = { transporter, myFunction};