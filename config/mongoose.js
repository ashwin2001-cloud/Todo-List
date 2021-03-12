const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/Task_db', {useNewUrlParser: true, useUnifiedTopology: true});


const db= mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to db'));

db.once('open', function(){
    console.log('Successfully connected to the database');
}); 