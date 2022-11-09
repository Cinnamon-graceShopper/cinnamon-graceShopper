const Sequelize = require("sequelize");
const db = require("../db");


//TODO
//billing/shipping info
const Order = db.define("order", {
	completed: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	date: {
		type: Sequelize.DATE,
	},
});

module.exports = Order;
