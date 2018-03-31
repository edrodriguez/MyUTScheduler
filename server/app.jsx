import express from 'express';
import path from 'path';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import { Server } from 'http';
import request from 'request';

import { 
    GraphQLID, 
    GraphQLList, 
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

const connection = mysql.createConnection({
    host: "myutschedulerdbinstance.cztvf7ayunfs.us-east-2.rds.amazonaws.com",
    user: "seniordesign",
    password: "myutscheduler",
    database: "myutschedulerdb"
});

/* ---------- Begin GraphQL Schema ---------- */

/* Example Course Record:
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

const courseOfferedRecordType = new GraphQLObjectType({
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

const schema = new GraphQLSchema({
    // mutation: new GraphQLObjectType({  GraphQL Mutations Go Here 
    //     name: 'Mutation',
    //     fields: {

    //     },
    // }),
    query: new GraphQLObjectType({ /* GraphQL Queries Go Here */
        name: 'Query',
        fields: {
            getSubjectsByTermDepartmentCourse: {
                type: new GraphQLList(courseOfferedRecordType),
                args: { 
                    term: { type: GraphQLString },
                    department: { type: GraphQLString },
                    course: { type: GraphQLString }
                },
                resolve(parent, { term, department, course }) {
                    return new Promise((resolve, reject) => {
                        connection.query(
                            "SELECT * FROM CoursesOffered WHERE Term = ? AND Subject = ? AND Course = ?",
                            [term, department, course],
                            (err, result, fields) => {
                                if (err) {
                                    console.log(error);
                                    reject();
                                }

                                console.log(result);
                                resolve(result);
                            }
                        );
                    });
                }
            },

            getSubjectsByTerm: {
                type: new GraphQLList(courseOfferedRecordType),
                args: { term: { type: GraphQLString } },
                resolve(parent, { term }) {
                    return new Promise((resolve, reject) => {
                        connection.query(
                            'SELECT * FROM CoursesOffered WHERE Term=?', 
                            [term], 
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
                resolve(parent) {
                    return new Promise((resolve, reject) => {
                        connection.query(
                            "SELECT DISTINCT Subject FROM CoursesOffered",
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
                args: { subject: { type: GraphQLString } },
                resolve(parent, { subject }) {
                    return new Promise((resolve, reject) => {
                        connection.query(
                            'SELECT DISTINCT Course FROM CoursesOffered WHERE Subject = ?',
                            [subject],
                            (error, result, fields) => {
                                if (error) {
                                    console.log(error);
                                    reject();
                                }

                                var final_res = [];
                                result.map((val, idx) => {
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
app.use('/graphql', graphqlHTTP(req => ({ /* Tell Express to use graphql schema above */
    schema: schema,
    pretty: true,
    graphiql: true
})));
/* ---------- End GraphQL Schema ---------- */

/* serves up index.html from dist */
app.use(express.static(path.join(__dirname,"../dist")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

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

app.listen(7777,() => { console.log("Started listening on port", 7777); })