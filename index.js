const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const port = process.env.PORT || 8080;

const personal_data = require('./JSON/personal_data.json');
const education = require('./JSON/education.json');
const contact = require('./JSON/contact.json');
const first = require('./JSON/first_info.json');
const proyects = require('./JSON/proyects.json');

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


app.listen(port, () => [
    console.log(`Server on: ${port}`)
]);