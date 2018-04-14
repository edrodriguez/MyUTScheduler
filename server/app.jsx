import express from 'express';
import path from 'path';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';
import request from 'request';

import { 
    GraphQLID, 
    GraphQLList, 
    GraphQLInt,
    GraphQLObjectType, 
    GraphQLString,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLSchema,
    buildSchema 
} from 'graphql';

import graphqlHTTP from 'express-graphql';

import { Server } from 'http';


const app = express();

const mime_types = {
    html: 'text/html',
    text: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpeg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

/* V2 */ 
const connection = mysql.createConnection({
    host: 'myutschedulerdb.c7vhivwvlaho.us-east-2.rds.amazonaws.com',
    user: 'seniordesign',
    password: 'myutscheduler',
    database: 'myutschedulerdb'
});


/* NEW COLUMNS

    TERM VARCHAR(11) NOT NULL -spring summer or fall
    SUBJECT VARCHAR(4) NOT NULL -department
    COURSE VARCHAR(4) NOT NULL -course #
    SECTION INTEGER -section #
    LINK_IDENTIFIER VARCHAR(2) -if there is another section that needs to be registered with it (for labs)
    CRN INTEGER NOT NULL -identification # (not primary key)
    TITLE VARCHAR(98) -name of the class
    MIN_CREDITS NUMERIC(3,1) NOT NULL
    MAX_CREDITS NUMERIC(3,1) NOT NULL
    INSTRUCTOR_LAST_NAME VARCHAR(25)
    INSTRUCTOR_FIRST_NAME VARCHAR(17)
    ACTUAL_ENROLLMENT INTEGER NOT NULL -# of people currently registered
    MAXIMUM_ENROLLMENT INTEGER NOT NULL -# of people that could potentially register
    SEATS_AVAILABLE INTEGER NOT NULL -# of free seats
    MEETING_TIME_COUNT INTEGER NOT NULL -if it meets multiple times in one day
    SCHEDULE_TYPE VARCHAR(2) NOT NULL -lecture, recitation...
    BUILDING VARCHAR(6) -building name
    ROOM VARCHAR(10) -room #
    BEGIN_TIME INTEGER -start time in military format 1100 = 11:00 am, 2300 = 11:00 pm
    END_TIME INTEGER -end time in same format
    MONDAY VARCHAR(1) -contains a M if class meets on a monday, NULL otherwise
    TUESDAY VARCHAR(1) -contains a T if class meets on a tuesday, NULL otherwise
    WEDNESDAY VARCHAR(1) -contains a W if class meets on a wednesday, NULL otherwise
    THURSDAY VARCHAR(1) -contains a R if class meets on a thursday, NULL otherwise
    FRIDAY VARCHAR(1) -contains a F if class meets on a friday, NULL otherwise

*/


/* V1 */
// const connection = mysql.createConnection({
//     host: "myutschedulerdbinstance.cztvf7ayunfs.us-east-2.rds.amazonaws.com",
//     user: "seniordesign",
//     password: "myutscheduler",
//     database: "myutschedulerdb"
// });








/* ---------- Begin GraphQL Schema ---------- */

/* 
Example Course Record (V1):

{ 
    CourseSection: 'HED 8570/445 SE',
    Days_Met: 'S',
    Start_Date: 2018-08-27T04:00:00.000Z,
    End_Date: 2018-10-16T04:00:00.000Z,
    Start_Time: '10:00 AM',
    End_Time: '3:00 PM',
    Room: null,
    Term: 'Fall 2018',
    CrossList: null,
    Status: 'Unassigned',
    Section_Title: 'Research in Higher Education',
    Room_Num: null,
    Room_Name: null,
    Building_Name: null,
    Campus: 'UT',
    Course: '8570',
    Subject: 'HED',
    Section_Num: 445,
    Instructor: 'Opp',
    Course_Offering_Id: 52015,
    Same_Time_Link: null 
}

Example Course Record (V2):

{
    "TERM": "Fall 2018",
    "SUBJECT": "ACCT",
    "COURSE": "3100",
    "SECTION": 1,
    "LINK_IDENTIFIER": null,
    "CRN": 52563,
    "TITLE": "Financial Accounting and Analysis",
    "MIN_CREDITS": 3,
    "MAX_CREDITS": 3,
    "INSTRUCTOR_LAST_NAME": "Green",
    "INSTRUCTOR_FIRST_NAME": "Karen",
    "ACTUAL_ENROLLMENT": 9,
    "MAXIMUM_ENROLLMENT": 30,
    "SEATS_AVAILABLE": 21,
    "MEETING_TIME_COUNT": 1,
    "SCHEDULE_TYPE": "LE",
    "BUILDING": "SB",
    "ROOM": "3160",
    "BEGIN_TIME": 1110,
    "END_TIME": 1230,
    "MONDAY": "M",
    "TUESDAY": null,
    "WEDNESDAY": "W",
    "THURSDAY": null,
    "FRIDAY": null
}

*/
const uuidv4 = () => { /* Generates RFC4122 Compliant UUID */
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g, 
        (c) => {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }
    );
}

