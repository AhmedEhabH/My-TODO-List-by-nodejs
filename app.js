var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use( express.static('./public'));

//fire controllers
todoController(app);

//listen to port 3000
var port = 3000
app.listen(port);
console.log('You are listening to port ' + port);