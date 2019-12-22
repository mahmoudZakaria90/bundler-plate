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
    type: prev => (prev === "webpack" ? "confirm" : "select"),
    name: prev => (prev === "webpack" ? "babelInclude" : "markup"),
    message: prev =>
      prev === "webpack"
        ? "Would you like to transpile ES6 using babel"
        : "What markup would you like to use?",
    choices: ["HTML", "Pug"]
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
    type: (_null, { toolType }) => (toolType === "webpack" ? "confirm" : null),
    name: (_null, { toolType }) =>
      toolType === "webpack" ? "templateGenerate" : null,
    message: (_null, { toolType }) =>
      toolType === "webpack"
        ? "Would you like to generate a HTML template"
        : null
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
