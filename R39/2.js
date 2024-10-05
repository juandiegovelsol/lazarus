const XLSX = require("xlsx");
const fs = require("fs");
const moment = require("moment");

// Sample account data
const accountData = {
  name: "John Doe",
  document: "123456789",
  accountNumber: "123456789",
  agency: "1234",
};

// Sample transaction data
const transactions = [
  {
    transactionId: "ef372227952d41a7baf1f202afee9a8d",
    accountId: "32400b24-ff3e-4aae-acc8-de0402aa1a78",
    amount: 1000,
    balance_before_transaction: 6000209,
    balance_after_transaction: 6000210,
    type: "credit",
    webhook_url: null,
    createdAt: "2023-02-16T18:44:26.871Z",
    updatedAt: "2023-02-16T18:44:26.871Z",
  },
  {
    transactionId: "ef372227952d41a7baf1f202afee9a8e",
    accountId: "32400b24-ff3e-4aae-acc8-de0402aa1a78",
    amount: 2000,
    balance_before_transaction: 6000210,
    balance_after_transaction: 6000212,
    type: "credit",
    webhook_url: null,
    createdAt: "2023-02-16T18:45:26.871Z",
    updatedAt: "2023-02-16T18:45:26.871Z",
  },
  {
    transactionId: "ef372227952d41a7baf1f202afee9a8f",
    accountId: "32400b24-ff3e-4aae-acc8-de0402aa1a78",
    amount: 3000,
    balance_before_transaction: 6000212,
    balance_after_transaction: 6000215,
    type: "debit",
    webhook_url: null,
    createdAt: "2023-02-17T18:44:26.871Z",
    updatedAt: "2023-02-17T18:44:26.871Z",
  },
  {
    transactionId: "ef372227952d41a7baf1f202afee9a8g",
    accountId: "32400b24-ff3e-4aae-acc8-de0402aa1a78",
    amount: 4000,
    balance_before_transaction: 6000215,
    balance_after_transaction: 6000219,
    type: "credit",
    webhook_url: null,
    createdAt: "2023-02-17T18:45:26.871Z",
    updatedAt: "2023-02-17T18:45:26.871Z",
  },
];

// Function to generate report
function generateReport(transactions, accountData, outputFormat) {
  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([]);

  // Add account data header
  XLSX.utils.sheet_add_aoa(
    ws,
    [
      ["Account Name:", accountData.name],
      ["Document:", accountData.document],
      ["Account Number:", accountData.accountNumber],
      ["Agency:", accountData.agency],
    ],
    { origin: "A1" }
  );

  // Add transaction header
  XLSX.utils.sheet_add_aoa(ws, [["Date", "Type", "Amount", "Balance"]], {
    origin: "A6",
  });

  let row = 7;
  let currentDay = null;
  let balance = 0;

  transactions.forEach((transaction) => {
    const date = moment(transaction.createdAt).format("YYYY-MM-DD");
    if (date !== currentDay) {
      // Add balance row for new day
      XLSX.utils.sheet_add_aoa(
        ws,
        [[`Balance on ${date}:`, (balance / 100).toFixed(2)]],
        { origin: `A${row}` }
      );
      row++;
      currentDay = date;
    }

    // Add transaction row
    XLSX.utils.sheet_add_aoa(
      ws,
      [
        [
          date,
          transaction.type === "credit" ? "In" : "Out",
          (transaction.amount / 100).toFixed(2),
          (transaction.balance_after_transaction / 100).toFixed(2),
        ],
      ],
      { origin: `A${row}` }
    );
    row++;

    balance = transaction.balance_after_transaction;
  });

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, "Transaction Statement");

  if (outputFormat === "xlsx") {
    // Write workbook to XLSX file
    XLSX.writeFile(wb, "transaction_statement.xlsx");
  } else if (outputFormat === "csv") {
    // Convert worksheet to CSV
    const csv = XLSX.utils.sheet_to_csv(ws);

    // Write CSV to file
    fs.writeFileSync("transaction_statement.csv", csv);
  }
}

// Generate reports in both XLSX and CSV formats
generateReport(transactions, accountData, "xlsx");
generateReport(transactions, accountData, "csv");
