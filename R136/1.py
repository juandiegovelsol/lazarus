from datetime import date, datetime
from typing import List


# Custom exception to handle transactions that do not balance
class ImbalancedTransaction(Exception):
    def __init__(self):
        super().__init__("Transaction fails to balance!")


# Represents an item being sold, with buying and selling prices and available quantity
class Item:
    def __init__(self, name: str, buying_price: float, selling_price: float, quantity: int):
        self.name = name
        self.buying_price = buying_price
        self.selling_price = selling_price
        self.quantity = quantity


# Represents an account, with a balance, name, account number, and type (e.g., ASSET, INCOME, EXPENSE)
class Account:
    def __init__(self, balance: float, account_name: str, account_number: str, account_type: str):
        self.balance = balance
        self.account_name = account_name
        self.account_number = account_number
        self.account_type = account_type

    # Debit the account (reduce balance)
    def debit(self, amount: float):
        self.balance -= amount

    # Credit the account (increase balance)
    def credit(self, amount: float):
        self.balance += amount

    # String representation of the account for printing
    def __str__(self):
        return f"{self.account_name}: {self.balance:.2f}"


# Represents an individual part of a transaction, such as a debit or credit to an account
class PartTran:
    '''
    This class stores individual transactions as they happen in each account
    '''

    def __init__(self, amount: float, account: Account, tran_particular: str, tran_type: str):
        self.amount = amount
        self.account = account
        self.tran_particular = tran_particular
        self.tran_type = tran_type


# Represents an atomic transaction, consisting of multiple PartTrans
class TranHeader:
    '''
    This class stores an atomic transaction
    '''

    def __init__(self, tran_date: date, part_trans: List[PartTran]):
        self.date = tran_date
        self.part_trans = part_trans


# Processes and balances transactions
class Transaction:
    '''
    This class processes transactions
    '''

    def __init__(self, tran_header: TranHeader or List[TranHeader]):
        # Initialize the transaction with either a single header or a list of headers
        if isinstance(tran_header, TranHeader):
            self.tran_headers = [tran_header]
        else:
            self.tran_headers = tran_header

    # Processes each transaction by applying debits and credits and ensuring the transaction is balanced
    def process_transaction(self):
        for tran_header in self.tran_headers:
            # Calculate the net effect of the transaction. If the effect is not 0, the transaction is unbalanced
            effect = sum([part_tran.amount if part_tran.tran_type == 'C' else -part_tran.amount for part_tran in
                          tran_header.part_trans])

            if effect != 0:
                raise ImbalancedTransaction

            # Apply credits and debits to the respective accounts
            for part_tran in tran_header.part_trans:
                if part_tran.tran_type == 'C':
                    part_tran.account.credit(part_tran.amount)
                else:
                    part_tran.account.debit(part_tran.amount)


