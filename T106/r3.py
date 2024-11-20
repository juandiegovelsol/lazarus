class Hotel:
    """
    A class to represent a hotel.
    
    Attributes:
    name (str): The name of the hotel.
    rooms (list): A list of available rooms.
    reservations (list): A list of reservations.
    """
    
    def __init__(self, name, rooms):
        """
        Initializes a new Hotel instance.
        
        Args:
        name (str): The name of the hotel.
        rooms (list): A list of available rooms.
        """
        self.name = name
        self.rooms = rooms
        self.reservations = []

    def make_reservation(self, customer_name, room_number):
        """
        Makes a reservation for a customer in a room.
        
        Args:
        customer_name (str): The name of the customer.
        room_number (int): The number of the room.
        """

        if not isinstance(customer_name, str) or not customer_name:
            print("Invalid customer name. It must be a non-empty string.")
            return

        if not isinstance(room_number, int) or room_number <= 0:
            print("Invalid room number. It must be a valid number greater than zero.")
            return

        if room_number in self.rooms and room_number not in [reservation[1] for reservation in self.reservations]:
            self.reservations.append((customer_name, room_number))
            print(f"Reservation confirmed for {customer_name} in room {room_number}")
        else:
            print("Room isn't available or doesn't exist.")


    def view_reservations(self):
        """
        Displays all reservations.
        """
        for reservation in self.reservations:
            print(f"Customer: {reservation[0]}, Room: {reservation[1]}")

# Create a new hotel instance
hotel = Hotel("Ocean View", [101, 102, 103])

# Make a reservation
hotel.make_reservation("John Doe", 101)

# Make reservation in occupied room
hotel.make_reservation("John", 101)

# Input validation cases
hotel.make_reservation("", 101)
hotel.make_reservation(123, 101)
hotel.make_reservation("John Doe", "0")
hotel.make_reservation("John Doe", -101)

# View all reservations
hotel.view_reservations()