const courseOfferedRecordTypeV2 = new GraphQLObjectType({
    name: 'courseRecord',
    fields: {
        id:                     { type: GraphQLID,     resolve: (root, args, context, info) => { return uuidv4(); }},
        term:                   { type: GraphQLString, resolve: (root, args, context, info) => { return root.TERM } },
        subject:                { type: GraphQLString, resolve: (root, args, context, info) => { return root.SUBJECT } },
        course:                 { type: GraphQLString, resolve: (root, args, context, info) => { return root.COURSE } },
        section:                { type: GraphQLInt,    resolve: (root, args, context, info) => { return root.SECTION } },
        linkId:                 { type: GraphQLString, resolve: (root, args, context, info) => { return root.LINK_IDENTIFIER } },
        crn:                    { type: GraphQLInt,    resolve: (root, args, context, info) => { return root.CRN } },
        title:                  { type: GraphQLString, resolve: (root, args, context, info) => { return root.TITLE } },
        minCredits:             { type: GraphQLInt,    resolve: (root, args, context, info) => { return root.MIN_CREDITS } },
        maxCredits:             { type: GraphQLInt,    resolve: (root, args, context, info) => { return root.MAX_CREDITS } },
        instructorFirstName:    { type: GraphQLString, resolve: (root, args, context, info) => { return root.INSTRUCTOR_FIRST_NAME } },
        instructorLastName:     { type: GraphQLString, resolve: (root, args, context, info) => { return root.INSTRUCTOR_LAST_NAME } },
        actualEnrollment:       { type: GraphQLInt,    resolve: (root, args, context, info) => { return root.ACTUAL_ENROLLMENT } },
        maximumEnrollment:      { type: GraphQLInt,    resolve: (root, args, context, info) => { return root.MAXIMUM_ENROLLMENT } },
        seatsAvailable:         { type: GraphQLInt,    resolve: (root, args, context, info) => { return root.SEATS_AVAILABLE } },
        meetingTimeCount:       { type: GraphQLInt,    resolve: (root, args, context, info) => { return root.MEETING_TIME_COUNT } },
        scheduleType:           { type: GraphQLString, resolve: (root, args, context, info) => { return root.SCHEDULE_TYPE } },
        building:               { type: GraphQLString, resolve: (root, args, context, info) => { return root.BUILDING } },
        room:                   { type: GraphQLString, resolve: (root, args, context, info) => { return root.ROOM } },
        beginTime:              { type: GraphQLInt,    resolve: (root, args, context, info) => { return root.BEGIN_TIME } },
        endTime:                { type: GraphQLInt,    resolve: (root, args, context, info) => { return root.END_TIME } },
        days: { 
            type: new GraphQLList(GraphQLString), 
            resolve: (root, args, context, info) => { /* We want an array of the days the course is offered */
                var days = [];
                if (root.MONDAY != null) { days.push(root.MONDAY); }
                if (root.TUESDAY != null) { days.push(root.TUESDAY); }
                if (root.WEDNESDAY != null) { days.push(root.WEDNESDAY); }
                if (root.THURSDAY != null) { days.push(root.THURSDAY); }
                if (root.FRIDAY != null) { days.push(root.FRIDAY); }
                return days;
            } 
        }
    }
});