# Point of Sale (POS) system that handles transactions, sales, expenses, and payroll
class POS:
    def __init__(self):
        # Initialize accounts used in the POS system
        self.cash_account = Account(0, "CASH", '001', "ASSET")
        self.sales_revenue_account = Account(0, "SALES REVENUE", '002', 'INCOME')
        self.cash_shortage_account = Account(0, "CASH SHORTAGE", '003', 'LIABILITY')
        self.employee_payable_account = Account(0, "EMPLOYEE PAYABLE", '004', 'EXPENSE')
        self.cost_of_goods_account = Account(0, "COST OF GOODS", '005', 'EXPENSE')
        self.stock_account = Account(0, "STOCK", '006', 'ASSET')
        self.expense_account = Account(0, "EXPENSE", '007', 'EXPENSE')
        self.transactions = []

    # Processes the sale of an item and updates the respective accounts
    def sell_item(self, item: Item, quantity: int):
        # Record cost of goods sold and adjust stock
        part_tran1 = PartTran(item.buying_price * quantity, self.cost_of_goods_account, f"Sale of {item.name}", 'D')
        part_tran2 = PartTran(item.buying_price * quantity, self.stock_account, f"Sale of {item.name}", 'C')

        # Record sales revenue and increase cash
        part_tran3 = PartTran(item.selling_price * quantity, self.sales_revenue_account, f"Sale of {item.name}", 'D')
        part_tran4 = PartTran(item.selling_price * quantity, self.cash_account, f"Sale of {item.name}", 'C')

        # Decrease the stock quantity
        item.quantity -= quantity

        # Create a transaction header and process the transaction
        tran_header = TranHeader(datetime.today(), [part_tran1, part_tran2, part_tran3, part_tran4])
        transaction = Transaction(tran_header)
        transaction.process_transaction()

        # Add the transaction to the list of transactions
        self.transactions.append(tran_header)

    # Handles expenses by recording debits and credits to cash and expense accounts
    def handle_expenses(self, expense_name: str, amount: float):
        part_tran1 = PartTran(amount, self.cash_account, expense_name, "D")
        part_tran2 = PartTran(amount, self.expense_account, expense_name, "C")

        tran_header = TranHeader(datetime.today(), [part_tran1, part_tran2])
        transaction = Transaction(tran_header)
        transaction.process_transaction()
        self.transactions.append(tran_header)

    # Performs the end-of-day check to see if there are any cash shortages
    def perform_end_of_day(self, cash_in_cash_box: float, date: date):
        # Check for any cash shortages
        if cash_in_cash_box < self.cash_account.balance:
            # Ask if the shortage should be recorded for future employee salary deduction
            response = input(
                f"There is a shortage of {abs(cash_in_cash_box - self.cash_account.balance)}. Do you want to add it to shortage for future employee salary deduction? Y/N: ")

            if response == 'Y' or response == 'y':
                # Record the cash shortage as a liability
                part_tran1 = PartTran(abs(cash_in_cash_box - self.cash_account.balance), self.cash_account,
                                      'Recording a shortage', 'D')
                part_tran2 = PartTran(abs(cash_in_cash_box - self.cash_account.balance), self.cash_shortage_account,
                                     'Recording a shortage', 'C')

                tran_header = TranHeader(datetime.today(), [part_tran1, part_tran2])
                transaction = Transaction(tran_header)
                transaction.process_transaction()
                self.transactions.append(tran_header)
                self.perform_end_of_day(cash_in_cash_box, date)  # Recheck the end-of-day balance
            else:
                raise Exception("EOD failed! Please check your accounts and try again.")
        else:
            print("Books of account closed successfully")

    # Pays employees and handles any cash shortages
    def pay_employee(self, amount):
        # If there are any cash shortages, reduce the payment amount
        if self.cash_shortage_account.balance != 0:
            shortage_amount = abs(self.cash_shortage_account.balance)
            net_payment = amount - shortage_amount
        else:
            net_payment = amount

        # Record the payment to the employee and reduce cash
        part_tran1 = PartTran(net_payment, self.cash_account, 'Employee payment', 'D')
        part_tran2 = PartTran(net_payment, self.employee_payable_account, 'Employee payment', 'C')
        tran_header = TranHeader(datetime.today(), [part_tran1, part_tran2])

        # If there are any cash shortages, record them as part of the employee payment
        if self.cash_shortage_account.balance != 0:
            shortage_amount = abs(self.cash_shortage_account.balance)
            part_tran3 = PartTran(shortage_amount, self.employee_payable_account, 'Recovering shortages', 'D')
            part_tran4 = PartTran(shortage_amount, self.cash_shortage_account, 'Recovering shortages', 'C')
            tran_header.part_trans.append(part_tran3)
            tran_header.part_trans.append(part_tran4)

        transaction = Transaction(tran_header)
        transaction.process_transaction()
        self.transactions.append(tran_header)
        print(f"Employee paid amount: {abs(self.employee_payable_account.balance)}")

    # Prints the current status of all accounts
    def print_account_status(self):
        print(self.cash_account)
        print(self.sales_revenue_account)
        print(self.cash_shortage_account)
        print(self.employee_payable_account)
        print(self.cost_of_goods_account)
        print(self.stock_account)
        print(self.expense_account)


# Main function to simulate transactions in the POS system
def main():
    # Create some items to sell
    item1 = Item('Memory Card', 2, 4, 3)
    item2 = Item('Bulb', 2, 5, 20)

    # Create the POS system
    pos = POS()

    # Perform some sales
    pos.sell_item(item1, 1)
    pos.sell_item(item2, 1)

    # Perform end of day check with cash balance
    pos.perform_end_of_day(3, datetime.today())

    # Pay an employee
    pos.pay_employee(30)

    # Print the status of all accounts
    pos.print_account_status()


if __name__ == '__main__':
    main()