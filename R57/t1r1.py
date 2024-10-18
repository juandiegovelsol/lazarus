import random

def generate_question():
    vase_discovery_year = random.randint(1900, 2010)
    vase_age_at_discovery = random.randint(100, 999)
    vase_creation_year = vase_discovery_year - vase_age_at_discovery
    eugene_age = random.randint(30, 60)
    vase_creation_year_check = vase_creation_year
    vase_discovery_year_check = vase_discovery_year
    eugene_birth_year = vase_discovery_year
    vase_creation_year = vase_creation_year_check
    factor = vase_creation_year / eugene_age
    if (factor.is_integer() and factor > 0 and vase_discovery_year - vase_age_at_discovery == vase_creation_year and vase_discovery_year == eugene_birth_year):
        options = [eugene_age - 2, eugene_age - 1, eugene_age, eugene_age + 1, eugene_age + 2]
        random.shuffle(options)
        question = f'Eugene, while reading information about a vase he saw in a museum he visited in {eugene_birth_year + eugene_age}, learned that the year the vase was discovered is the same as the year he was born, and that the vase was {vase_age_at_discovery} years old when it was discovered. Additionally, during this visit, he calculated that the year the vase was made was {int(factor)} times his age at that time. How old is Eugene in the year {eugene_birth_year + eugene_age}?'
        return question, options, eugene_age
    else:
        return generate_question()

questions = []
for _ in range(10):
    question, options, answer = generate_question()
    questions.append((question, options, answer))

letters = ['A', 'B', 'C', 'D', 'E']
for i, (question, options, answer) in enumerate(questions):
    print(question)
    for j, option in enumerate(options):
        print(f'{letters[j]}) {option}')
    print(f'Answer: {letters[options.index(answer)]}')
    print()