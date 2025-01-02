
const accountSid = process.env.Account_Sid;
const authToken = process.env.Auth_Token;
const client = require('twilio')(accountSid, authToken);

client.verify.v2.services(process.env.SMS_Sender_Verification_Service)
    .verifications
    .create({ to: process.env.SMS_PhoneNumber, channel: 'sms' })
    .then((verification:any) => console.log(verification.sid));

