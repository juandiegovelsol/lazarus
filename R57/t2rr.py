import random
import tkinter as tk

def generate_question():
    # Create random variables.
    vase_discovery_year = random.randint(1900, 2010)  
    vase_age_at_discovery = random.randint(100, 999)  
    vase_creation_year = vase_discovery_year - vase_age_at_discovery 
    eugene_age = random.randint(30, 60)  

    # Check if the vase's creation year divides evenly by Eugene's age and validate conditions
    factor = vase_creation_year / eugene_age
    if (factor.is_integer() and factor > 0 and vase_discovery_year - vase_age_at_discovery == vase_creation_year 
        and vase_discovery_year == vase_discovery_year):
        
        # Generate multiple-choice options for Eugene's age
        options = [eugene_age - 2, eugene_age - 1, eugene_age, eugene_age + 1, eugene_age + 2]
        random.shuffle(options)  
        
        # Create a question 
        question = (f'Eugene, while reading information about a vase he saw in a museum he visited in '
                    f'{vase_discovery_year + eugene_age}, learned that the year the vase was discovered is '
                    f'the same as the year he was born, and that the vase was {vase_age_at_discovery} years '
                    f'old when it was discovered. Additionally, during this visit, he calculated that the year '
                    f'the vase was made was {int(factor)} times his age at that time. How old is Eugene in the year '
                    f'{vase_discovery_year + eugene_age}?')
        # Return the question, options, and correct answer and retry if conditions are not met
        return question, options, eugene_age  
    else:
        return generate_question()  

def create_window():
    window = tk.Tk()
    window.title("Math Problems") 
    
    # Add a label for the title
    label = tk.Label(window, text="Eugene's Age Problems", font=('Arial', 24, 'bold'))
    label.pack()

    questions = []
    answers = []
    
    # Generate 10 questions and store them with their answers
    for i in range(10):
        question, options, answer = generate_question()
        questions.append((question, options))
        answers.append(options.index(answer))  # Store the index of the correct answer
    
    # Display the questions and options in a text box
    text_box = tk.Text(window, width=100, height=30)
    for i, (question, options) in enumerate(questions):
        text_box.insert(tk.END, f'{i+1}. {question}\n')
        for j, option in enumerate(options):
            text_box.insert(tk.END, f'{chr(65+j)}) {option}\n')  
        text_box.insert(tk.END, '----------------------------------------------------------------------------------------------------\n')
    
    # Insert the answer key
    text_box.insert(tk.END, 'Answer Key:\n')
    for i, answer in enumerate(answers):
        text_box.insert(tk.END, f'{i+1}. {chr(65+answer)}\n')  
    
    text_box.pack()  
    window.mainloop() 
create_window()