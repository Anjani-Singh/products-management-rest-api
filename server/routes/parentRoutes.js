const router = require("express").Router();

const user = require("./userRoutes");
const product = require("./productsRoutes");


router.use("/user", user);
router.use("/prod", product);


module.exports = router;
