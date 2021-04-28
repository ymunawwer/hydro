const express = require("express");
const router = express.Router();

router.use(require("./userRoutes"));
//router.use(require("./ticketStatusRoutes"));
router.use(require("./meterReadingRoutes"));
router.use(require("./ticketsRoutes"));

module.exports = router;
