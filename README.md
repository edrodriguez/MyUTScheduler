# MyUTScheduler

### Useful Tools

// Brantleigh's Repo:

// this is the file that shows how to do api calls in React and render a component

// with data from the api calls.

https://github.com/BrantleighBunting/design_project/blob/master/imports/ui/App.jsx

// Material UI

https://material-ui-next.com

// Markdown Editor

https://dillinger.io

### Development Environment

Here is how to set up our development environment:
* Install Git
* Install Sublime Text (or editor of your choice)
* Install Node.js - https://nodejs.org/en/ - v9.0.0
* Install Yarn - https://yarnpkg.com/en/ - v1.3.2
### Once The Dependencies Are Installed
```
git clone https://github.com/edrodriguez/MyUTScheduler
cd MyUTScheduler
yarn install
yarn add global webpack-dev-server
yarn dev
```
Then in browser at http://localhost:8080 the scheduler will be served, changed in code
will be hot reloaded in browser for fast development.

THIS IS ALL YOU NEED FOR NOW. The following is for actual development. We'll talk more about it later

### To start Express NodeJS Production Server:
```
// Open two terminal windows, in the first do:
yarn server
// and in the second do:
yarn client

// The server and client will both be running locally then
```

### Git Workflow

Before doing anything run:

```
git fetch
```

To fetch changes, if there are upstream commits then:

```
git pull
```

Then proceed with normal workflow:

```
git pull https://github.com/edrodriguez/MyUTScheduler
cd MyUTScheduler
// do some meaningful work
// when ready to commit run
git status
// if everything looks ok then
git commit -m "Some good message"
// then push changes back to master
git push
//If you get any conflicts at this point, make sure you 
//don't override other people's changes. If you are not sure
//what to do, ask Brantleigh before pushing again
```

# TODO List:

// insert all the things here
- Get free UI components for our use
- Investigate how to run database on engineering servers
- Flowchart of UI
- Dependency tree for system
- Finalize layout of UI
- Write API for interaction with Database
