const mongoose = require('mongoose');
const { Schema, model } =  mongoose;
const bcrypt = require('bcrypt-nodejs');

const newSchema = new Schema({
   email: String,
   password: String
})

newSchema.methods.encryptPassword = (password) => {
   return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

newSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = model('User', newSchema);