const { Router } = require("express");
const router = new Router();
const homePageController = require("../controller/homeController")

//home page router
router.route("").get(homePageController.viewHomePage);


module.exports = router