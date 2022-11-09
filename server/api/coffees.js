const router = require("express").Router();
const Coffee = require("../db/models/Coffee");

router.get("/", async (req, res, next) => {
	try {
		console.log(Coffee);
		const coffees = await Coffee.findAll();
		res.send(coffees);
	} catch (err) {
		next(err);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const coffee = await Coffee.findByPk(req.params.id);
		if (coffee === null) {
			return res.status(404).send("Coffee was not found, please try again");
		}
		res.send(coffee);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
