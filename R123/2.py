import csv
import datetime
from typing import List, Dict

# Define the CSV file name
CSV_FILE_NAME = "financial_transactions.csv"

def add_transaction(transaction_type: str) -> None:
    """
    Adds a new transaction to the CSV file.

    Args:
        transaction_type (str): Type of transaction (income or expense).
    """
    amount = float(input(f"Enter the {transaction_type} amount: $"))
    category = input(f"Enter the {transaction_type} category: ")
    date = input(f"Enter the {transaction_type} date (YYYY-MM-DD): ")

    # Validate date format
    try:
        datetime.datetime.strptime(date, "%Y-%m-%d")
    except ValueError:
        print("Invalid date format. Please use YYYY-MM-DD.")
        return

    # Append the transaction to the CSV file
    with open(CSV_FILE_NAME, "a", newline="") as file:
        writer = csv.writer(file)
        # Check if the file is empty
        if file.tell() == 0:
            writer.writerow(["Type", "Amount", "Category", "Date"])
        writer.writerow([transaction_type.capitalize(), amount, category, date])

    print(f"{transaction_type.capitalize()} transaction added successfully!")

def query_balance() -> None:
    """
    Calculates and prints the current balance.
    """
    try:
        with open(CSV_FILE_NAME, "r") as file:
            reader = csv.DictReader(file)
            income = sum(float(row["Amount"]) for row in reader if row["Type"] == "Income")
            # Reset the file pointer to the beginning
            file.seek(0)
            reader = csv.DictReader(file)
            expense = sum(float(row["Amount"]) for row in reader if row["Type"] == "Expense")
            balance = income - expense
            print(f"Your current balance is: ${balance:.2f}")
    except FileNotFoundError:
        print("No transactions found. Please add some transactions first.")

def filter_transactions() -> None:
    """
    Filters transactions by category and date range.
    """
    try:
        with open(CSV_FILE_NAME, "r") as file:
            reader = csv.DictReader(file)
            rows = [row for row in reader]

        category = input("Enter the category to filter by (leave blank for all categories): ")
        start_date = input("Enter the start date (YYYY-MM-DD): ")
        end_date = input("Enter the end date (YYYY-MM-DD): ")

        # Validate date format
        try:
            datetime.datetime.strptime(start_date, "%Y-%m-%d")
            datetime.datetime.strptime(end_date, "%Y-%m-%d")
        except ValueError:
            print("Invalid date format. Please use YYYY-MM-DD.")
            return

        filtered_rows: List[Dict[str, str]] = []
        for row in rows:
            if (not category or row["Category"] == category) and start_date <= row["Date"] <= end_date:
                filtered_rows.append(row)

        if not filtered_rows:
            print("No transactions found matching the filter criteria.")
        else:
            print("Filtered Transactions:")
            for row in filtered_rows:
                print(f"Type: {row['Type']}, Amount: ${row['Amount']}, Category: {row['Category']}, Date: {row['Date']}")

    except FileNotFoundError:
        print("No transactions found. Please add some transactions first.")

def main() -> None:
    """
    The main function that runs the application.
    """
    print("Welcome to your personal finance tracker!")

    while True:
        print("\nMenu:")
        print("1. Add Income")
        print("2. Add Expense")
        print("3. Query Balance")
        print("4. Filter Transactions")
        print("5. Quit")

        choice = input("Enter your choice: ")

        if choice == "1":
            add_transaction("income")
        elif choice == "2":
            add_transaction("expense")
        elif choice == "3":
            query_balance()
        elif choice == "4":
            filter_transactions()
        elif choice == "5":
            print("Goodbye!")
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()