const router = require("express").Router();
const { Order, User, Coffee, OrderCoffee } = require("../db");

router.get("/", async (req, res, next) => {
  // MIGHT NOT NEED THIS BECAUSE ANY USER CAN SEE ALL THE CARTS
  try {
    const carts = await Order.findAll();
    res.send(carts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      include: {
        model: User,
        where: {
          id: req.params.id,
        },
      },
    });
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/:coffeeId", async (req, res, next) => {
  try {
    let orderId;
    const currentOrder = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Order,
        where: {
          completed: false,
        },
      },
    });
    orderId = currentOrder.id;

    const selectedCoffee = await Coffee.findOne({
      where: {
        id: req.params.coffeeId,
      },
    });

    const coffee = await OrderCoffee.create({
      coffeeId: req.params.coffeeId,
      orderId: orderId,
      quantity: 1,
      price: selectedCoffee.price,
    });
    res.send(coffee);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
