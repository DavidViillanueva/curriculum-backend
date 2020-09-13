const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const port = process.env.PORT || 8080;

const personal_data = require('./JSON/personal_data.json');


app.get('/',(req,res) => {
    res.send('cv endpoint');
});


app.listen(port, () => [
    console.log(`Server on: ${port}`)
]);