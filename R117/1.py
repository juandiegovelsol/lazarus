import random

class Room:
    def __init__(self, name, description):
        self.name = name
        self.description = description
        self.visited = False

class Player:
    def __init__(self, name):
        self.name = name
        self.health = 100
        self.progress = []

    def explore(self, room):
        if room.visited:
            print(f"{self.name} has already visited {room.name}.")
        else:
            print(f"{self.name} explores {room.name}: {room.description}")
            room.visited = True
            self.progress.append(room.name)

    def take_damage(self, amount):
        self.health -= amount
        if self.health <= 0:
            print(f"{self.name} has succumbed to the haunted house!")
        else:
            print(f"{self.name} takes {amount} damage. Health: {self.health}")

class HauntedHouseGame:
    def __init__(self):
        self.rooms = {}
        self.players = []
        self.event_log_path = "event_log.txt"

    def load_rooms(self, file_path):
        try:
            with open(file_path, 'r') as file:
                for line in file:
                    name, description = line.strip().split(':')
                    self.rooms[name] = Room(name, description)
        except FileNotFoundError:
            print("Room file not found! Terminating the game.")
            exit(1)
        except ValueError as e:
            print(f"Error reading room details from file: {e}. Terminating the game.")
            exit(1)

    def add_player(self, player_name):
        player = Player(player_name)
        self.players.append(player)
        print(f"Player {player_name} added to the game.")

    def log_event(self, event):
        try:
            with open(self.event_log_path, 'a') as log_file:
                log_file.write(event + '\n')
        except Exception as e:
            print(f"Failed to log event: {e}")

    def start_game(self):
        if not self.players:
            print("No players added to the game!")
            return

        print("The game begins in the haunted house...")
        for player in self.players:
            room = random.choice(list(self.rooms.values()))
            player.explore(room)
            if random.random() < 0.3:
                player.take_damage(random.randint(5, 20))
            self.log_event(f"{player.name} explored {room.name}")

# Example usage
game = HauntedHouseGame()
game.load_rooms("rooms.txt")
game.add_player("Alex")
game.add_player("Jordan")
game.add_player("1")
game.add_player("2")
game.add_player("3")
game.add_player("4")
game.start_game()