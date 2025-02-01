require('dotenv').config();
const { MailtrapClient } = require("mailtrap");

const TOKEN = process.env.MAIL_TOKEN;
const ENDPOINT = process.env.MAIL_ENDPOINT;

//Endpoint is not necessary.

const mailTrapClient = new MailtrapClient({
  endpoint:ENDPOINT,
  token: TOKEN,
});

const sender = {
  email: "hello@demomailtrap.com", // Write your domain email if you have.
  name: "Chetanpal Sra",
};

module.exports = {sender,mailTrapClient};