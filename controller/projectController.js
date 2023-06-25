const logger = require("../logger");
const db = require("../config/database");

function viewAddForm(req, res) {
    logger.log("View Add Form Function Start !")
    res.render("addProjectForm", {
       title :"Add Project"
    });
}

function addProjectForm(req, res) {
    logger.log("Add Form Function Start !");
    db.project.push(req.body);
    res.redirect("/");
}
function viewProjectDetails(req, res) {
    logger.log("View Project Details Function Start !")
    console.log(db.project);
    const projectDetails = db.project[req.params.id];
    res.render("projectIssueDetails", {
      title: projectDetails?.name,
      projectName: projectDetails?.name,
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