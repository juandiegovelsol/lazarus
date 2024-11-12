from datetime import datetime, timedelta
import itertools
from typing import List, Tuple, Dict
import random

class CoffeeChatScheduler:
    def __init__(self, employees: List[str], start_time: str = "14:00", end_time: str = "16:00"):
        self.employees = employees
        self.start_time = datetime.strptime(start_time, "%H:%M")
        self.end_time = datetime.strptime(end_time, "%H:%M")
        self.chat_duration = timedelta(minutes=30)
        
    def generate_all_pairs(self) -> List[Tuple[str, str]]:
        """Generate all possible unique pairs of employees."""
        pairs = list(itertools.combinations(self.employees, 2))
        random.shuffle(pairs)  # Randomize order to improve scheduling flexibility
        return pairs
    
    def get_available_time_slots(self) -> List[datetime]:
        """Generate available time slots on Wednesdays."""
        current_time = self.start_time
        time_slots = []
        
        while current_time + self.chat_duration <= self.end_time:
            time_slots.append(current_time)
            current_time += self.chat_duration
            
        return time_slots
    
    def create_schedule(self) -> List[Dict]:
        """Create a complete schedule for all coffee chats."""
        pairs = self.generate_all_pairs()
        time_slots = self.get_available_time_slots()
        schedule = []
        last_scheduled_time: Dict[str, datetime] = {employee: None for employee in self.employees}
        
        # Calculate how many weeks we need
        pairs_per_day = len(time_slots)
        total_weeks = (len(pairs) + pairs_per_day - 1) // pairs_per_day
        
        for week in range(total_weeks):
            current_week_pairs = pairs.copy()  # Make a copy of pairs for the week
            random.shuffle(time_slots)  # Randomize time slots each week
            
            for time_slot in time_slots:
                scheduled_this_slot = set()  # Track who has been scheduled in this time slot
                
                for pair in current_week_pairs[:]:  # Use a copy to modify while iterating
                    employee1, employee2 = pair
                    
                    # Ensure no back-to-back meetings
                    if (last_scheduled_time[employee1] is None or last_scheduled_time[employee1] + self.chat_duration * 2 <= time_slot) and \
                       (last_scheduled_time[employee2] is None or last_scheduled_time[employee2] + self.chat_duration * 2 <= time_slot) and \
                       employee1 not in scheduled_this_slot and employee2 not in scheduled_this_slot:
                        
                        # Schedule the pair
                        schedule.append({
                            'week': week + 1,
                            'time': time_slot.strftime("%H:%M"),
                            'employee1': employee1,
                            'employee2': employee2
                        })
                        
                        # Update the last scheduled times and track them in this slot
                        last_scheduled_time[employee1] = time_slot
                        last_scheduled_time[employee2] = time_slot
                        scheduled_this_slot.update([employee1, employee2])
                        
                        # Remove the pair from this week's schedule
                        pairs.remove(pair)
                        break
            
            # Reset last scheduled times for the next week
            last_scheduled_time = {employee: None for employee in self.employees}
        
        # Validate that all pairs were scheduled
        if pairs:
            print("Warning: Some pairs were not scheduled:")
            for pair in pairs:
                print(pair)
        else:
            print("All pairs were successfully scheduled.")

        return schedule

def print_schedule(schedule: List[Dict]):
    """Print the schedule in a readable format."""
    current_week = 0
    for meeting in schedule:
        if meeting['week'] != current_week:
            current_week = meeting['week']
            print(f"\nWeek {current_week} (Wednesday):")
            print("-" * 40)
        
        print(f"{meeting['time']}: {meeting['employee1']} meets with {meeting['employee2']}")

# Example usage
if __name__ == "__main__":
    employees = [
        "Alice", "Bob", "Charlie", "David",
        "Eve", "Frank", "Grace", "Henry"
    ]
    
    scheduler = CoffeeChatScheduler(employees)
    schedule = scheduler.create_schedule()
    print_schedule(schedule)

