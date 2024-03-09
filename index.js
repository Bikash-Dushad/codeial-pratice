const express = require('express');
const app = express();
const cookieparser = require('cookie-parser')
const port = 8000;
require('./config/mongoose');

app.use(express.urlencoded({extended: true}));
app.use(cookieparser())
app.set('view engine', 'ejs');
app.set('views', './views'); 
app.use(express.static(__dirname + '/assets'));

app.use('/', require('./routes'))

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})