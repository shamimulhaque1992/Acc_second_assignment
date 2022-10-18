const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;



const app = require('./app')

mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log('data is on')
});

app.listen(port, () => {
    console.log('server is running', port);
})