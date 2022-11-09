const Sequelize = require("sequelize");
const db = require("../db");

const OrderCoffee = db.define("OrderCoffee", {
	quantity: {
		type: Sequelize.INTEGER,
	},
	price: {
		type: Sequelize.STRING,
	},
});

module.exports = OrderCoffee;
