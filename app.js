const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const myRoutes = require("./routes/myRoutes");


app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Tour management api');
})

app.use('/tour', myRoutes);


module.exports = app;