import random
import time
import threading

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
    {"name": "Sulfur", "symbol": "S", "atomic_number": 16, "atomic_weight": 32.064},
    {"name": "Chlorine", "symbol": "Cl", "atomic_number": 17, "atomic_weight": 35.453},
    {"name": "Argon", "symbol": "Ar", "atomic_number": 18, "atomic_weight": 39.9483},
    {"name": "Potassium", "symbol": "K", "atomic_number": 19, "atomic_weight": 39.0983},
    {"name": "Calcium", "symbol": "Ca", "atomic_number": 20, "atomic_weight": 40.078},
    {"name": "Scandium", "symbol": "Sc", "atomic_number": 21, "atomic_weight": 44.9559},
    {"name": "Titanium", "symbol": "Ti", "atomic_number": 22, "atomic_weight": 47.867},
    {"name": "Vanadium", "symbol": "V", "atomic_number": 23, "atomic_weight": 50.9415},
    {"name": "Chromium", "symbol": "Cr", "atomic_number": 24, "atomic_weight": 51.9961},
]

class Timer:
    def __init__(self, timeout):
        self.timeout = timeout
        self._timed_out = False

    def start(self):
        def timer_function():
            time.sleep(self.timeout)
            self._timed_out = True
        threading.Thread(target=timer_function).start()

    def is_timed_out(self):
        return self._timed_out

def ask_question(element, mode):
    if mode == "name":
        return f"What is the name of the element with symbol '{element['symbol']}'?", element['name']
    elif mode == "symbol":
        return f"What is the symbol of the element with name '{element['name']}'?", element['symbol']

def periodic_table_duel():
    player_scores = {"Player 1": 0, "Player 2": 0}
    rounds = int(input("How many rounds would you like to play? "))
    mode = random.choice(["name", "symbol"])
    print(f"Mode: {'Element Name' if mode == 'name' else 'Element Symbol'}")

    for round_num in range(1, rounds + 1):
        print(f"\n-- Round {round_num} --\n")
        
        for player in player_scores:
            element = random.choice(elements)
            question, answer = ask_question(element, mode)
            
            print(f"{player}'s turn!")
            print("Question:", question)
            timer = Timer(10)
            timer.start()
            player_answer = input("Your answer (type 'hint' for a hint): ")

            if timer.is_timed_out():
                print("Time's up! -10 points")
                player_scores[player] -= 10
            elif player_answer.lower() == "hint":
                print(f"Hint: Atomic Number - {element['atomic_number']}")
                player_scores[player] -= 5
                timer = Timer(10)
                timer.start()
                player_answer = input("Your answer: ")
                if timer.is_timed_out():
                    print("Time's up! -10 points")
                    player_scores[player] -= 10
                elif player_answer.lower() == answer.lower():
                    player_scores[player] += 20
                    print("Correct! +20 points")
                else:
                    print("Incorrect!")
            elif player_answer.lower() == answer.lower():
                player_scores[player] += 20
                print("Correct! +20 points")
            else:
                print("Incorrect!")

            print(f"Score: {player_scores[player]}")
            
    print("\n--- Game Over ---")
    print("Final Scores:", player_scores)
    winner = max(player_scores, key=player_scores.get)
    print(f"The winner is {winner} with {player_scores[winner]} points!")

periodic_table_duel()