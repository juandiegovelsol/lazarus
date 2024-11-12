import random
import time
from nltk.corpus import wordnet
import nltk
import threading

nltk.download('wordnet')

class EnglishWordChallenge:
    def __init__(self):
        self.english_words = set(w.lower() for w in wordnet.all_lemma_names())

    def is_valid_word(self, word):
        return word.lower() in self.english_words

    def challenge_1(self):
        print("Welcome to Challenge 1!")
        player1_name = input("Enter Player 1 name: ")
        player2_name = input("Enter Player 2 name: ")

        player1_score = 0
        player2_score = 0

        player1_time = 0
        player2_time = 0

        word = random.choice(list(self.english_words))
        print(f"Randomly generated word: {word}")

        while True:
            start_time = time.time()
            player1_word = input(f"{player1_name}, enter a word that starts with '{word[-1]}': ")
            end_time = time.time()
            player1_time += end_time - start_time

            if self.is_valid_word(player1_word) and player1_word[0].lower() == word[-1].lower():
                player1_score += 1
                word = player1_word
            else:
                print(f"Invalid word. {player1_name} loses this round.")
                break

            start_time = time.time()
            player2_word = input(f"{player2_name}, enter a word that starts with '{word[-1]}': ")
            end_time = time.time()
            player2_time += end_time - start_time

            if self.is_valid_word(player2_word) and player2_word[0].lower() == word[-1].lower():
                player2_score += 1
                word = player2_word
            else:
                print(f"Invalid word. {player2_name} loses this round.")
                break

        print(f"\n{player1_name} scored {player1_score} points in {player1_time:.2f} seconds.")
        print(f"{player2_name} scored {player2_score} points in {player2_time:.2f} seconds.")

        if player1_score > player2_score:
            print(f"{player1_name} wins!")
        elif player2_score > player1_score:
            print(f"{player2_name} wins!")
        else:
            if player1_time < player2_time:
                print(f"{player1_name} wins!")
            elif player2_time < player1_time:
                print(f"{player2_name} wins!")
            else:
                print("It's a tie!")

    def challenge_2(self):
        print("Welcome to Challenge 2!")
        player1_name = input("Enter Player 1 name: ")
        player2_name = input("Enter Player 2 name: ")

        word = random.choice(list(self.english_words))
        print(f"Randomly generated word: {word}")

        time_limit = 120  # 120 seconds for the timer
        player1_words = []
        player2_words = []

        # Timer function
        def timer(player_name):
            print(f"{player_name}, you have 2 minutes to enter as many words as possible using the letters of '{word}':")
            time.sleep(time_limit)
            print("Time's up!")

        # Player 1's turn
        timer_thread = threading.Thread(target=timer, args=(player1_name,))
        timer_thread.start()

        start_time = time.time()
        while timer_thread.is_alive():
            player1_word = input()
            if player1_word.lower() == "done":
                break
            if self.is_valid_word(player1_word) and all(letter in player1_word.lower() for letter in player1_word.lower()):
                if all(letter in word.lower() for letter in player1_word.lower()):
                    player1_words.append(player1_word)
                else:
                    print("Invalid word. Word contains letters not present in the original word.")
            else:
                print("Invalid word.")

        player1_time = time.time() - start_time

        print(f"\n{player1_name} entered {len(player1_words)} words.")

        # Player 2's turn
        timer_thread = threading.Thread(target=timer, args=(player2_name,))
        timer_thread.start()

        start_time = time.time()
        while timer_thread.is_alive():
            player2_word = input()
            if player2_word.lower() == "done":
                break
            if self.is_valid_word(player2_word) and all(letter in player2_word.lower() for letter in player2_word.lower()):
                if all(letter in word.lower() for letter in player2_word.lower()):
                    player2_words.append(player2_word)
                else:
                    print("Invalid word. Word contains letters not present in the original word.")
            else:
                print("Invalid word.")

        player2_time = time.time() - start_time

        print(f"\n{player2_name} entered {len(player2_words)} words.")

        # Determine the winner
        if len(player1_words) > len(player2_words):
            print(f"{player1_name} wins!")
        elif len(player2_words) > len(player1_words):
            print(f"{player2_name} wins!")
        else:
            print("It's a tie!")

def main():
    challenge = EnglishWordChallenge()
    while True:
        print("1. Challenge 1")
        print("2. Challenge 2")
        print("3. Quit")
        choice = input("Enter your choice: ")
        if choice == "1":
            challenge.challenge_1()
        elif choice == "2":
            challenge.challenge_2()
        elif choice == "3":
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
