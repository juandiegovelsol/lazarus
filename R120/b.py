
import time
import threading
from datetime import datetime, timedelta

# Simulated event database
events = [
    {"name": "Yoga Class", "start_time": datetime(2024, 11, 10, 9, 0), "end_time": datetime(2024, 11, 10, 10, 0), "room": "Room A", "max_capacity": 20, "rsvp_count": 10},
    {"name": "Book Club", "start_time": datetime(2024, 11, 10, 9, 30), "end_time": datetime(2024, 11, 10, 10, 30), "room": "Room B", "max_capacity": 15, "rsvp_count": 10}
]

# Lock for managing concurrency
event_lock = threading.Lock()

# Function to check for event overlap
def check_event_overlap(new_event):
    for event in events:
        if event["room"] == new_event["room"]:
            if new_event["start_time"] < event["end_time"] and new_event["end_time"] > event["start_time"]:
                return True  # Overlap detected
    return False

# Function to add a new event if there’s no overlap
def add_event(new_event):
    with event_lock:
        if not check_event_overlap(new_event):
            events.append(new_event)
            print(f"Event '{new_event['name']}' scheduled successfully!")
        else:
            print(f"Error: '{new_event['name']}' conflicts with another event.")

# Function to handle RSVPs
def rsvp_event(event_name):
    with event_lock:
        for event in events:
            if event["name"] == event_name:
                if event["rsvp_count"] < event["max_capacity"]:
                    time.sleep(0.1)  # Simulate delay
                    event["rsvp_count"] += 1
                    print(f"RSVP successful for '{event_name}'! Current RSVP count: {event['rsvp_count']}")
                else:
                    print(f"RSVP failed for '{event_name}': Event is full.")
                return

# Example to add a new event that may overlap
new_event = {
    "name": "Art Workshop",
    "start_time": datetime(2024, 11, 10, 8, 30),
    "end_time": datetime(2024, 11, 10, 9, 1),
    "room": "Room B",
    "max_capacity": 25,
    "rsvp_count": 0
}

# Adding the new event
add_event(new_event)

# Simulating concurrent RSVPs for an event
def simulate_rsvp():
    for _ in range(5):  # Simulate 5 concurrent RSVPs
        rsvp_thread = threading.Thread(target=rsvp_event, args=("Yoga Class",))
        rsvp_thread.start()

simulate_rsvp()