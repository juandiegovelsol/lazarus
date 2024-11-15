/**
 * Validates a transaction object.
 *
 * @param {object} transaction - The transaction object to validate.
 * @returns {boolean} True if the transaction is valid, false otherwise.
 */
function isValidTransaction(transaction) {
  return (
    typeof transaction === "object" &&
    transaction !== null &&
    typeof transaction.amount === "number" &&
    transaction.amount > 0 &&
    (transaction.type === "credit" || transaction.type === "debit")
  );
}

/**
 * Processes a transaction and updates the summary.
 *
 * @param {object} summary - The summary object to update.
 * @param {object} transaction - The transaction object to process.
 */
function processTransaction(summary, transaction) {
  summary.totalAmount += transaction.amount;

  if (transaction.type === "credit") {
    summary.credits += transaction.amount;
  } else if (transaction.type === "debit") {
    summary.debits += transaction.amount;
  }

  summary.processedTransactions.push({
    id: transaction.id || null,
    type: transaction.type,
    amount: transaction.amount,
  });
}

/**
 * Summarizes a list of transactions.
 *
 * @param {array} transactions - The list of transactions to summarize.
 * @returns {object} The summary object containing total amount, credits, debits, and processed transactions.
 */
function summarizeTransactions(transactions) {
  if (!Array.isArray(transactions)) {
    throw new Error("Expected an array of transaction records.");
  }

  const summary = {
    totalAmount: 0,
    credits: 0,
    debits: 0,
    processedTransactions: [],
  };

  for (const transaction of transactions) {
    if (isValidTransaction(transaction)) {
      processTransaction(summary, transaction);
    }
  }

  summary.processedTransactions.sort((a, b) => b.amount - a.amount);

  return summary;
}

const transactions = [
  { id: "1", amount: 200, type: "credit" },
  { id: "2", amount: 50, type: "debit" },
  { id: "3", amount: -100, type: "debit" }, // Inválida
  { id: "4", amount: 150, type: "credit" },
  { id: "5", amount: 0, type: "debit" }, // Inválida
  { id: "6", amount: 50, type: "transfer" }, // Inválida
];

console.log(summarizeTransactions(transactions));
