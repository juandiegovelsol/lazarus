class Course:
    def __init__(self, name, semester, grade):
        self.name = name
        self.semester = semester
        self.grade = grade

    def __str__(self):
        return f"Course: {self.name}, Semester: {self.semester}, Grade: {self.grade}"


class GradeTracker:
    def __init__(self):
        self.courses = []
        self.grade_points = {
            'A': 4.0,
            'A-': 3.7,
            'B+': 3.3,
            'B': 3.0,
            'B-': 2.7,
            'C+': 2.3,
            'C': 2.0,
            'C-': 1.7,
            'D+': 1.3,
            'D': 1.0,
            'D-': 0.7,
            'F': 0.0
        }

    def add_course(self):
        name = input("Enter the course name: ")
        semester = input("Enter the semester (e.g., Fall 2024): ")
        while True:
            grade = input("Enter the final letter grade (e.g., A, B+, C-): ").upper()
            if grade in self.grade_points:
                break
            else:
                print("Invalid grade. Please enter a valid letter grade.")

        self.courses.append(Course(name, semester, grade))

    def calculate_gpa(self):
        if not self.courses:
            return 0.0

        total_points = sum(self.grade_points[course.grade] for course in self.courses)
        return total_points / len(self.courses)

    def display_courses(self):
        if not self.courses:
            print("No courses added yet.")
            return

        for i, course in enumerate(self.courses, start=1):
            print(f"{i}. {course}")

    def run(self):
        while True:
            print("\nGrade Tracker Menu:")
            print("1. Add a course")
            print("2. Calculate average GPA")
            print("3. Display all courses")
            print("4. Quit")

            choice = input("Enter your choice: ")

            if choice == "1":
                self.add_course()
            elif choice == "2":
                gpa = self.calculate_gpa()
                print(f"Your average GPA is: {gpa:.2f}")
            elif choice == "3":
                self.display_courses()
            elif choice == "4":
                break
            else:
                print("Invalid choice. Please try again.")


if __name__ == "__main__":
    tracker = GradeTracker()
    tracker.run()