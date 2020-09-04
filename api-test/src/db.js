'use strict'

const mongoConnection = require('mongoose');

mongoConnection.Promise = global.Promise;
mongoConnection.connect('mongodb://localhost:27017/test-db',{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("conexion db success");
})
.catch(err => console.log(err));

module.exports = mongoConnection;