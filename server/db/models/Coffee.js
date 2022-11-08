const Sequelize = require('sequelize');
const db = require('../db');

const Coffee = db.define('coffee', {
  productName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  ingredients: {
    type: Sequelize.STRING,
    allowNull: false,
    get() {
      return this.getDataValue('ingredients').split(',');
    },
    set(arr) {
      this.setDataValue('ingredients', arr.join(','));
    },
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.STRING,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Coffee;
