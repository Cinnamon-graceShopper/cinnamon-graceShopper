//this is the access point for all things database related!
const db = require('./db');
const Coffee = require('./models/Coffee.js');
const User = require('./models/User.js');
const Order = require('./models/Order.js')
const OrderCoffee = require('./models/OrderCoffee.js')

//associations could go here!
Order.belongsTo(User)
User.hasMany(Order)

// Coffee.hasMany(Order)

Order.belongsToMany(Coffee,{
  through: OrderCoffee
})
Coffee.belongsToMany(Order,{
  through: OrderCoffee
})

module.exports = {
  db,
  User,
  Coffee,
  Order,
  OrderCoffee
};
