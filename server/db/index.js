//this is the access point for all things database related!
const db = require('./db');
const Coffee = require('./models/Coffee.js');
const User = require('./models/User.js');

//associations could go here!

module.exports = {
  db,
  User,
  Coffee,
};
