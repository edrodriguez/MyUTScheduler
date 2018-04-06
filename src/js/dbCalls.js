import mysql from 'mysql';
const connection = mysql.createConnection({
    host: "myutschedulerdbinstance.cztvf7ayunfs.us-east-2.rds.amazonaws.com",
    user: "seniordesign",
    password: "myutscheduler",
    database: "myutschedulerdb"
});


const getTerms = () => {
    connection.connect();

    connection.query(
        "SELECT DISTINCT Term FROM CoursesOffered", 
        (err, result, fields) => {
            if (err) throw err;
            
            console.log(result);
        }
    );

    connection.end();

    var returnArray = [];

    for (var i = 0; i < result; i++){
        var term = result[i].Term;
        returnArray[i] = term;
    }

    return returnArray;
};




function getSubjectsForSemester(semester){
	var query = "SELECT DISTINCT Subject FROM CoursesOffered WHERE Term = \"${semester}\" ORDER BY Subject ASC";

    connection.connect();

    connection.query(query, function (err, result, fields) {
        if (err) throw err;

        console.log(result);
    });

    connection.end();

    var returnArray = [];

    for (var i = 0; i < result; i++){
        var subject = result[i].Subject;
        returnArray[i] = subject;
    }

    return returnArray;
}

function getCoursesForDepartmentAndSemester(semester, department){
    var query = "SELECT DISTINCT Course, Section_Title FROM CoursesOffered WHERE Term = \"${semester}\" AND Subject = \"${department}\" GROUP BY Course ORDER BY Course ASC";

    connection.connect();

    connection.query(query, function (err, result, fields) {
        if (err) throw err;

        console.log(result);
    });

    connection.end();

    var returnArray = [];

    for (var i = 0; i < result; i++){
    	var row = [];
        var course = result[i].Course;
        var title = result[i].Section_Title;
        row[0] = course;
        row[1] = title;
        returnArray[i] = row;
    }

    return returnArray;
}

function getSectionsForCourseInDepartmentAndSemester(semester, department, course){
    var query = "SELECT CourseSection, Start_Time, End_Time, Instructor, Room_Name FROM CoursesOffered WHERE Term = \"${semester}\" AND Subject = \"${department}\" AND Course = ${course} ORDER BY Section_Num ASC";

    connection.connect();

    connection.query(query, function (err, result, fields) {
        if (err) throw err;

        console.log(result);
    });

    connection.end();

    var returnArray = [];

    for (var i = 0; i < result; i++){
        var row = [];
        var section = result[i].CourseSection;
        var start = result[i].Start_Time;
        var end = result[i].End_Time;
        var teach = result[i].Instructor;
        var room = result[i].Room_Name;
        row[0] = section;
        row[1] = start;
        row[2] = end;
        row[3] = teach;
        row[4] = room;
        returnArray[i] = row;
    }

    return returnArray;
}

function addPadding(number, length) {

    var my_string = '' + number;
    while (my_string.length < length) {
        my_string = '0' + my_string;
    }

    return my_string;

}

function parseTime(time){
	var returnTime;
	var hour;
	var min;
	const pm = " PM";
	const am = " AM";
	
	if (time == 2400){
	returnTime = "12:00 AM";
	}
	//special case hour is 0
	else if (Math.floor(num / 100) == 0){
		hour = "12";
		min = num % 100;
		min = addPadding(min,2);
		
		returnNum = hour + ":" + min + am;
	}
	//pm time
	else if (time >= 1200 && time < 2400){
		if (time > 1300)
			time = time - 1200;
		hour = Math.floor(time / 100);
		hour = hour.toString();
		min = time % 100;
		min = addPadding(min,2);
		
		returnTime = hour + ":" + min + pm;
	}
	//am time
	else{
		hour = Math.floor(time / 100);
		hour = hour.toString();
		min = time % 100;
		min = addPadding(min,2);
		
		returnTime = hour + ":" + min + am;
	}
	
	return returnTime;
}

/*
connection.connect();

connection.query("SELECT SUBJECT, COURSE_NUMBER FROM CourseCatalog WHERE SUBJECT = 'EECS'", function (err, result, fields) {
		if (err) throw err;
		
		console.log(result);
});

connection.end();
*/