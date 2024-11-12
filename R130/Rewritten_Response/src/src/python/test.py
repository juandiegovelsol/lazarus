import random

class Player:
    def __init__(self, name):
        self.name = name
        self.health = 100
        self.rooms_explored = set()

    def is_alive(self):
        # Check if the player is still alive based on health
        return self.health > 0

    def explore_room(self, room):
        # Mark a room as explored by adding it to the player's explored rooms set
        self.rooms_explored.add(room)

    def reduce_health(self, amount):
        # Reduce player's health by a specified amount, with a minimum of 0
        self.health -= amount
        if self.health < 0:
            self.health = 0

    def health_bar(self):
        # Generate a health bar visual representation based on current health
        bar = ''
        for i in range(10):
            if i < int(self.health / 10):
                bar += '#'
            else:
                bar += '-'
        return f"[{bar}] {self.health}%"

class Game:
    def __init__(self, rooms):
        self.rooms = rooms
        self.players = [Player("Alex"), Player("Bob")]
        self.current_player = 0
        self.events_log = open("events.txt", "w")  # Open events log file for writing

    def log_event(self, event):
        # Write an event to the events log
        self.events_log.write(event + "\n")

    def start_game(self):
        # Main game loop that continues while all players are alive and rooms remain unexplored
        while all(player.is_alive() for player in self.players) and any(len(player.rooms_explored) < len(self.rooms) for player in self.players):
            current_player = self.players[self.current_player]
            print(f"\n{current_player.name}'s turn:")
            print("Available rooms:")

            # Display available rooms with index numbers
            for i, room in enumerate(self.rooms):
                print(f"{i + 1}. {room.split(':')[0]}")

            # Prompt player for room choice with error handling for invalid entries
            while True:
                try:
                    choice = input("Choose a room to explore (enter the room number): ")
                    room_index = int(choice) - 1
                    if room_index < 0 or room_index >= len(self.rooms):
                        # Check if choice is outside valid range
                        print("Invalid choice. Please select a valid room number.")
                        continue
                    room = self.rooms[room_index]
                    break  # Exit loop on valid input
                except ValueError:
                    # Catch non-integer input errors
                    print("Invalid input. Please enter a valid room number.")

            room_name = room.split(':')[0]

            # Check if the other player has already explored the selected room
            other_player = self.players[(self.current_player + 1) % 2]
            if room_name in [r.split(':')[0] for r in other_player.rooms_explored]:
                # If room has already been explored by the other player, apply random damage
                damage = random.randint(5, 20)
                current_player.reduce_health(damage)
                self.log_event(f"{current_player.name} entered the {room_name} and encountered the other player! They took {damage} damage.")
                print(f"{current_player.name} entered the {room_name} and encountered the other player! They took {damage} damage.")
            else:
                # Log and display room exploration for current player
                self.log_event(f"{current_player.name} entered the {room_name}.")
                print(f"{current_player.name} entered the {room_name}.")

            # Add the explored room to the player's record
            current_player.explore_room(room)

            # Display the room description and player's health bar
            print(room)
            print(f"{current_player.name}'s health: {current_player.health_bar()}")

            # Switch to the next player for the next turn
            self.current_player = (self.current_player + 1) % 2

        # Close the events log file after the game ends
        self.events_log.close()

        # Determine and print the game outcome based on player health and rooms explored
        if not all(player.is_alive() for player in self.players):
            # If any player is no longer alive, declare the surviving player as the winner
            winner = [player.name for player in self.players if player.is_alive()]
            if winner:
                print(f"\n{winner[0]} wins with {self.players[[player.name for player in self.players].index(winner[0])].health} health!")
            else:
                print("\nIt's a draw! Both players died.")
        else:
            # If both players are alive, declare the player with the most health as the winner
            winner = max(self.players, key=lambda player: player.health)
            print(f"\n{winner.name} wins with {winner.health} health!")

def load_rooms(filename):
    # Load rooms from a text file, stripping whitespace and returning a list of room descriptions
    with open(filename, 'r') as f:
        return [line.strip() for line in f.readlines()]

# Load rooms from 'rooms.txt' file and start the game
rooms = load_rooms('rooms.txt')
game = Game(rooms)
game.start_game()