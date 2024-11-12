import random
import numpy as np
import matplotlib.pyplot as plt

class Course:
    def __init__(self, name, professor, capacity, equipment_needs):
        self.name = name
        self.professor = professor
        self.capacity = capacity
        self.equipment_needs = equipment_needs

class Professor:
    def __init__(self, name, availability):
        self.name = name
        self.availability = availability

class Room:
    def __init__(self, name, capacity, equipment):
        self.name = name
        self.capacity = capacity
        self.equipment = equipment

class Schedule:
    def __init__(self, courses, professors, rooms, time_slots):
        self.courses = courses
        self.professors = professors
        self.rooms = rooms
        self.time_slots = time_slots
        self.schedule_matrix = self.initialize_schedule()

    def initialize_schedule(self):
        # Initialize with random assignments or empty
        schedule_matrix = np.empty((len(self.courses), len(self.time_slots), len(self.rooms)), dtype=object)
        for i in range(schedule_matrix.shape[0]):
            for j in range(schedule_matrix.shape[1]):
                for k in range(schedule_matrix.shape[2]):
                    if random.random() < 0.1:  # 10% chance of initial assignment
                        schedule_matrix[i, j, k] = (self.courses[i], self.professors[random.randint(0, len(self.professors) - 1)])
                    else:
                        schedule_matrix[i, j, k] = None
        return schedule_matrix

    def fitness(self):
        fitness = 0
        for i in range(self.schedule_matrix.shape[0]):
            for j in range(self.schedule_matrix.shape[1]):
                for k in range(self.schedule_matrix.shape[2]):
                    assignment = self.schedule_matrix[i, j, k]
                    if assignment:
                        course, professor = assignment
                        room = self.rooms[k]
                        # Check capacity
                        if course.capacity > room.capacity:
                            fitness -= 1
                        # Check equipment needs
                        if not all(need in room.equipment for need in course.equipment_needs):
                            fitness -= 1
                        # Check professor availability
                        if j not in professor.availability:
                            fitness -= 1
                        # Reward for filled slots
                        fitness += 1
        return fitness

    def crossover(self, other_schedule):
        new_schedule = Schedule(self.courses, self.professors, self.rooms, self.time_slots)
        # Simple crossover strategy: take half of the assignments from each parent
        for i in range(new_schedule.schedule_matrix.shape[0]):
            for j in range(new_schedule.schedule_matrix.shape[1]):
                for k in range(new_schedule.schedule_matrix.shape[2]):
                    if random.random() < 0.5:
                        new_schedule.schedule_matrix[i, j, k] = self.schedule_matrix[i, j, k]
                    else:
                        new_schedule.schedule_matrix[i, j, k] = other_schedule.schedule_matrix[i, j, k]
        return new_schedule

    def mutate(self, mutation_rate):
        for i in range(self.schedule_matrix.shape[0]):
            for j in range(self.schedule_matrix.shape[1]):
                for k in range(self.schedule_matrix.shape[2]):
                    if random.random() < mutation_rate:
                        # Simple mutation strategy: change or remove the assignment
                        if random.random() < 0.5:
                            self.schedule_matrix[i, j, k] = None
                        else:
                            course = self.courses[i]
                            professor = self.professors[random.randint(0, len(self.professors) - 1)]
                            self.schedule_matrix[i, j, k] = (course, professor)

def genetic_algorithm(population_size, mutation_rate, generations):
    # Initialize population
    population = []
    for _ in range(population_size):
        schedule = Schedule(courses, professors, rooms, time_slots)
        population.append(schedule)

    best_schedule = None
    best_fitness = float('-inf')

    for _ in range(generations):
        # Selection
        selected = sorted(population, key=lambda x: x.fitness(), reverse=True)[:population_size//2]

        # Crossover
        offspring = []
        while len(offspring) < population_size//2:
            parent1, parent2 = random.sample(selected, 2)
            child = parent1.crossover(parent2)
            offspring.append(child)

        # Mutation
        for schedule in offspring:
            schedule.mutate(mutation_rate)

        # Update population
        population = selected + offspring

        # Update best schedule
        current_best = max(population, key=lambda x: x.fitness())
        if current_best.fitness() > best_fitness:
            best_schedule = current_best
            best_fitness = current_best.fitness()

    return best_schedule

# Example usage
if __name__ == "__main__":
    # Define the data
    courses = [
        Course("Math", None, 30, ["Projector"]),
        Course("Science", None, 25, ["Lab"]),
        # Add more courses
    ]

    professors = [
        Professor("Professor1", [0, 1, 2]),
        Professor("Professor2", [1, 2, 3]),
        # Add more professors
    ]

    rooms = [
        Room("Room1", 35, ["Projector"]),
        Room("Room2", 30, ["Lab"]),
        # Add more rooms
    ]

    time_slots = [0, 1, 2, 3]  # Assuming four time slots for simplicity

    # Assign professors to courses (for simplicity, not considering professor-course compatibility)
    for course in courses:
        course.professor = professors[random.randint(0, len(professors) - 1)]

    best_schedule = genetic_algorithm(population_size=100, mutation_rate=0.01, generations=100)
    print("Best Schedule Fitness:", best_schedule.fitness())
    print("Best Schedule:")
    for i in range(best_schedule.schedule_matrix.shape[0]):
        for j in range(best_schedule.schedule_matrix.shape[1]):
            for k in range(best_schedule.schedule_matrix.shape[2]):
                assignment = best_schedule.schedule_matrix[i, j, k]
                if assignment:
                    course, professor = assignment
                    print(f"Course: {course.name}, Time Slot: {j}, Room: {rooms[k].name}, Professor: {professor.name}")