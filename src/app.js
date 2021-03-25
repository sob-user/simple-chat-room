const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const exphbs = require('express-handlebars');
const app = express();

require('dotenv').config();

app.use(cors());
app.use(morgan('dev'));
app.use(express.static('src/public'));

app.engine('.hbs', 
    exphbs({
        extname: '.hbs',
        defaultLayout: null
    })
);

app.set('views', 'src/views');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.redirect('/config');
});

app.get('/config', (req, res) => {
    res.render('config', {
        host: process.env.HOST
    });
});

app.get('/chat', (req, res) => {
    res.render('chat', {
        host: process.env.HOST
    });
});

app.use('*', (req, res) => {
    res.redirect('/config');
});

module.exports = app;