module.exports = [
  {
    type: "select",
    name: "systemType",
    message: "What kind of bundler/build system do you want to use",
    choices: ["webpack", "gulp"]
  },
  {
    type: prev => (prev === 0 ? "confirm" : "select"),
    name: prev => (prev === 0 ? "babelInclude" : "markup"),
    message: prev =>
      prev === 0
        ? "Would you like to transpile ES6 using babel"
        : "What markup would you like to use?",
    choices: ["HTML", "Pug"]
  },
  {
    type: (_null, { systemType }) => (systemType === 0 ? "confirm" : null),
    name: (_null, { systemType }) => (systemType === 0 ? "extractCSS" : null),
    message: (_null, { systemType }) =>
      systemType === 0
        ? "Would you like to extract css output to a seperate file"
        : null
  },
  {
    type: "select",
    name: "packageManager",
    message: "What package manager do you use",
    choices: ["npm", "yarn"]
  }
];
