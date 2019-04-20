const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const flash = require('connect-flash');
const router = require('./routes/index');


app.set(path.join(__dirname, 'views'));
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(flash())

app.use(expressSession({
    secret: 'form',
    resave: false,
    saveUninitialized: true
}))

app.use('/', router);

module.exports = app;