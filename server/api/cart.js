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
router.post('/:id', requireToken, async (req, res, next) => {
  try {
    const reduxCart = req.body;
    const loggedUserId = req.user.id;
    const userCart = await Order.findOne({
      where: {
        userId: loggedUserId,
        completed: false,
      },
    });
    const userCartId = userCart.id;
    reduxCart.forEach(async (product) => {
      const dataToSend = {
        quantity: product.orderQuantity,
        price: product.coffeePrice,
        orderId: userCartId,
        coffeeId: product.coffeeId,
      };
      await OrderCoffee.create(dataToSend);
    });
    res
      .status(200)
      .send(`Completed creating cart items for cart ${userCartId}`);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', requireToken, async (req, res, next) => {
  try {
    const loggedUserId = req.user.id;
    const userCart = await Order.findOne({
      where: {
        userId: loggedUserId,
        completed: false,
      },
    });
    const userCartId = userCart.id;
    await OrderCoffee.destroy({
      where: {
        orderId: userCartId,
      },
    });
    res.status(200).send(`Deleted cart ${userCartId}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
