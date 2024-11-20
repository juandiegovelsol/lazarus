const sqlite3 = require("sqlite3").verbose();
const Joi = require("joi");
const http = require("http");
const assert = require("assert");

// Connect to the SQLite database
const db = new sqlite3.Database("./student_results.db");

// Create table in SQLite database
db.serialize(function () {
  db.run(`
    CREATE TABLE IF NOT EXISTS student_results
    (
      name TEXT PRIMARY KEY,
      total_units INTEGER,
      total_points REAL,
      cgpa REAL
    )
  `);
});

// JSON data containing student information, courses, and units
const studentCourses = [
  {
    name: "John Doe",
    courses: [
      { code: "MATH101", units: 3 },
      { code: "SCI102", units: 4 },
      { code: "ENG103", units: 3 },
    ],
  },
  {
    name: "Jane Doe",
    courses: [
      { code: "MATH101", units: 3 },
      { code: "SCI102", units: 4 },
      { code: "ENG103", units: 3 },
      { code: "HIS104", units: 3 },
    ],
  },
];

// JSON data containing minimum and maximum total units required
const unitRequirements = {
  minUnits: 9,
  maxUnits: 15,
};

// JSON data containing scores for each student and course
const studentScores = [
  {
    name: "John Doe",
    scores: [
      { code: "MATH101", score: 85 },
      { code: "SCI102", score: 70 },
      { code: "ENG103", score: 90 },
    ],
  },
  {
    name: "Jane Doe",
    scores: [
      { code: "MATH101", score: 80 },
      { code: "SCI102", score: 75 },
      { code: "ENG103", score: 95 },
      { code: "HIS104", score: 30 },
    ],
  },
];

// Validation schema for studentCourses
const studentCoursesSchema = Joi.array()
  .items(
    Joi.object({
      name: Joi.string().required(),
      courses: Joi.array()
        .items(
          Joi.object({
            code: Joi.string().required(),
            units: Joi.number().integer().min(1).required(), // Ensure units are integers >= 1
          })
        )
        .required(),
    })
  )
  .required();

// Validation schema for unitRequirements
const unitRequirementsSchema = Joi.object({
  minUnits: Joi.number().integer().min(1).required(), // Ensure minUnits is an integer >= 1
  maxUnits: Joi.number().integer().min(1).required(), // Ensure maxUnits is an integer >= 1
}).required();

// Validation schema for studentScores
const studentScoresSchema = Joi.array()
  .items(
    Joi.object({
      name: Joi.string().required(),
      scores: Joi.array()
        .items(
          Joi.object({
            code: Joi.string().required(),
            score: Joi.number().integer().min(0).required(), // Ensure scores are integers >= 0
          })
        )
        .required(),
    })
  )
  .required();

// Function to calculate cumulative grade point average
function calculateCGPA(studentCourses, unitRequirements, studentScores) {
  const results = [];

  // Loop through each student
  studentCourses.forEach((student) => {
    const studentScore = studentScores.find(
      (score) => score.name === student.name
    );

    if (!studentScore) {
      throw new Error(`Missing scores for student ${student.name}`);
    }

    // Check for duplicate scores
    const scoreCodes = studentScore.scores.map((score) => score.code);
    if (scoreCodes.length !== new Set(scoreCodes).size) {
      throw new Error(`Duplicate scores found for student ${student.name}`);
    }
    // Validate total units for student
    const totalUnits = student.courses.reduce(
      (acc, course) => acc + course.units,
      0
    );
    if (
      totalUnits < unitRequirements.minUnits ||
      totalUnits > unitRequirements.maxUnits
    ) {
      throw new Error(
        `Total units for student ${student.name} are outside the allowed range`
      );
    }

    // Initialize variables to store total points and units
    let totalPoints = 0;
    let totalUnitsTaken = 0;

    // Loop through each course for the student
    student.courses.forEach((course) => {
      const score = studentScore.scores.find((s) => s.code === course.code);

      if (!score) {
        throw new Error(
          `Missing score for course ${course.code} for student ${student.name}`
        );
      }

      // Calculate grade and points for course
      let grade;
      let points;
      if (score.score >= 70 && score.score <= 100) {
        grade = "A";
        points = 5;
      } else if (score.score >= 60 && score.score < 70) {
        grade = "B";
        points = 4;
      } else if (score.score >= 50 && score.score < 60) {
        grade = "C";
        points = 3;
      } else if (score.score >= 45 && score.score < 50) {
        grade = "D";
        points = 2;
      } else {
        grade = "F";
        points = 0;
      }

      // Update total points and units
      totalPoints += points * course.units;
      totalUnitsTaken += course.units;
    });

    // Calculate CGPA
    const cgpa = totalPoints / totalUnitsTaken;

    // Store result for student
    results.push({
      name: student.name,
      totalUnits: totalUnitsTaken,
      totalPoints,
      cgpa,
    });
  });

  return results;
}

// Endpoint to process JSON data and save output in database
http
  .createServer((req, res) => {
    if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        try {
          const bodyData = JSON.parse(body);

          const { error: errorStudentCourses } = studentCoursesSchema.validate(
            bodyData.studentCourses
          );
          const { error: errorUnitRequirements } =
            unitRequirementsSchema.validate(bodyData.unitRequirements);
          const { error: errorStudentScores } = studentScoresSchema.validate(
            bodyData.studentScores
          );

          if (
            errorStudentCourses ||
            errorUnitRequirements ||
            errorStudentScores
          ) {
            throw new Error("Invalid request body");
          }

          const results = calculateCGPA(
            bodyData.studentCourses,
            bodyData.unitRequirements,
            bodyData.studentScores
          );

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(results));
        } catch (error) {
          console.error(error.message);
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end(error.message);
        }
      });
    } else {
      res.writeHead(405, { "Content-Type": "text/plain" });
      res.end("Method Not Allowed");
    }
  })
  .listen(3000, () => {
    console.log("Server listening on port 3000");
  });

// Unit tests for endpoint
const testData = JSON.stringify({
  studentCourses,
  unitRequirements,
  studentScores,
});

const options = {
  hostname: "localhost",
  port: 3000,
  path: "/",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const req = http.request(options, (res) => {
  let body = "";
  res.on("data", (chunk) => {
    body += chunk;
  });
  res.on("end", () => {
    try {
      const results = JSON.parse(body);
      assert.strictEqual(results.length, 2);
      assert.strictEqual(results[0].name, "John Doe");
      assert.strictEqual(results[1].name, "Jane Doe");
      console.log("Unit tests passed");
    } catch (error) {
      console.error("Unit tests failed:");
    }
  });
});

req.on("error", (error) => {
  console.error("Error sending request:", error);
});

req.write(testData);
req.end();
