const logger = require("../logger");

function viewAddForm(req, res) {
    logger.log("View Add Form Function Start !")
    res.render("addProjectForm", {
       title :"Add Project"
    });
}

function addProjectForm(req, res) {
    logger.log("Add Form Function Start !")
    res.redirect("/");
}
function viewProjectDetails(req, res) {
    logger.log("View Project Details Function Start !")
    res.render("projectIssueDetails", {
        title: "Project Name",
        projectName:"Testing Project"
    });
}

function viewProjectIssueForm(req, res) {
  logger.log("View Project Issue Form Function Start !");
  res.render("createProjectIssue", {
    title: "Project Name",
    projectName: "Testing Project",
  });
}

function createProjectIssueForm(req, res) {
  logger.log("View Project Issue Form Function Start !");
  res.redirect("/project/viewProject/12");
}
module.exports = {
    viewAddForm,
    addProjectForm,
    viewProjectDetails,
    viewProjectIssueForm,
    createProjectIssueForm
}