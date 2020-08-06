# bundler-plate
A CLI generates a boilerplate and config file for webpack/gulp with the most recommended and commonly used configurations.


# Installation
```
yarn add -D bundler-plate || npm i -D bundler-plate
```

# Usage 

* Run `bp` or `npx bp`.
* Give inputs to the generated questions.
* For `Webpack` Add these 2 npm scripts to your package.json
 ```
 {
 "build": "cross-env NODE_ENV=prod webpack", 
 "serve": "cross-env NODE_ENV=dev webpack-dev-server"
 }
 ```

 * For `gulp` Add these 2 npm scripts to your package.json
 ```
 {
 "build": "gulp", 
 "serve": "gulp serve"
 }
 ```

* Enjoy! <span style="color:red">&hearts;</span>.

