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
function deleteProjectForm(req, res) {
  logger.log("Add Form Function Start !");
  db.projectIssue = db.projectIssue.filter(
    (issue) => issue.projectId !== req.params.id
  );
  db.project.splice(req.params.id, 1);
  res.redirect("/");
}
function viewProjectDetails(req, res) {
    logger.log("View Project Details Function Start !")
    console.log(db.project);
    const projectDetails = db.project[req.params.id];
    const filteredIssues = db.projectIssue.filter(
      (issue) => issue.projectId === req.params.id
    );
    res.render("projectIssueDetails", {
      title: projectDetails?.name,
        projectName: projectDetails?.name,
        projectId: req?.params?.id,
          projectIssue :filteredIssues
    });
}

function viewProjectIssueForm(req, res) {
    logger.log("View Project Issue Form Function Start !");
  const projectDetails = db.project[req.params.id];
  console.log(db.projectIssue);
  const labels = db.projectIssue
    .filter((issue) => issue.projectId === req.params.id)
    .map((issue) => issue.label)
    .flat();
  console.log("My all labels",labels);
  res.render("createProjectIssue", {
    title: projectDetails?.name,
      projectName: projectDetails?.name,
    projectId: req.params.id,
      projectLabel:labels

  });
}

function createProjectIssueForm(req, res) {
    logger.log("View Project Issue Form Function Start !");
    const projectIssue = req.body
    projectIssue.projectId = req.params.id;
    db.projectIssue.push(projectIssue);
  res.redirect(`/project/viewProject/${req.params.id}`);
}


function deleteProjectIssueForm(req, res) {
  logger.log("delete Project Issue Form Function Start !");
  const projectId = db.projectIssue[req.params.id].projectId
  db.projectIssue.splice(req.params.id, 1);
  res.redirect(`/project/viewProject/${projectId}`);
}
module.exports = {
    viewAddForm,
    addProjectForm,
    viewProjectDetails,
    viewProjectIssueForm,
  createProjectIssueForm,
  deleteProjectIssueForm,
  deleteProjectForm
}