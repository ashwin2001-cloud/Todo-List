const express= require('express');
const path= require('path');
const port= 3000;

const db= require('./config/mongoose');
const Task= require('./models/task');

const app= express();

app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/', function(req, res){
    
    Task.find({}, function(err, tasksh){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }
        
        return res.render('home',{
            tasksList: tasksh
        });
    })
    
});

//deleting task from database 
app.get('/delete-task', function(req, res){  
    
    let id= req.query.id;

    Task.findByIdAndRemove(id, function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    });

});

//creating task into database
app.post('/create-task', function(req, res){
    
    // tasks.push(req.body);
    // return res.render('home', {
    //     tasks:tasks
    // })

    Task.create({
        task:req.body.task,
        category:req.body.category,
        date:req.body.date
    }, function(err, newTask){
        if(err){
            console.log('error in creating task');
            return;
        }
        console.log('****', newTask);
        return res.redirect('back');
    })
})

//checking whether server is running
app.listen(port, function(err){
    if(err){
        console.log('Error in running the server', err);
    }
    console.log('Server is up and running on port', port);
});