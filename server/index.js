const express = require("express");
var bodyParser = require('body-parser')
const path = require('path');
require('dotenv/config');
const sendMail = require('./send-mail');

const mongoose = require('mongoose');
const User = require('./User.modal')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.post('/api/user-form', async (req, res) => {
    try {
        const html = `<h4>Thanks ${req.body.name}</h4><p>Your Form has been submitted</p>`;
        const mail = sendMail({emails: req.body.email, subject:'Form Submitted', body: html});
        if (mail) {
            const userdata = new User(req.body)
            await userdata.save();
            res.json({ message: "Form submitted!.." })
        } else {
            res.status(400).send({ success: false, message: 'Error sending email' })
        }
    } catch (err) {
        res.send({ message: err.message })
    }
});

app.get('/api/get-details', async (req, res) => {
    try {
        const data = await User.find();
        res.json(data)
    } catch (err) {
        res.send({ message: err.message })
    }
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('connected to DB');
    });

app.listen(PORT, () => {
    console.log(`> Server listening on http://localhost:${PORT}`);
});