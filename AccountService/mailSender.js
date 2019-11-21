var nodemailer = require('nodemailer');

let email ="remymailsender@gmail.com";
let pass ="Yvan1234!"

var transport = {
  host: 'smtp.gmail.com',
  auth: {
    user: email,
    pass: pass
  }
}  

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

module.exports = {transporter}; 