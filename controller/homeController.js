const logger = require("../logger")
const db = require("../config/database")
//rendering home page
function viewHomePage(req, res) {
    logger.info("view Home Page Function Start !")
    return res.render(`homePage.ejs`, {
        title: "Home",
        projectList : db.project
    });
}


module.exports = {
    viewHomePage
}