const nodemailer = require('nodemailer');
module.exports=async function sendMail(options) {
    try{
//create settings
var transport = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.mailtrap.io",
    // port: 2525,
    auth: {
      user: "umanggupta62000@gmail.com",
      pass: "fpynysrtfrtfloml"
    }
  });
  //email options
  const emailOptions={
    from: '"Origami" <admin@origami.com>', // sender address
    to:options.to, // list of receivers
    subject: options.subject, // Subject line
    text:options.text,
    html:options.html/// html body
  }
    await transport.sendMail(emailOptions); 
} catch(err){
    console.log(err);
   throw new Error(err);
}
}