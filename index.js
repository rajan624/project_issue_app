const express = require("express");
const path = require("path");
const logger = require("./logger");
const app = express();
const port = 8000;
const expressLayout = require("express-ejs-layouts");
const homePageRoutes = require("./routes/homePageRoutes")
const projectRoutes = require("./routes/projectRoutes")
app.use(express.static(path.join(__dirname, "assets")));
app.use(expressLayout);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.use(express.urlencoded());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"))

//routes
app.use("/", homePageRoutes);
app.use("/project",projectRoutes)


app.listen(port, function(err) {
    if (err) {
        logger.error("Error in running port",err)
    } else {
        logger.info(`Port ${port} running portal successfully`)
    }
})
