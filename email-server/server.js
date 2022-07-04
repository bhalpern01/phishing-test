const express = require('express');
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser')
const EmailService = require('./services/email-service');
const MongoService = require('./services/mongo-service');

const app = express();
require('dotenv').config();
const jsonParser = bodyParser.json()

app.use(cors());

app.get('/status', (req, res) => {
    res.send({
        message: 'OK'
    });
});

app.post('/send-mail', jsonParser, async (req, res) => {
    await EmailService.setupMailer();
    const emails = EmailService.prepareEmails(req.body);
    emails.forEach( async email => {
        const result = await EmailService.sendEmail(email);
        console.log(`SendEmail() result: ${JSON.stringify(result)}`)
    })
})

app.get('/click', jsonParser, async (req, res) => {
    await MongoService.logClick(req.query.e);
    res.sendFile(path.join(__dirname, '/templates/html/you-got-phished.html'));
});

app.listen(3400, () => console.log('Email Server is running on http://localhost:3400/status'));