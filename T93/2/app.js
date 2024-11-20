const sqlite3 = require("sqlite3").verbose();
const Joi = require("joi");
const http = require("http");

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

// Validation schema for student courses
const studentCourseSchema = Joi.object({
  name: Joi.string().required(),
  courses: Joi.array()
    .items(
      Joi.object({
        code: Joi.string().required(),
        units: Joi.number().integer().positive().required(),
      })
    )
    .required(),
});

// Validation schema for unit requirements
const unitRequirementsSchema = Joi.object({
  minUnits: Joi.number().integer().positive().required(),
  maxUnits: Joi.number().integer().positive().required(),
});

// Validation schema for student scores
const studentScoreSchema = Joi.object({
  name: Joi.string().required(),
  scores: Joi.array()
    .items(
      Joi.object({
        code: Joi.string().required(),
        score: Joi.number().integer().positive().required(),
      })
    )
    .required(),
});

// Validation schema for the request body
const schema = Joi.object({
  studentCourses: Joi.array().items(studentCourseSchema).required(),
  unitRequirements: unitRequirementsSchema.required(),
  studentScores: Joi.array().items(studentScoreSchema).required(),
});

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
          // Pass bodyData instead of body to the validate method
          const { error } = schema.validate(bodyData);
          if (error) {
            throw new Error("Invalid input data: " + error.message);
          }

          const results = calculateCGPA(
            bodyData.studentCourses,
            bodyData.unitRequirements,
            bodyData.studentScores
          );

          // Save results to database
          db.serialize(function () {
            results.forEach((result) => {
              db.run(
                `
                  INSERT OR REPLACE INTO student_results
                  (name, total_units, total_points, cgpa)
                  VALUES (?, ?, ?, ?)
                `,
                result.name,
                result.totalUnits,
                result.totalPoints,
                result.cgpa
              );
            });
          });

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
