const router = require("express").Router();
const { Order, User, Coffee } = require("../db");

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

router.post("/:id/:productId", async (req, res, next) => {
  try {
    const currentOrder = await Order.findOne({
      include: {
        model: User,
        where: {
          id: req.params.id,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
