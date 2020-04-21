const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const passport = require('passport');

// Initialize app
const app = express();

// Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
require('./config/passport')(passport);

const db = require('./config/keys').mongoURI;
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => {
        console.log('DATABASE CONNECTED')
    })
    .catch((err) => {
        console.log(err)
    });

const users = require('./routes/api/users');
app.use('/api/users', users);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('server started')
});