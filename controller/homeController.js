const logger = require("../logger")
function viewHomePage(req, res) {
    logger.info("view Home Page Function Start !")
    return res.render(`homePage.ejs`, {
        title: "Home",
        // message: req.flash('message')
    });
}


module.exports = {
    viewHomePage
}