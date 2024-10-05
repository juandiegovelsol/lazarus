import tkinter as tk
from tkinter import ttk

class GroceryList:
    def __init__(self, items):
        self.items = []
        for item in items:
            if not isinstance(item, dict) or 'name' not in item or 'quantity' not in item or 'unit_type' not in item:
                print("Error: Invalid item data.")
                continue
            self.items.append(item)

    def convert_weight(self, index, target_unit_type):
        try:
            item = self.items[index]
            quantity = item["quantity"]
            unit_type = item["unit_type"]

            conversions = {
                "g": {"kg": 0.001, "lb": 0.00220462, "oz": 0.035274, "mg": 1000},
                "kg": {"g": 1000, "lb": 2.20462, "oz": 35.274},
                "lb": {"g": 453.592, "kg": 0.453592, "oz": 16},
                "oz": {"g": 28.3495, "kg": 0.0283495, "lb": 0.0625},
                "mg": {"g": 0.001, "kg": 0.000001},
            }

            if unit_type in conversions and target_unit_type in conversions[unit_type]:
                return quantity * conversions[unit_type][target_unit_type]
            else:
                print(f"Error: Conversion from {unit_type} to {target_unit_type} is not supported.")
                return None
        except KeyError:
            print(f"Error: Conversion from {self.items[index]['unit_type']} to {target_unit_type} is not supported.")
            return None

class GroceryListApp:
    def __init__(self, master):
        self.master = master
        master.title("Grocery Shopping List Converter")

        items = [
            {"name": "Apples", "quantity": 500, "unit_type": "g"},
            {"name": "Bananas", "quantity": 3, "unit_type": "units"},
            {"name": "Flour", "quantity": 1000, "unit_type": "g"},
            {"name": "Sugar", "quantity": 250, "unit_type": "g"},
            {"name": "Milk", "quantity": 1, "unit_type": "L"}
        ]

        self.grocery_list = GroceryList(items)
        self.conversion_options = []

        self.create_widgets()

    def create_widgets(self):
        self.create_original_list()
        self.create_converted_list()
        self.create_conversion_options()

    def create_original_list(self):
        try:
            ttk.Label(self.master, text="Original List").grid(row=0, column=0, padx=5, pady=5)
            self.original_list = tk.Listbox(self.master, width=30)
            for item in self.grocery_list.items:
                self.original_list.insert(tk.END, f"{item['name']} - {item['quantity']} {item['unit_type']}")
            self.original_list.grid(row=1, column=0, padx=5, pady=5)
        except Exception as e:
            print(f"Error: Failed to create original list component. {str(e)}")

    def create_converted_list(self):
        try:
            ttk.Label(self.master, text="Converted List").grid(row=0, column=1, padx=5, pady=5)
            self.converted_list = tk.Listbox(self.master, width=40)
            self.converted_list.grid(row=1, column=1, padx=5, pady=5)
        except Exception as e:
            print(f"Error: Failed to create converted list component. {str(e)}")

    def create_conversion_options(self):
        for i, item in enumerate(self.grocery_list.items):
            try:
                ttk.Label(self.master, text=item["name"]).grid(row=i+2, column=0, padx=5, pady=5)
                if item["unit_type"] == "g":
                    option = tk.StringVar(value=item["unit_type"])
                    ttk.Combobox(self.master, textvariable=option, values=["kg", "lb", "oz", "mg"]).grid(row=i+2, column=1, padx=5, pady=5)
                    option.trace_add("write", lambda *args, index=i: self.update_converted_list(index))
                    self.conversion_options.append(option)
                else:
                    option = tk.StringVar(value=item["unit_type"])
                    ttk.Combobox(self.master, textvariable=option, values=[item["unit_type"]]).grid(row=i+2, column=1, padx=5, pady=5)
                    option.trace_add("write", lambda *args, index=i: self.update_converted_list(index))
                    self.conversion_options.append(option)
            except Exception as e:
                print(f"Error: Failed to create conversion option component. {str(e)}")

    def update_converted_list(self, index):
        if index < 0 or index >= len(self.conversion_options):
            print("Error: Index out of range.")
            return
        item = self.grocery_list.items[index]
        target_unit_type = self.conversion_options[index].get()
        converted_quantity = self.grocery_list.convert_weight(index, target_unit_type)

        if converted_quantity is not None:
            self.converted_list.delete(index)
            self.converted_list.insert(index, f"{item['name']} - {converted_quantity:.2f} {target_unit_type}")

def main():
    try:
        root = tk.Tk()
        app = GroceryListApp(root)
        root.mainloop()
    except Exception as e:
        print(f"Error: An unexpected error occurred. {str(e)}")

if __name__ == "__main__":
    main()