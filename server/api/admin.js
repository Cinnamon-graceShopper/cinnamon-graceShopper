const router = require('express').Router();
const Coffee = require('../db/models/Coffee');

/* COFFEE PRODUCT EXAMPLE
	{
		productName: "STRING",
		description: "TEXT",
		ingredients: ["ARRAY"],
		image: "STRING",
		price: "STRING",
		quantity: INTEGER,
	}
*/

//This route will create a brand new coffee product
router.post('/', async (req, res, next) => {
  try {
    const newCoffee = req.body;
    const createdCoffee = await Coffee.create(newCoffee);

    return res.status(200).send(createdCoffee);
  } catch (error) {
    next(error);
  }
});

//This route will update all fields for coffee by id, all fields are necessary!
router.put('/:id', async (req, res, next) => {
  try {
    const coffeeId = req.params.id;
    if (isNaN(Number(coffeeId))) {
      return res
        .status(400)
        .send('Not a number, please use the correct CoffeeId!');
    }

    await Coffee.update(
      {
        productName: req.body.productName,
        description: req.body.description,
        ingredients: req.body.ingredients,
        image: req.body.image,
        price: req.body.price,
        quantity: req.body.quantity,
      },
      {
        where: {
          id: coffeeId,
        },
      }
    );

    //Finding the updated coffee to send back and update Redux store
    const updatedCoffee = await Coffee.findByPk(coffeeId);
    res.status(200).send(updatedCoffee);
  } catch (e) {
    next(e);
  }
});

//This route will delete a coffee product based on coffee id
router.delete('/:id', async (req, res, next) => {
  try {
    const coffeeId = req.params.id;

    if (isNaN(Number(coffeeId))) {
      return res
        .status(400)
        .send('Not a number, please use the correct CoffeeId!');
    }

    const destroyCoffee = await Coffee.destroy({
      where: {
        id: coffeeId,
      },
    });

    if (!destroyCoffee) {
      return res.status(404).send('This CoffeeId does not exist');
    }

    return res.status(200).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
