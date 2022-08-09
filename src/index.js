const express = require('express');
const app= express();
const morgan = require('morgan');   //para ver datos de requests en consola

//config
app.set('port',process.env.PORT || 3000); //port config
app.set('json spaces',2);

//middlewares:
app.use(morgan('dev')); 
app.use(express.json()); 
app.use(express.urlencoded({extended:false})); 

//routes
app.use(require('./routes/index'));

app.use('/api/movies',require('./routes/movies'));

//starting server
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
});