const express = require('express');
const cors = require('cors')
const app = express();
const MongoService = require('./services/mongo-service')
require('dotenv').config()

app.use(cors());

app.get('/status', (req, res) => {
  res.send({
    message: 'OK'
  });
});

app.post('/login', (req, res) => {
  // TODO - DB connection to validate user

  res.send({
    token: 'test123'
  });
});

app.get('/get-emails', async (req, res) => {
  const emails = await MongoService.getEmails();
  res.send({
    emails: emails
  })
})

app.listen(3300, () => console.log('Dashboard Server is running on http://localhost:3300/status'));
