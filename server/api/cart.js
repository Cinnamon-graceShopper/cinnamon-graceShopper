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
    // console.log(">>>>", orderId);
    // console.log(currentOrder.orders[0].userId);
    // const coffee = await OrderCoffee.create({
    //   coffeeId: 5,
    //   orderId: 5,
    //   quantity: 1,
    //   price: "1.99",
    // });
    res.send(currentOrder);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
