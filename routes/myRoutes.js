const express = require("express");
const router = express.Router();
const tourRouter = require("../controllers/controllers");

router.route("/")
    .get(tourRouter.getAllTour)
    .post(tourRouter.postATour)

router.route("/cheapest")
    .get(tourRouter.getCheapest)

router.route("/trending")
    .get(tourRouter.getTrending)

router.route("/:id")
    .get(tourRouter.getTourId)
    .patch(tourRouter.updateTourId)

module.exports = router;
