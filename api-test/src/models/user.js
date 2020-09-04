'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name:String,
    email:String,
    pass:String
});

module.exports = mongoose.model('User', UserSchema);