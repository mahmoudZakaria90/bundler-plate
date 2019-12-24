module.exports = [
  {
    type: "select",
    name: "toolType",
    message: "What kind of bundler/build system do you want to use",
    choices: [
      { title: "gulp", value: "gulp" },
      { title: "webpack", value: "webpack" }
    ]
  },
  {
    type: prev => (prev === "webpack" ? "confirm" : "confirm"),
    name: prev => (prev === "webpack" ? "babelInclude" : "pugIncluded"),
    message: prev =>
      prev === "webpack"
        ? "Would you like to transpile ES6 using babel"
        : "Would you like to use Pug as a template engine instead of HTML"
  },
  {
    type: (_null, { toolType }) => (toolType === "webpack" ? "confirm" : null),
    name: (_null, { toolType }) =>
      toolType === "webpack" ? "cssModules" : null,
    message: (_null, { toolType }) =>
      toolType === "webpack" ? "Would you like to use css modules" : null
  },
  {
    type: (_null, { toolType }) => (toolType === "webpack" ? "confirm" : null),
    name: (_null, { toolType }) =>
      toolType === "webpack" ? "extractCSS" : null,
    message: (_null, { toolType }) =>
      toolType === "webpack"
        ? "Would you like to extract css output to a seperate file"
        : null
  },
  {
    type: (_null, { toolType }) => (toolType === "gulp" ? "select" : null),
    name: (_null, { toolType }) =>
      toolType === "gulp" ? "cssOutputStyle" : null,
    message: (_null, { toolType }) =>
      toolType === "gulp" ? "How do you want CSS output style" : null,
    choices: [
      { title: "expanded", value: "expanded" },
      { title: "compact", value: "compact" },
      { title: "nested", value: "nested" },
      { title: "compressed", value: "compressed" }
    ]
  },
  {
    type: "select",
    name: "packageManager",
    message: "What package manager do you use",
    choices: [
      { title: "npm", value: "npm" },
      { title: "yarn", value: "yarn" }
    ]
  }
];
