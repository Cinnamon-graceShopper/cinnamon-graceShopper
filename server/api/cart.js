const router = require('express').Router();
const { Order, User, Coffee, OrderCoffee } = require('../db');

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

router.get('/:id', requireToken, async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.user.id,
        completed: false,
      },
      include: {
        model: Coffee,
        through: OrderCoffee,
      },
    });

    res.send(cart);
  } catch (error) {
    next(error);
  }
});

// We will use this route to eventually create the OrderCoffee through table instances
router.post('/', async (req, res, next) => {
  try {
    const post = await Order.create();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
