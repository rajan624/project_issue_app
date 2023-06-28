const project = [
  {
    name: "LMS web app",
    author: "tony Stark",
    description: "learning management System is web application",
  },
  {
    name: "CMS web app",
    author: "Thor",
    description: "Content Management System is web application",
  },
  {
    name: "IOT Hub",
    author: "Black Widow",
    description: "IOT project",
  },
];

const projectIssue = [
    {
        title: "user login",
        description: "user unable to login",
        author: "RangRor",
        projectId: 2,
        label:["login","user"]
  },
  {
    title: "form data",
    description: "user unable to send Form data in add hub",
    author: "Walkrie",
    projectId: 0,
    label: ["api", "data"]
  },
  {
    title: "user signup",
    description: "user unable to signup",
    author: "Black Widow",
    projectId: 0,
    label: ["signup", "user"]
  }
]
module.exports = {
    project,
    projectIssue
}