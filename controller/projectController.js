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
  console.log("requested Body",req.query);
  const projectDetails = db.project[req.params.id];
    const filteredIssues = db.projectIssue.filter(
      (issue) => issue.projectId === req.params.id
  );
   const authors = [];

   db.projectIssue.forEach((issue) => {
     if (issue.projectId === req.params.id) {
       authors.push(issue.author);
     }
   });
  const labels = db.projectIssue
    .filter((issue) => issue.projectId === req.params.id)
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

function filterIssuesByQuery(issues, query) {
  return issues.filter((issue) => {
    // Check if the issue's author matches the query author
    if (query.author && issue.author !== query.author) {
      return false;
    }

    // Check if the issue's labels match all of the query labels
    if (query.label && query.label.length > 0) {
      for (const label of query.label) {
        if (!issue.label.includes(label)) {
          return false;
        }
      }
    }

    // Check if the issue's title matches the query title
    if (
      query.title &&
      !issue.title.toLowerCase().includes(query.title.toLowerCase())
    ) {
      return false;
    }

    // Check if the issue's description matches the query description
    if (
      query.description &&
      !issue.description.toLowerCase().includes(query.description.toLowerCase())
    ) {
      return false;
    }

    return true;
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