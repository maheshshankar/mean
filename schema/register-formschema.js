/**
 * Created by vemulma on 1/31/2017.
 */

var mongoose = require('mongoose');
var bcrypt = require("bcrypt-nodejs");

var Schema = mongoose.Schema;

var studentSchema = new Schema({
   name : String,
   username : String,
   email : String,
   password : String,
   phonenumber : String
});

studentSchema.pre('save', function (next){
    var newUser = this;

    bcrypt.hash(newUser.password, null, null, function(err, newPassword){
        if(err) throw err.message;
        newUser.password = newPassword;
        next();
    });

});


module.exports = mongoose.model('registration',studentSchema);
