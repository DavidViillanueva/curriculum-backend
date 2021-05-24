require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const contactRoutes = require('./src/routes/contact.routes');

app.use(cors());

const port = process.env.PORT || 8080;

const personal_data = require('./JSON/personal_data.json');
const education = require('./JSON/education.json');
const contact = require('./JSON/contact.json');
const first = require('./JSON/first_info.json');
const jobs = require('./JSON/jobs.json');


//Allow CORS
const allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
};
app.use(allowCrossDomain);


//Middlewares
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
app.use(bodyParser.json());

// Routes
app.get('/',(req,res) => {
    res.json(first)
});
app.get('/personal_data',(req,res) => {
    res.json(personal_data);
});
app.get('/academic',(req,res) => {
    res.json(education);
})
app.get('/contact',(req,res) => {
    res.json(contact);
})
app.get('/jobs',(req,res) => {
    res.json(jobs)
})

app.use(contactRoutes);


app.listen(port, () => [
    console.log(`Server on: ${port}`)
]);