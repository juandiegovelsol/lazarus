import csv
import datetime
from typing import List, Dict

# Define the file names for income and expense data
INCOME_FILE = 'income.csv'
EXPENSE_FILE = 'expense.csv'

# Define the field names for the CSV files
FIELD_NAMES = ['Amount', 'Category', 'Date']

def add_income() -> None:
    """
    Add a new income transaction.
    """
    amount = float(input("Please enter the income amount: $"))
    category = input("Please enter the income category: ")
    date = input("Please enter the income date (YYYY-MM-DD), or leave blank for today: ")
    if date == "":
        date = datetime.date.today().strftime("%Y-%m-%d")

    # Append the new income transaction to the CSV file
    with open(INCOME_FILE, 'a', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=FIELD_NAMES)
        if file.tell() == 0:
            writer.writeheader()
        writer.writerow({'Amount': amount, 'Category': category, 'Date': date})

    print("Income added successfully!")

def add_expense() -> None:
    """
    Add a new expense transaction.
    """
    amount = float(input("Please enter the expense amount: $"))
    category = input("Please enter the expense category: ")
    date = input("Please enter the expense date (YYYY-MM-DD), or leave blank for today: ")
    if date == "":
        date = datetime.date.today().strftime("%Y-%m-%d")

    # Append the new expense transaction to the CSV file
    with open(EXPENSE_FILE, 'a', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=FIELD_NAMES)
        if file.tell() == 0:
            writer.writeheader()
        writer.writerow({'Amount': amount, 'Category': category, 'Date': date})

    print("Expense added successfully!")

def get_balance() -> float:
    """
    Calculate the current balance by summing up all income and subtracting all expenses.
    """
    income = 0
    expense = 0

    try:
        with open(INCOME_FILE, 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                income += float(row['Amount'])

        with open(EXPENSE_FILE, 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                expense += float(row['Amount'])
    except FileNotFoundError:
        pass

    return income - expense

def filter_transactions(file_name: str, category: str = None, start_date: str = None, end_date: str = None) -> List[Dict]:
    """
    Filter income or expense transactions by category and date range.

    Args:
        file_name (str): The name of the CSV file to filter.
        category (str, optional): The category to filter by. Defaults to None.
        start_date (str, optional): The start date to filter by. Defaults to None.
        end_date (str, optional): The end date to filter by. Defaults to None.

    Returns:
        List[Dict]: A list of filtered transactions.
    """
    filtered_transactions = []

    try:
        with open(file_name, 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                if (category is None or row['Category'] == category) and \
                   (start_date is None or row['Date'] >= start_date) and \
                   (end_date is None or row['Date'] <= end_date):
                    filtered_transactions.append(row)
    except FileNotFoundError:
        pass

    return filtered_transactions

def main() -> None:
    """
    The main function that runs the application.
    """
    while True:
        print("\nWelcome to your personal finance tracker!")
        print("1. Add income")
        print("2. Add expense")
        print("3. Check balance")
        print("4. Filter income")
        print("5. Filter expense")
        print("6. Quit")

        choice = input("Please choose an option: ")

        if choice == "1":
            add_income()
        elif choice == "2":
            add_expense()
        elif choice == "3":
            balance = get_balance()
            print(f"Your current balance is: ${balance:.2f}")
        elif choice == "4":
            category = input("Please enter the category to filter by, or leave blank for all: ")
            if category == "":
                category = None
            start_date = input("Please enter the start date to filter by (YYYY-MM-DD), or leave blank for all: ")
            if start_date == "":
                start_date = None
            end_date = input("Please enter the end date to filter by (YYYY-MM-DD), or leave blank for all: ")
            if end_date == "":
                end_date = None

            filtered_income = filter_transactions(INCOME_FILE, category, start_date, end_date)
            if filtered_income:
                print("Filtered income:")
                for transaction in filtered_income:
                    print(f"Amount: ${transaction['Amount']}, Category: {transaction['Category']}, Date: {transaction['Date']}")
            else:
                print("No income transactions found.")
        elif choice == "5":
            category = input("Please enter the category to filter by, or leave blank for all: ")
            if category == "":
                category = None
            start_date = input("Please enter the start date to filter by (YYYY-MM-DD), or leave blank for all: ")
            if start_date == "":
                start_date = None
            end_date = input("Please enter the end date to filter by (YYYY-MM-DD), or leave blank for all: ")
            if end_date == "":
                end_date = None

            filtered_expense = filter_transactions(EXPENSE_FILE, category, start_date, end_date)
            if filtered_expense:
                print("Filtered expense:")
                for transaction in filtered_expense:
                    print(f"Amount: ${transaction['Amount']}, Category: {transaction['Category']}, Date: {transaction['Date']}")
            else:
                print("No expense transactions found.")
        elif choice == "6":
            print("Goodbye!")
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()