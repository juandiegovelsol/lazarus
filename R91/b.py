
import random


elements = [
    {"name": "Hydrogen", "symbol": "H", "atomic_number": 1, "atomic_weight": 1.008},
    {"name": "Helium", "symbol": "He", "atomic_number": 2, "atomic_weight": 4.0026},
    {"name": "Lithium", "symbol": "Li", "atomic_number": 3, "atomic_weight": 6.94},
    {"name": "Beryllium", "symbol": "Be", "atomic_number": 4, "atomic_weight": 9.0122},

]


def ask_question(element):
    return f"What is the name of the element with symbol '{element['symbol']}'?", element['name']


def periodic_table_duel():
    player_scores = {"Player 1": 0, "Player 2": 0}
    rounds = 3

    for round_num in range(1, rounds + 1):
        print(f"\n-- Round {round_num} --\n")
        
        for player in player_scores:
            element = random.choice(elements)
            question, answer = ask_question(element)
            
            print(f"{player}'s turn!")
            print("Question:", question)
            player_answer = input("Your answer: ")


            if player_answer.lower() == answer.lower():
                player_scores[player] += round_num
                print("Correct!")
            else:
                print("Incorrect!")

            print(f"Score: {player_scores[player]}")
            
    print("\n--- Game Over ---")
    print("Final Scores:", player_scores)
    winner = max(player_scores, key=player_scores.get)
    print(f"The winner is {winner} with {player_scores[winner]} points!")


periodic_table_duel()