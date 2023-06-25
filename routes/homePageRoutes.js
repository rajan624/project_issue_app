const { Router } = require("express");
const router = new Router();
const homePageController = require("../controller/homeController")


router.route("").get(homePageController.viewHomePage);


module.exports = router