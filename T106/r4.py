class Hotel:
    def __init__(self, name, rooms):
        self.name = name
        self.rooms = rooms
        self.reservations = []

    def make_reservation(self, customer_name, room_number):
        if room_number in self.rooms:
            self.reservations.append((customer_name, room_number))
            print(f"Reservation confirmed for {customer_name} in room {room_number}")
        else:
            print("Room isn't available")

    def view_reservations(self):
        for reservation in self.reservations:
            print(f"Customer: {reservation[0]}, Room: {reservation[1]}")

my_hotel = Hotel("Ocean View", [101, 102, 103])
my_hotel.make_reservation("John Doe", 101)
my_hotel.view_reservations()