const courseOfferedRecordTypeV1 = new GraphQLObjectType({
    name: 'courseRecord',
    fields: {
        id:                 { type: GraphQLID, resolve: (root, args, context, info) => { return uuidv4(); }},
        section:            { type: GraphQLString, resolve: (root, args, context, info) => { return root.CourseSection } },
        daysMet:            { type: GraphQLString, resolve: (root, args, context, info) => { return root.Days_Met } },
        startDate:          { type: GraphQLString, resolve: (root, args, context, info) => { return root.Start_Date } },
        endDate:            { type: GraphQLString, resolve: (root, args, context, info) => { return root.End_Date } },
        startTime:          { type: GraphQLString, resolve: (root, args, context, info) => { return root.Start_Time } },
        endTime:            { type: GraphQLString, resolve: (root, args, context, info) => { return root.End_Time } },
        room:               { type: GraphQLString, resolve: (root, args, context, info) => { return root.Room } },
        term:               { type: GraphQLString, resolve: (root, args, context, info) => { return root.Term } },
        crossList:          { type: GraphQLString, resolve: (root, args, context, info) => { return root.CrossList } },
        status:             { type: GraphQLString, resolve: (root, args, context, info) => { return root.Status } },
        sectionTitle:       { type: GraphQLString, resolve: (root, args, context, info) => { return root.Section_Title } },
        roomNum:            { type: GraphQLString, resolve: (root, args, context, info) => { return root.Room_Num } },
        roomName:           { type: GraphQLString, resolve: (root, args, context, info) => { return root.Room_Name } },
        buildingName:       { type: GraphQLString, resolve: (root, args, context, info) => { return root.Building_Name } },
        campus:             { type: GraphQLString, resolve: (root, args, context, info) => { return root.Campus } },
        course:             { type: GraphQLString, resolve: (root, args, context, info) => { return root.Course } },
        subject:            { type: GraphQLString, resolve: (root, args, context, info) => { return root.Subject } },
        sectionNum:         { type: GraphQLString, resolve: (root, args, context, info) => { return root.Section_Num } },
        instructor:         { type: GraphQLString, resolve: (root, args, context, info) => { return root.Instructor } },
        courseOfferingId:   { type: GraphQLString, resolve: (root, args, context, info) => { return root.Course_Offering_Id } },
        sameTimeLink:       { type: GraphQLString, resolve: (root, args, context, info) => { return root.Same_Time_Link } },
    }
});

const departmentWithCourseRecordType = new GraphQLObjectType({
    name: 'deptWithCourse',
    fields: {
        id: { type: GraphQLID, resolve: (root, args, context, info) => { return uuidv4(); } },
        title: { type: GraphQLString, resolve: (root, args, context, info) => { return root.department } },
        sections: { type: new GraphQLList(GraphQLString), resolve: (root, args, context, info) => { return root.sections } }
    }
});

const schemaV2 = new GraphQLSchema({
    query: new GraphQLObjectType({ /* GraphQL Queries Go Here */
        name: 'Query',
        fields: {
            getSubjectsByTermDepartmentCourse: {
                type: new GraphQLList(courseOfferedRecordTypeV2),
                args: { 
                    semester: { type: GraphQLString },
                    department: { type: GraphQLString },
                    course: { type: GraphQLString }
                },
                resolve(parent, { semester, department, course }) {
                    return new Promise((resolve, reject) => {
                        connection.query(
                            "SELECT * FROM CoursesOffered WHERE Term = ? AND Subject = ? AND Course = ?",
                            [semester, department, course],
                            (err, result, fields) => {
                                if (err) {
                                    console.log(error);
                                    reject();
                                }
                                console.log("QUERY: ", "SELECT * FROM CoursesOffered WHERE Term = ? AND Subject = ? AND Course = ?");
                                console.log("SEMESTER: ", semester, "DEPARTMENT: ", department, "COURSE: ", course);
                                console.log(result);
                                resolve(result);
                            }
                        );
                    });
                }
            },
            getSubjectsByTerm: {
                type: new GraphQLList(courseOfferedRecordTypeV2),
                args: { semester: { type: GraphQLString } },
                resolve(parent, { semester }) {
                    return new Promise((resolve, reject) => {
                        connection.query(
                            'SELECT * FROM CoursesOffered WHERE Term=?', 
                            [semester], 
                            (error, result, fields) => {
                                if (error) {
                                    console.log(error);
                                    reject();
                                }
                                resolve(result);
                            }
                        );
                    });
                }
            },
            getDepartments: {
                type: new GraphQLList(GraphQLString),
                args: { semester: { type: GraphQLString } },
                resolve(parent, { semester }) {
                    return new Promise((resolve, reject) => {
                        connection.query(
                            "SELECT DISTINCT Subject FROM CoursesOffered WHERE Term = ? AND CRN IS NOT NULL",
                            [semester],
                            (error, result, fields) => {
                                if (error) { 
                                    console.log(error);
                                    reject();
                                }

                                var final_res = [];
                                result.map((val, idx) => {
                                    final_res[idx] = val.Subject;
                                })
                                console.log(final_res);
                                resolve(final_res);
                            }
                        );
                    });
                }
            },

            getCourses: { 
                type: new GraphQLList(GraphQLString),
                args: { 
                    department: { type: GraphQLString },
                    semester: { type: GraphQLString }
                },
                resolve(parent, { department, semester }) {
                    return new Promise((resolve, reject) => {
                        connection.query(
                            'SELECT DISTINCT Course FROM CoursesOffered WHERE Subject = ? AND Term = ? AND CRN IS NOT NULL',
                            [department, semester],
                            (error, result, fields) => {
                                if (error) {
                                    console.log(error);
                                    reject();
                                }

                                var final_res = [];
                                result.map((val, idx) => {
                                    console.log("COURSE FOUND: ", val.Course);
                                    final_res[idx] = val.Course;
                                });
                                console.log(final_res);
                                resolve(final_res);
                            }
                        );
                    });
                }
            }

        }
    })
});

