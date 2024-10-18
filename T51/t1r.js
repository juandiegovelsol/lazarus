class SchoolSystem {
  constructor(schoolName) {
    this.schoolName = schoolName || "Unnamed School";
    this.teachers = new Map();

    this.addTeacher = (teacher) => this.teachers.set(teacher.name, teacher);
  }
}

class Teacher {
  constructor(teacherName) {
    this.name = teacherName || "Unnamed Teacher";
    this.students = new Map();

    this.enrollStudent = (student) => this.students.set(student.name, student);
    this.dropStudent = (student) => {
      if (this.students.has(student.name)) {
        this.students.delete(student.name);
      }
    };

    this.notifyStudents = (message) => {
      console.log(this.name + " says: " + message);
      this.students.forEach((s) => s.getInfo(message));
    };

    this.makeAnnouncement = (announcement) =>
      this.notifyStudents("announces: " + announcement);
    this.giveInstructions = (instruction) =>
      this.notifyStudents("is giving instructions: " + instruction);
  }
}

class Student {
  constructor(studentName) {
    this.name = studentName || "Unnamed Student";

    this.getInfo = (message) =>
      console.log(this.name + " got the notification: " + message);
  }
}

const school1 = new SchoolSystem("Greenwood High");
const school2 = new SchoolSystem("Sunnydale Academy");

const t1 = new Teacher("Mr. Smith");
const t2 = new Teacher("Ms. Johnson");
const t3 = new Teacher("Mr. White");

school1.addTeacher(t1);
school1.addTeacher(t2);
school2.addTeacher(t3);

const s1 = new Student("Alice");
const s2 = new Student("Bob");
const s3 = new Student("Charlie");
const s4 = new Student("Daisy");

t1.enrollStudent(s1);
t1.enrollStudent(s2);
t2.enrollStudent(s3);
t3.enrollStudent(s4);

t1.makeAnnouncement("Homework is due tomorrow!");
t2.makeAnnouncement("Project submissions on Friday!");
t3.makeAnnouncement("Sports day is next Monday!");

t1.dropStudent(s2);

t1.giveInstructions("Prepare for the math exam.");
t2.giveInstructions("Study chapter 5 for the test.");
t3.giveInstructions("Practice your running for sports day.");
