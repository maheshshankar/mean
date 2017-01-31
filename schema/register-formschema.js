/**
 * Created by vemulma on 1/31/2017.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var studentSchema = new Schema({
   name : String,
   username : String,
   email : String,
   password : String,
   phonenumber : String
});

module.exports = mongoose.model('registration',studentSchema);
