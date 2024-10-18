// SchoolSystem class
class SchoolSystem {
  /**
   * Creates a new SchoolSystem instance.
   * @param {string} schoolName - The name of the school.
   */
  constructor(schoolName) {
    this.schoolName = schoolName || "Unnamed School";
    this.teachers = new Map();
  }

  /**
   * Adds a teacher to the school.
   * @param {Teacher} teacher - The teacher to add.
   */
  addTeacher(teacher) {
    this.teachers.set(teacher.name, teacher);
  }
}

// Teacher class
class Teacher {
  /**
   * Creates a new Teacher instance.
   * @param {string} name - The name of the teacher.
   */
  constructor(name) {
    this.name = name || "Unnamed Teacher";
    this.students = new Map();
  }

  /**
   * Enrolls a student in the teacher's class.
   * @param {Student} student - The student to enroll.
   */
  enrollStudent(student) {
    this.students.set(student.name, student);
  }

  /**
   * Drops a student from the teacher's class.
   * @param {Student} student - The student to drop.
   */
  dropStudent(student) {
    this.students.delete(student);
  }

  /**
   * Makes an announcement to the teacher's students.
   * @param {string} announcement - The announcement to make.
   */
  makeAnnouncement(announcement) {
    console.log(`${this.name} announces: ${announcement}`);
    this.notifyStudents(announcement);
  }

  /**
   * Gives instructions to the teacher's students.
   * @param {string} instructions - The instructions to give.
   */
  giveInstructions(instructions) {
    console.log(`${this.name} is giving instructions: ${instructions}`);
    this.notifyStudents(instructions);
  }

  /**
   * Notifies the teacher's students of a message.
   * @param {string} message - The message to notify the students of.
   */
  notifyStudents(message) {
    console.log(this.name + " says: " + message);
    this.students.forEach((student) => student.getInfo(message));
  }
}

// Student class
class Student {
  /**
   * Creates a new Student instance.
   * @param {string} studentName - The name of the student.
   */
  constructor(studentName = "Unnamed Student") {
    this.name = studentName;
  }

  /**
   * Notifies the student of a message.
   * @param {string} message - The message to notify the student of.
   */
  getInfo(message) {
    console.log(`${this.name} got the notification: ${message}`);
  }
}

// Example usage
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
