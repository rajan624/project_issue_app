const logger = require("../logger");
const db = require("../config/database");
//rendering add project from
function viewAddForm(req, res) {
    logger.log("View Add Form Function Start !")
    res.render("addProjectForm", {
       title :"Add Project"
    });
}

//Adding project in db
function addProjectForm(req, res) {
    logger.log("Add Form Function Start !");
    db.project.push(req.body);
    res.redirect("/");
}

//deleting project from db
function deleteProjectForm(req, res) {
  logger.log("Add Form Function Start !");
  //filter project from db 
  db.projectIssue = db.projectIssue.filter(
    (issue) => issue.projectId != req.params.id
  );
  db.project.splice(req.params.id, 1);
  res.redirect("/");
}

//rendering view project details
function viewProjectDetails(req, res) {
  logger.log("View Project Details Function Start !")
  //filtering project issue 
  const projectDetails = db.project[req.params.id];
    let filteredIssues = db.projectIssue.filter(
      (issue) => issue.projectId == req.params.id
  );
  if (req.query.author && req.query.author != "") {
    filteredIssues = filteredIssues.filter(
      (issue) => issue.author == req.query.author
    );
  }
  if (req.query.title && req.query.title != "") {
    filteredIssues = filteredIssues.filter(
      (issue) => issue.title == req.query.title
    );
  }
  if (req.query.description && req.query.description != "") {
    filteredIssues = filteredIssues.filter(
      (issue) => issue.description == req.query.description
    );
  }
  if (req.query.label && req.query.label!="") {
    if (!Array.isArray(req.query.label)) {
      let labelArray = [req.query.label];
      req.query.label = labelArray;
    }
    filteredIssues = filteredIssues.filter((obj) =>
      obj.label.some((label) => req.query.label.includes(label))
    );

  }
   
   const authors = [];
   db.projectIssue.forEach((issue) => {
     if (issue.projectId == req.params.id) {
       authors.push(issue.author);
     }
   });
  const labels = db.projectIssue
    .filter((issue) => issue.projectId == req.params.id)
    .map((issue) => issue.label)
    .flat();
    res.render("projectIssueDetails", {
      title: projectDetails?.name,
      projectName: projectDetails?.name,
      projectId: req?.params?.id,
      projectIssue: filteredIssues,
      projectLabel: labels,
      projectAuthor: authors,
    });
}

//view project issue form
function viewProjectIssueForm(req, res) {
    logger.log("View Project Issue Form Function Start !");
  const projectDetails = db.project[req.params.id];
  console.log(db.projectIssue);
  //getting label of project
  const labels = db.projectIssue
    .filter((issue) => issue.projectId == req.params.id)
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

//adding issue in project
function createProjectIssueForm(req, res) {
    logger.log("View Project Issue Form Function Start !");
  const projectIssue = req.body
  if (!Array.isArray(req.body.label)) {
    let labelArray = [req.body.label]
    req.body.label = labelArray;
  }
    projectIssue.projectId = req.params.id;
  db.projectIssue.push(projectIssue);
  console.log(db.projectIssue);
  res.redirect(`/project/viewProject/${req.params.id}`);
}

//deleting project issue form
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