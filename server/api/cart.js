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
        quantity: product.cartQuantity,
        price: product.price,
        orderId: userCartId,
        coffeeId: product.id,
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

module.exports = router;

// We would need the USER ID to find ORDER ID where Complete: false

// [{
//   id: 3,
//   price: "1.99",
//   cartQuantity: 2
// }, {
//   id: 4,
//   price: "1.99",
//   cartQuantity: 5
// }]
