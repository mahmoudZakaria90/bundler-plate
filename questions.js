module.exports = [
  {
    type: "select",
    name: "systemType",
    message: "What kind of bundler/build system do you want to use",
    choices: ["gulp", "webpack"]
  },
  {
    type: prev => (prev === 1 ? "confirm" : "select"),
    name: prev => (prev === 1 ? "babelInclude" : "markup"),
    message: prev =>
      prev === 1
        ? "Would you like to transpile ES6 using babel"
        : "What markup would you like to use?",
    choices: ["HTML", "Pug"]
  },
  {
    type: (_null, { systemType }) => (systemType === 1 ? "confirm" : null),
    name: (_null, { systemType }) => (systemType === 1 ? "extractCSS" : null),
    message: (_null, { systemType }) =>
      systemType === 1
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
