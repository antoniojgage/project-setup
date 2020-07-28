const router = require('express').Router();
const burgerRoutes = require('./burger');
const employeeRoutes = require('./employees');
// Book routes
router.use('/burger', burgerRoutes);
router.use('/employees', employeeRoutes);
module.exports = router;
