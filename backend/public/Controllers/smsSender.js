"use strict";
const accountSid = process.env.Account_Sid;
const authToken = process.env.Auth_Token;
const client = require('twilio')(accountSid, authToken);
client.verify.v2.services(process.env.SMS_Sender_Verification_Service)
    .verifications
    .create({ to: '+919655689227', channel: 'sms' })
    .then((verification) => console.log(verification.sid));
