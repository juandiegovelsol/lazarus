// Define an enum for transaction categories
enum TransactionCategory {
    Income = 'Income',
    Food = 'Food',
    Rent = 'Rent',
    Uncategorized = 'Uncategorized',
  }
  
  type Transaction = {
    id: number;
    description: string;
    amount: number;
    category: TransactionCategory;
  };
  
  class PersonalFinanceManager {
    private transactions: Transaction[] = [];
    private budgets: { [key: string]: number } = {};
    private storageKey: string = 'userTransactions';
  
    constructor() {
      this.loadTransactions();
    }
  
    // Load transactions from local storage
    loadTransactions(): void {
      const data = localStorage.getItem(this.storageKey);
      if (data) {
        const storedTransactions: any[] = JSON.parse(data);
        this.transactions = storedTransactions.map((txn) => ({
          ...txn,
          category: Object.values(TransactionCategory).includes(txn.category)
            ? txn.category
            : TransactionCategory.Uncategorized,
        }));
      }
    }
  
    // Add a new transaction
    async addTransaction(transaction: Transaction): Promise<void> {
      this.transactions.push(transaction);
      // Simulate an asynchronous save operation
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            this.saveTransactions();
            resolve();
          } catch (error) {
            reject(error);
          }
        }, 1000);
      });
    }
  
    // Set budget for a category
    setBudget(category: string, amount: number): void {
      this.budgets[category] = amount;
    }
  
    // Check if budgets are exceeded and notify user
    checkBudgets(): void {
      const spending = this.transactions.reduce((acc, txn) => {
        // Only consider expenses (negative amounts)
        if (txn.amount < 0) {
          acc[txn.category] = (acc[txn.category] || 0) + Math.abs(txn.amount);
        }
        return acc;
      }, {} as { [key: string]: number });
  
      for (const category in this.budgets) {
        if (spending[category] > this.budgets[category]) {
          alert(`Budget exceeded for category: ${category}`);
        }
      }
    }
  
    // Save transactions to local storage (encrypted)
    async saveTransactions(): Promise<void> {
      // Generate a key for encryption
      const key = await crypto.subtle.generateKey(
        {
          name: 'AES-GCM',
          length: 256,
        },
        true,
        ['encrypt', 'decrypt']
      );
  
      // Encrypt the transaction data
      const encryptedData = await crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv: new Uint8Array(12), // Initialize vector
        },
        key,
        new TextEncoder().encode(JSON.stringify(this.transactions))
      );
  
      // Save the encrypted data to local storage
      localStorage.setItem(this.storageKey, JSON.stringify(new Uint8Array(encryptedData)));
    }
  }
  
  // Example Usage
  async function main() {
    const financeManager = new PersonalFinanceManager();
  
    // Adding transactions
    await financeManager.addTransaction({
      id: 1,
      description: 'Salary',
      amount: 5000,
      category: TransactionCategory.Income,
    });
  
    await financeManager.addTransaction({
      id: 2,
      description: 'Groceries',
      amount: -150,
      category: TransactionCategory.Food,
    });
  
    // Setting a budget
    financeManager.setBudget(TransactionCategory.Food, 500);
  
    // Checking budgets
    financeManager.checkBudgets();
  }
  
  main();