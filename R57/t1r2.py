import random

def generate_question():
    vase_made_year = random.randint(1000, 1800)
    vase_discovered_year = vase_made_year + random.randint(100, 400)
    eugene_birth_year = vase_discovered_year
    eugene_age = random.randint(30, 60)
    visit_year = eugene_birth_year + eugene_age

    # Check if vase was indeed made 39 times Eugene's age ago
    vase_made_year_for_visit_year = visit_year - eugene_age * 39
    if vase_made_year_for_visit_year != vase_made_year:
        return generate_question()

    vase_age_at_discovery = vase_discovered_year - vase_made_year
    correct_answer = eugene_age

    options = [correct_answer]
    while len(options) < 5:
        option = random.randint(30, 60)
        if option not in options:
            options.append(option)

    random.shuffle(options)

    question = f"Eugene, while reading information about a vase he saw in a museum he visited in {visit_year}, learned that the year the vase was discovered is the same as the year he was born, and that the vase was {vase_age_at_discovery} years old when it was discovered. Additionally, during this visit, he calculated that the year the vase was made was 39 times his age at that time. How old is Eugene in the year {visit_year}? "
    for i, option in enumerate(options):
        if option == correct_answer:
            correct_answer_index = chr(65 + i)  # Convert to A, B, C, D, E
        question += f"{chr(65 + i)}) {option} "

    return question, correct_answer_index

for _ in range(10):
    question, correct_answer = generate_question()
    print(question)
    print("Correct answer:", correct_answer)
    print()