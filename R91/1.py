import random
import time
import threading

# List of elements in the periodic table
elements = [
    {"name": "Hydrogen", "symbol": "H", "atomic_number": 1, "atomic_weight": 1.008},
    {"name": "Helium", "symbol": "He", "atomic_number": 2, "atomic_weight": 4.0026},
    {"name": "Lithium", "symbol": "Li", "atomic_number": 3, "atomic_weight": 6.94},
    {"name": "Beryllium", "symbol": "Be", "atomic_number": 4, "atomic_weight": 9.0122},
    {"name": "Boron", "symbol": "B", "atomic_number": 5, "atomic_weight": 10.811},
    {"name": "Carbon", "symbol": "C", "atomic_number": 6, "atomic_weight": 12.0107},
    {"name": "Nitrogen", "symbol": "N", "atomic_number": 7, "atomic_weight": 14.0067},
    {"name": "Oxygen", "symbol": "O", "atomic_number": 8, "atomic_weight": 15.9994},
    {"name": "Fluorine", "symbol": "F", "atomic_number": 9, "atomic_weight": 18.9984},
    {"name": "Neon", "symbol": "Ne", "atomic_number": 10, "atomic_weight": 20.1797},
    {"name": "Sodium", "symbol": "Na", "atomic_number": 11, "atomic_weight": 22.9898},
    {"name": "Magnesium", "symbol": "Mg", "atomic_number": 12, "atomic_weight": 24.305},
    {"name": "Aluminum", "symbol": "Al", "atomic_number": 13, "atomic_weight": 26.9815},
    {"name": "Silicon", "symbol": "Si", "atomic_number": 14, "atomic_weight": 28.0855},
    {"name": "Phosphorus", "symbol": "P", "atomic_number": 15, "atomic_weight": 30.9738},
    {"name": "Sulfur", "symbol": "S", "atomic_number": 16, "atomic_weight": 32.065},
    {"name": "Chlorine", "symbol": "Cl", "atomic_number": 17, "atomic_weight": 35.453},
    {"name": "Argon", "symbol": "Ar", "atomic_number": 18, "atomic_weight": 39.9483},
    {"name": "Potassium", "symbol": "K", "atomic_number": 19, "atomic_weight": 39.0983},
    {"name": "Calcium", "symbol": "Ca", "atomic_number": 20, "atomic_weight": 40.078},
    {"name": "Scandium", "symbol": "Sc", "atomic_number": 21, "atomic_weight": 44.9559},
    {"name": "Titanium", "symbol": "Ti", "atomic_number": 22, "atomic_weight": 47.867},
    {"name": "Vanadium", "symbol": "V", "atomic_number": 23, "atomic_weight": 50.9415},
    {"name": "Chromium", "symbol": "Cr", "atomic_number": 24, "atomic_weight": 51.9961},
]

def ask_question(element, mode):
    if mode == "symbol":
        return f"What is the symbol of the element '{element['name']}'?", element['symbol']
    elif mode == "name":
        return f"What is the name of the element with symbol '{element['symbol']}'?", element['name']

def timer(player, player_scores):
    time.sleep(10)
    if player_scores[player]["answered"]:
        return
    print("\nTime's up!")
    player_scores[player]["score"] -= 10
    player_scores[player]["answered"] = True

def periodic_table_duel():
    player_scores = {"Player 1": {"score": 0, "answered": False}, "Player 2": {"score": 0, "answered": False}}
    rounds = int(input("How many rounds would you like to play? "))
    mode = random.choice(["symbol", "name"])
    print(f"Mode: {'Symbol' if mode == 'symbol' else 'Name'}")

    for round_num in range(1, rounds + 1):
        print(f"\n-- Round {round_num} --\n")
        
        for player in player_scores:
            element = random.choice(elements)
            question, answer = ask_question(element, mode)
            
            print(f"{player}'s turn!")
            print("Question:", question)
            
            player_scores[player]["answered"] = False
            threading.Thread(target=timer, args=(player, player_scores)).start()
            
            while True:
                player_answer = input("Your answer (or type 'hint' for a hint): ")
                
                if player_answer.lower() == "hint":
                    player_scores[player]["score"] -= 5
                    print(f"HINT: Atomic Number - {element['atomic_number']}")
                elif player_answer.lower() == answer.lower():
                    player_scores[player]["score"] += 20
                    print("Correct!")
                    player_scores[player]["answered"] = True
                    break
                else:
                    print("Incorrect! Try again.")
                    
                if player_scores[player]["answered"]:
                    print("You took too long to answer!")
                    break
            
            print(f"Score: {player_scores[player]['score']}")
            
    print("\n--- Game Over ---")
    print("Final Scores:")
    for player, score in player_scores.items():
        print(f"{player}: {score['score']}")
    winner = max(player_scores, key=lambda x: player_scores[x]["score"])
    print(f"The winner is {winner} with {player_scores[winner]['score']} points!")

periodic_table_duel()