import tkinter as tk
from tkinter import ttk

class UnitConverter:
    def __init__(self):
        self.conversion_factors = {
            "g": {"kg": 0.001, "lb": 0.00220462, "oz": 0.035274, "mg": 1000},
            "kg": {"g": 1000, "lb": 2.20462, "oz": 35.274, "mg": 1000000},
            "lb": {"g": 453.592, "kg": 0.453592, "oz": 16, "mg": 453592},
            "oz": {"g": 28.3495, "kg": 0.0283495, "lb": 0.0625, "mg": 28349.5},
            "mg": {"g": 0.001, "kg": 0.000001, "lb": 0.00000220462, "oz": 0.000035274},
            "L": {"L": 1},
            "units": {"units": 1}
        }

    def convert(self, quantity, from_unit, to_unit):
        if from_unit not in self.conversion_factors or to_unit not in self.conversion_factors[from_unit]:
            raise ValueError("Invalid unit conversion")
        return quantity * self.conversion_factors[from_unit][to_unit]


class GroceryList:
    def __init__(self):
        self.shopping_list = [
            {"name": "Apples", "quantity": 500, "unit": "g"},
            {"name": "Bananas", "quantity": 3, "unit": "units"},
            {"name": "Flour", "quantity": 1000, "unit": "g"},
            {"name": "Sugar", "quantity": 250, "unit": "g"},
            {"name": "Milk", "quantity": 1, "unit": "L"}
        ]
        self.unit_converter = UnitConverter()

    def convert_weight(self, index, to_unit):
        item = self.shopping_list[index]
        try:
            converted_quantity = self.unit_converter.convert(item["quantity"], item["unit"], to_unit)
            return f"{item['name']} - {converted_quantity:.2f} {to_unit}"
        except ValueError:
            return f"Invalid unit conversion for {item['name']}"


class GroceryListUI:
    def __init__(self, master, grocery_list):
        self.master = master
        self.grocery_list = grocery_list
        self.create_widgets()

    def create_widgets(self):
        ttk.Label(self.master, text="Original List").grid(row=0, column=0, padx=5, pady=5)
        self.original_list = tk.Listbox(self.master, width=30)
        for item in self.grocery_list.shopping_list:
            self.original_list.insert(tk.END, f"{item['name']} - {item['quantity']} {item['unit']}")
        self.original_list.grid(row=1, column=0, padx=5, pady=5)

        ttk.Label(self.master, text="Converted List").grid(row=0, column=1, padx=5, pady=5)
        self.converted_list = tk.Listbox(self.master, width=40)
        self.converted_list.grid(row=1, column=1, padx=5, pady=5)

        self.conversion_options = []
        for i, item in enumerate(self.grocery_list.shopping_list):
            ttk.Label(self.master, text=item["name"]).grid(row=i+2, column=0, padx=5, pady=5)
            if item["unit"] == "g":
                option = tk.StringVar(value=item["unit"])
                ttk.Combobox(self.master, textvariable=option, values=["kg", "lb", "oz", "mg"]).grid(row=i+2, column=1, padx=5, pady=5)
                option.trace_add("write", lambda *args, index=i: self.convert_weight(index))
                self.conversion_options.append(option)
            else:
                option = tk.StringVar(value=item["unit"])
                ttk.Combobox(self.master, textvariable=option, values=[item["unit"]]).grid(row=i+2, column=1, padx=5, pady=5)
                option.trace_add("write", lambda *args, index=i: self.convert_weight(index))
                self.conversion_options.append(option)

    def convert_weight(self, index):
        selected_unit = self.conversion_options[index].get()
        converted_item = self.grocery_list.convert_weight(index, selected_unit)
        self.converted_list.delete(index)
        self.converted_list.insert(index, converted_item)


root = tk.Tk()
grocery_list = GroceryList()
app = GroceryListUI(root, grocery_list)
root.mainloop()