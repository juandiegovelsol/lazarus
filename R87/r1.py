import random
import time
import enchant  # For dictionary checks
from datetime import timedelta

# Initialize the dictionary
d = enchant.Dict("en_US")

def generate_random_word():
    """Generate a random word from a list of words."""
    words = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew"]
    return random.choice(words)

def check_word(word):
    """Check if a word is in the dictionary and has correct dictation."""
    return d.check(word)

def challenge_1():
    """Part 1 of the challenge."""
    word = generate_random_word()
    print(f"Starting word: {word}")
    scores = {"Player 1": 0, "Player 2": 0}
    times = {"Player 1": 0, "Player 2": 0}
    while True:
        # Player 1's turn
        input("Player 1, press enter when ready")
        start_time = time.time()
        word_1 = input(f"Enter a word starting with {word[-1]}: ")
        end_time = time.time()
        if check_word(word_1) and word_1[0].lower() == word[-1].lower():
            scores["Player 1"] += 1
            times["Player 1"] += end_time - start_time
            print(f"Correct! Your score is {scores['Player 1']}. Time taken: {timedelta(seconds=end_time-start_time)}")
        else:
            print(f"Incorrect word or dictation. Your score remains {scores['Player 1']}.")
        word = word_1
        # Player 2's turn
        input("Player 2, press enter when ready")
        start_time = time.time()
        word_2 = input(f"Enter a word starting with {word[-1]}: ")
        end_time = time.time()
        if check_word(word_2) and word_2[0].lower() == word[-1].lower():
            scores["Player 2"] += 1
            times["Player 2"] += end_time - start_time
            print(f"Correct! Your score is {scores['Player 2']}. Time taken: {timedelta(seconds=end_time-start_time)}")
        else:
            print(f"Incorrect word or dictation. Your score remains {scores['Player 2']}.")
        word = word_2
        # Check for winner
        if scores["Player 1"] > scores["Player 2"] and times["Player 1"] < times["Player 2"]:
            print(f"Player 1 is the winner with a score of {scores['Player 1']} and time of {timedelta(seconds=times['Player 1'])}!")
            break
        elif scores["Player 2"] > scores["Player 1"] and times["Player 2"] < times["Player 1"]:
            print(f"Player 2 is the winner with a score of {scores['Player 2']} and time of {timedelta(seconds=times['Player 2'])}!")
            break
        elif input("Do you want to continue? (y/n): ") == "n":
            break

def challenge_2():
    """Part 2 of the challenge."""
    word = generate_random_word()
    print(f"Starting word: {word}")
    scores = {"Player 1": 0, "Player 2": 0}
    times = {"Player 1": 120, "Player 2": 120}
    # Player 1's turn
    print("Player 1's turn. You have 2 minutes to enter as many words as possible using the letters of the starting word.")
    start_time = time.time()
    while time.time() - start_time < times["Player 1"]:
        word_1 = input("Enter a word: ")
        if check_word(word_1) and all(letter in word.lower() for letter in word_1.lower()):
            scores["Player 1"] += 1
            print(f"Correct! Your score is {scores['Player 1']}. Time remaining: {timedelta(seconds=times['Player 1']-(time.time()-start_time))}")
        else:
            print(f"Incorrect word or dictation. Your score remains {scores['Player 1']}. Time remaining: {timedelta(seconds=times['Player 1']-(time.time()-start_time))}")
    # Player 2's turn
    print("Player 2's turn. You have 2 minutes to enter as many words as possible using the letters of the starting word.")
    start_time = time.time()
    while time.time() - start_time < times["Player 2"]:
        word_2 = input("Enter a word: ")
        if check_word(word_2) and all(letter in word.lower() for letter in word_2.lower()):
            scores["Player 2"] += 1
            print(f"Correct! Your score is {scores['Player 2']}. Time remaining: {timedelta(seconds=times['Player 2']-(time.time()-start_time))}")
        else:
            print(f"Incorrect word or dictation. Your score remains {scores['Player 2']}. Time remaining: {timedelta(seconds=times['Player 2']-(time.time()-start_time))}")
    # Check for winner
    if scores["Player 1"] > scores["Player 2"]:
        print(f"Player 1 is the winner with a score of {scores['Player 1']}!")
    elif scores["Player 2"] > scores["Player 1"]:
        print(f"Player 2 is the winner with a score of {scores['Player 2']}!")
    else:
        print("It's a tie!")

def main():
    """Main function."""
    print("Welcome to the English language challenge!")
    while True:
        print("Choose a challenge:")
        print("1. Challenge 1: Word chain")
        print("2. Challenge 2: Word scrambles")
        choice = input("Enter your choice (1/2): ")
        if choice == "1":
            challenge_1()
        elif choice == "2":
            challenge_2()
        else:
            print("Invalid choice. Please try again.")
        if input("Do you want to continue? (y/n): ") == "n":
            break

if __name__ == "__main__":
    main()