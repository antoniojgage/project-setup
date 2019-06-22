const router = require("express").Router();
const locationRoutes = require("./location");

// Book routes
router.use("/location", locationRoutes);

module.exports = router;
