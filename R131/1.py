import random
import numpy as np

# Define constants
POPULATION_SIZE = 100
MUTATION_RATE = 0.01
GENERATIONS = 1000

# Define the Course and Classroom classes
class Course:
    def __init__(self, name, professor, students, equipment):
        self.name = name
        self.professor = professor
        self.students = students
        self.equipment = equipment

class Classroom:
    def __init__(self, name, capacity, equipment):
        self.name = name
        self.capacity = capacity
        self.equipment = equipment

# Define the genetic algorithm
class GeneticAlgorithm:
    def __init__(self, courses, classrooms, time_slots):
        self.courses = courses
        self.classrooms = classrooms
        self.time_slots = time_slots
        self.population = self.generate_initial_population()

    def generate_initial_population(self):
        population = []
        for _ in range(POPULATION_SIZE):
            schedule = []
            for course in self.courses:
                classroom = random.choice(self.classrooms)
                time_slot = random.choice(self.time_slots)
                schedule.append((course, classroom, time_slot))
            population.append(schedule)
        return population

    def fitness(self, schedule):
        conflicts = 0
        for i, (course, classroom, time_slot) in enumerate(schedule):
            # Check for room overcapacity
            if course.students > classroom.capacity:
                conflicts += 1

            # Check for time overlaps
            for j, (other_course, other_classroom, other_time_slot) in enumerate(schedule):
                if i != j and course.professor == other_course.professor and time_slot == other_time_slot:
                    conflicts += 1

            # Check for equipment mismatches
            if course.equipment not in classroom.equipment:
                conflicts += 1

        return -conflicts  # Minimize conflicts

    def crossover(self, parent1, parent2):
        child = []
        for i in range(len(parent1)):
            if random.random() < 0.5:
                child.append(parent1[i])
            else:
                child.append(parent2[i])
        return child

    def mutate(self, schedule):
        for i in range(len(schedule)):
            if random.random() < MUTATION_RATE:
                course, classroom, time_slot = schedule[i]
                new_classroom = random.choice(self.classrooms)
                new_time_slot = random.choice(self.time_slots)
                schedule[i] = (course, new_classroom, new_time_slot)
        return schedule

    def run(self):
        for generation in range(GENERATIONS):
            # Evaluate the fitness of each schedule
            fitness_scores = [self.fitness(schedule) for schedule in self.population]

            # Select the fittest schedules
            fittest_schedules = [schedule for _, schedule in sorted(zip(fitness_scores, self.population), reverse=True)]

            # Create a new generation through crossover and mutation
            new_population = []
            for _ in range(POPULATION_SIZE):
                parent1, parent2 = random.sample(fittest_schedules[:10], 2)
                child = self.crossover(parent1, parent2)
                child = self.mutate(child)
                new_population.append(child)

            self.population = new_population

        # Return the fittest schedule
        fitness_scores = [self.fitness(schedule) for schedule in self.population]
        fittest_schedule = [schedule for _, schedule in sorted(zip(fitness_scores, self.population), reverse=True)][0]
        return fittest_schedule, self.fitness(fittest_schedule)

# Example usage
courses = [
    Course("Math 101", "Professor Smith", 30, "projector"),
    Course("Science 202", "Professor Johnson", 25, "lab"),
    Course("English 303", "Professor Thompson", 20, "none"),
]

classrooms = [
    Classroom("Room 101", 30, ["projector"]),
    Classroom("Room 202", 25, ["lab"]),
    Classroom("Room 303", 20, ["none"]),
]

time_slots = ["8:00-9:00", "9:00-10:00", "10:00-11:00"]

ga = GeneticAlgorithm(courses, classrooms, time_slots)
best_schedule, fitness_score = ga.run()

print("Best Schedule:")
for course, classroom, time_slot in best_schedule:
    print(f"{course.name}: {classroom.name} at {time_slot}")

print(f"Fitness Score: {fitness_score}")