# bundler-plate
A CLI generates a starter config file for webpack/gulp with the most commonly used and recommended configurations.

!["Bundler-plate demo"](https://media.giphy.com/media/Y3NFQaFigFwjOcDQIR/giphy.gif)

# Installation
`npm i -D bundler-plate`  
Or<br>
`yarn add -D bundler-plate`

# Usage 

* Run `bp` or `npx bp`.
* Give inputs/answers to the generated questions.<br/><br/>

For `Webpack` Add these 2 npm scripts to your `package.json`:
 ```
 "scripts": {
    ...
    "build": "cross-env NODE_ENV=prod webpack", 
    "serve": "cross-env NODE_ENV=dev webpack-dev-server"
 }
 ```

For `gulp` Add these 3 npm scripts to your `package.json`:
 ```
 "scripts": {
    ...
    "build": "gulp", 
    "serve": "gulp serve",
    "watch": "gulp watch"
 }
 ```

