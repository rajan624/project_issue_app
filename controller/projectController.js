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
    (issue) => issue.projectId != req.params.id
  );
  db.project.splice(req.params.id, 1);
  res.redirect("/");
}
function viewProjectDetails(req, res) {
  logger.log("View Project Details Function Start !")
  const projectDetails = db.project[req.params.id];
    let filteredIssues = db.projectIssue.filter(
      (issue) => issue.projectId == req.params.id
    );
  console.log("we are here for filtering data", req.query);
  if (req.query.author){
     filteredIssues = filteredIssues.filter(
      (issue) => issue.author == req.params.author
    );
  }
  if (req.query.label) {
    filteredIssues = filteredIssues.filter(
      (issue) => issue.author == req.params.label
    );
  }
  if (req.query.description) {
    filteredIssues = filteredIssues.filter(
      (issue) => issue.author == req.params.description
    );
  }
  if (req.query.label) {
    if (!Array.isArray(req.query.label)) {
      let labelArray = [req.query.label]
      req.query.label = labelArray;
    }
   filteredIssues = filteredIssues.filter(obj => {
      return Object.keys(req.query).some(key => {
        return req.query[key].every(value => {
          return obj[key].includes(value);
        });
      });
    });

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
function viewProjectIssueForm(req, res) {
    logger.log("View Project Issue Form Function Start !");
  const projectDetails = db.project[req.params.id];
  console.log(db.projectIssue);
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