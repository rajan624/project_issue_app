const { Router } = require("express");
const router = Router();
const projectController = require("../controller/projectController")


// project routes 
router.route("/viewAddForm").get(projectController.viewAddForm);
router.route("/addProjectForm").post(projectController.addProjectForm);
router.route("/deleteProjectForm/:id").get(projectController.deleteProjectForm);
router.route("/viewProject/:id").get(projectController.viewProjectDetails);
router.route("/viewProjectIssueForm/:id").get(projectController.viewProjectIssueForm);
router.route("/createProjectIssue/:id").post(projectController.createProjectIssueForm);
router
  .route("/deleteProjectIssue/:id")
  .get(projectController.deleteProjectIssueForm);


module.exports = router;