// const schemaV1 = new GraphQLSchema({
//     query: new GraphQLObjectType({ /* GraphQL Queries Go Here */
//         name: 'Query',
//         fields: {
//             getSubjectsByTermDepartmentCourse: {
//                 type: new GraphQLList(courseOfferedRecordTypeV1),
//                 args: { 
//                     term: { type: GraphQLString },
//                     department: { type: GraphQLString },
//                     course: { type: GraphQLString }
//                 },
//                 resolve(parent, { term, department, course }) {
//                     return new Promise((resolve, reject) => {
//                         connection.query(
//                             "SELECT * FROM CoursesOffered WHERE Term = ? AND Subject = ? AND Course = ?",
//                             [term, department, course],
//                             (err, result, fields) => {
//                                 if (err) {
//                                     console.log(error);
//                                     reject();
//                                 }

//                                 console.log(result);
//                                 resolve(result);
//                             }
//                         );
//                     });
//                 }
//             },
//             getSubjectsByTerm: {
//                 type: new GraphQLList(courseOfferedRecordTypeV1),
//                 args: { term: { type: GraphQLString } },
//                 resolve(parent, { term }) {
//                     return new Promise((resolve, reject) => {
//                         connection.query(
//                             'SELECT * FROM CoursesOffered WHERE Term=?', 
//                             [term], 
//                             (error, result, fields) => {
//                                 if (error) {
//                                     console.log(error);
//                                     reject();
//                                 }
//                                 resolve(result);
//                             }
//                         );
//                     });
//                 }
//             },
//             getDepartments: {
//                 type: new GraphQLList(GraphQLString),
//                 resolve(parent) {
//                     return new Promise((resolve, reject) => {
//                         connection.query(
//                             "SELECT DISTINCT Subject FROM CoursesOffered",
//                             (error, result, fields) => {
//                                 if (error) { 
//                                     console.log(error);
//                                     reject();
//                                 }

//                                 var final_res = [];
//                                 result.map((val, idx) => {
//                                     final_res[idx] = val.Subject;
//                                 })
//                                 console.log(final_res);
//                                 resolve(final_res);
//                             }
//                         );
//                     });
//                 }
//             },

//             getCourses: { 
//                 type: new GraphQLList(GraphQLString),
//                 args: { subject: { type: GraphQLString } },
//                 resolve(parent, { subject }) {
//                     return new Promise((resolve, reject) => {
//                         connection.query(
//                             'SELECT DISTINCT Course FROM CoursesOffered WHERE Subject = ?',
//                             [subject],
//                             (error, result, fields) => {
//                                 if (error) {
//                                     console.log(error);
//                                     reject();
//                                 }

//                                 var final_res = [];
//                                 result.map((val, idx) => {
//                                     final_res[idx] = val.Course;
//                                 });
//                                 console.log(final_res);
//                                 resolve(final_res);
//                             }
//                         );
//                     });
//                 }
//             }

//         }
//     })
// });
app.use(cors()); /* Cross Origin Access */
const server = new Server(app);
// app.use('/graphqlV1', graphqlHTTP(req => ({  Tell Express to use graphql schema above 
//     schema: schemaV1,
//     pretty: true,
//     graphiql: true
// })));
app.use('/graphqlV2', graphqlHTTP(req => ({ /* Tell Express to use graphql schema above */
    schema: schemaV2,
    pretty: true,
    graphiql: true
})));
/* ---------- End GraphQL Schema ---------- */

/* serves up index.html from dist */
app.use(express.static(path.join(__dirname, "../dist/client")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => { /* Serve our html from the production server */
    res.sendFile(path.resolve('dist/server/public/index.html'));
});

app.get('/all', (req, res) => {
    connection.query(
        "SELECT * FROM CoursesOffered",
        (error, result, fields) => {
            if (error) console.log(error);

            console.log(result);
            res.send(result);
        }
    );
});

app.get('/departments', (req, res) => {
    connection.query(
        "SELECT DISTINCT Subject FROM CoursesOffered",
        (error, result, fields) => {
            if (error) console.log(error);

            var final_res = [];
            result.map((val, idx) => {
                final_res[idx] = val.Subject;
            })

            res.send(final_res);

            console.log(final_res);
        }
    );
});

app.get('/terms', (req, res) => {
	connection.connect();
    connection.query(
        "SELECT DISTINCT Term FROM CoursesOffered", 
        (error, result, fields) => {
            if (error) console.log(error);
            
		    res.send(result);

            console.log(result);
        }
    );
    connection.end();
});

app.listen(7777,() => { console.log("Started listening on port", 7777); });

