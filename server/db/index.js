//this is the access point for all things database related!
const db = require("./db");
const Coffee = require("./models/Coffee.js");
const User = require("./models/User.js");
const Order = require("./models/Order.js");
const OrderCoffee = require("./models/OrderCoffee.js");

//associations could go here!
User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Coffee, {
  through: OrderCoffee,
});
Coffee.belongsToMany(Order, {
  through: OrderCoffee,
});

// Maybe add this?
// OrderCoffee.belongsTo(Order);
// OrderCoffee.belongsTo(Coffee);

module.exports = {
  db,
  User,
  Coffee,
  Order,
  OrderCoffee,
};
