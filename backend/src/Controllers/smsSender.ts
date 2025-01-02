
const accountSid = 'AC8e3d48e055c1b1933c334531146e2646';
const authToken = '12c1873cfddc5e6a767f89bc06585055';
const client = require('twilio')(accountSid, authToken);

client.verify.v2.services("VA5aa7493b917b34280f281e66540a6480")
    .verifications
    .create({ to: '+919655689227', channel: 'sms' })
    .then((verification:any) => console.log(verification.sid));
