const { Router } = require("express");
const router = Router();
const projectController = require("../controller/projectController")
router.route("/viewAddForm").get(projectController.viewAddForm);
router.route("/addProjectForm").post(projectController.addProjectForm);
router.route("/viewProject/:id").get(projectController.viewProjectDetails);
router.route("/viewProjectIssueForm/:id").get(projectController.viewProjectIssueForm);
router.route("/createProjectIssue/:id").post(projectController.createProjectIssueForm);


module.exports = router;