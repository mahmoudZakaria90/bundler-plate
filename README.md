# bundler-plate
A CLI generates a boilerplate and config file for webpack/gulp with the most recommended and commonly used configurations.


# Installation
`npm i -D bundler-plate or yarn add -D bundler-plate`

# Usage 

* Run `bp` or `npx bp`.
* Give inputs to the generated questions.<br/><br/>

For `Webpack` Add these 2 npm scripts to your package.json
 ```
 {
 "build": "cross-env NODE_ENV=prod webpack", 
 "serve": "cross-env NODE_ENV=dev webpack-dev-server"
 }
 ```

For `gulp` Add these 3 npm scripts to your package.json
 ```
 {
 "build": "gulp", 
 "serve": "gulp serve",
 "watch": "gulp watch"
 }
 ```

