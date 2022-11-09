const router = require("express").Router();
const { Coffee } = require("../db/models/Coffee");

router.get("/", async (req, res, next) => {
	try {
		const coffees = await Coffee.findAll();
		res.send(coffees);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
