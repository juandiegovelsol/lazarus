import random
import tkinter as tk

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

root = tk.Tk()
root.title("Vase Questions")

title_label = tk.Label(root, text="The Vase Questions", font=("Arial", 24, "bold"))
title_label.pack()

text_box = tk.Text(root, width=100, height=30)
for i, (question, options, answer) in enumerate(questions):
    text_box.insert(tk.END, f"{i+1}. {question}\n")
    for j, option in enumerate(options):
        text_box.insert(tk.END, f"{letters[j]}) {option}\n")
    text_box.insert(tk.END, "-" * 100 + "\n")
text_box.pack()

answer_label = tk.Label(root, text="Answer Key:")
answer_label.pack()

answer_text = tk.Text(root, width=20, height=10)
for i, (_, _, answer) in enumerate(questions):
    answer_index = [j for j, (_, _, a) in enumerate(questions) if a == answer][0]
    answer_letter = [letter for j, letter in enumerate(letters) if j == [k for k, option in enumerate(questions[answer_index][1]) if option == answer][0]][0]
    answer_text.insert(tk.END, f"{i+1}. {answer_letter}\n")
answer_text.pack()

root.mainloop()