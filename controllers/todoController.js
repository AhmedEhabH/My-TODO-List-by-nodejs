var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});

var mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb+srv://test:test@todo-hvhc1.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });

//Create a schema  this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = function(app){
    app.get('/todo', function(req, res){
        //get data from mongodb and pass it to view
        Todo.find({}, function(err, data){
            if(err) throw err;
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo', urlencodedParser, function(req, res){
        //get data from view and add to mongodb
        Todo.find({item: req.body.item}).countDocuments(function(err, count){
            console.log(count);
            if(count == 0)
            {
                var newTodo = Todo(req.body).save(function(err, data){
                    if(err) throw err;
                    res.json(data);
                });
            }
        });
    });

    app.delete('/todo/:item', function(req, res){
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });
};