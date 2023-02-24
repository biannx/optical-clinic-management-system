// TODO sending mail partial codes, sam  | notes prioritize email cofirmation, before user can login, then change pass, then go back here
// how to use sendmail
// sample demonstration, "$ node test.js"
const sendMail = require('./sendMail')

let email = 'sam17.bello@ymail.com';
let details = 'Hello , sadkajsdk jasda123 123 1sam.bello@ymail.com';

sendMail.transporter.sendMail(
	sendMail.myFunction(email,details),
	(err, data) => {
		if (err) { return log('Error occurs', err); }
		return log('Email sent!!!');
});
