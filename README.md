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

# Connect to databse (new!)

* endpoint: myutschedulerdb.c7vhivwvlaho.us-east-2.rds.amazonaws.com 
* username: seniordesign
* password: ask through group me (same as old database)

# Columns in database

*    TERM                  VARCHAR(11)  NOT NULL  -spring summer or fall
*    SUBJECT               VARCHAR(4) NOT NULL    -department
*    COURSE                VARCHAR(4) NOT NULL    -course #
*    SECTION               INTEGER                -section #
*    LINK_IDENTIFIER       VARCHAR(2)             -if there is another section that needs to be registered with it (for labs)
*    CRN                   INTEGER  NOT NULL      -identification # (not primary key)
*    TITLE                 VARCHAR(98)            -name of the class
*    MIN_CREDITS           NUMERIC(3,1) NOT NULL  
*    MAX_CREDITS           NUMERIC(3,1) NOT NULL
*    INSTRUCTOR_LAST_NAME  VARCHAR(25)
*    INSTRUCTOR_FIRST_NAME VARCHAR(17)
*    ACTUAL_ENROLLMENT     INTEGER  NOT NULL      -# of people currently registered
*    MAXIMUM_ENROLLMENT    INTEGER  NOT NULL      -# of people that could potentially register
*    SEATS_AVAILABLE       INTEGER  NOT NULL      -# of free seats
*    MEETING_TIME_COUNT    INTEGER  NOT NULL      -if it meets multiple times in one day
*    SCHEDULE_TYPE         VARCHAR(2) NOT NULL    -lecture, recitation...
*    BUILDING              VARCHAR(6)             -building name
*    ROOM                  VARCHAR(10)            -room #
*    BEGIN_TIME            INTEGER                -start time in military format 1100 = 11:00 am, 2300 = 11:00 pm
*    END_TIME              INTEGER                -end time in same format
*    MONDAY                VARCHAR(1)             -contains a M if class meets on a monday, NULL otherwise
*    TUESDAY               VARCHAR(1)             -contains a T if class meets on a tuesday, NULL otherwise
*    WEDNESDAY             VARCHAR(1)             -contains a W if class meets on a wednesday, NULL otherwise
*    THURSDAY              VARCHAR(1)             -contains a R if class meets on a thursday, NULL otherwise
*    FRIDAY                VARCHAR(1)             -contains a F if class meets on a friday, NULL otherwise


# Connect to databse (old)

* endpoint: myutschedulerdbinstance.cztvf7ayunfs.us-east-2.rds.amazonaws.com
* username: seniordesign
* password: ask through group me


# TODO List:

// insert all the things here
- Get free UI components for our use
- Investigate how to run database on engineering servers
- Flowchart of UI
- Dependency tree for system
- Finalize layout of UI
- Write API for interaction with Database
