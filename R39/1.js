const XLSX = require("xlsx");
const fs = require("fs");
const { createReadStream, createWriteStream } = require("fs");
const { join } = require("path");

// Sample account data
const accountData = {
  name: "John Doe",
  document: "123456789",
  accountNumber: "123456",
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
    createdAt: new Date("2023-02-16T18:44:26.871Z"),
    updatedAt: new Date("2023-02-16T18:44:26.871Z"),
  },
  {
    transactionId: "ef372227952d41a7baf1f202afee9a8e",
    accountId: "32400b24-ff3e-4aae-acc8-de0402aa1a78",
    amount: 500,
    balance_before_transaction: 6000210,
    balance_after_transaction: 6000215,
    type: "credit",
    webhook_url: null,
    createdAt: new Date("2023-02-16T18:45:26.871Z"),
    updatedAt: new Date("2023-02-16T18:45:26.871Z"),
  },
  {
    transactionId: "ef372227952d41a7baf1f202afee9a8f",
    accountId: "32400b24-ff3e-4aae-acc8-de0402aa1a78",
    amount: 2000,
    balance_before_transaction: 6000215,
    balance_after_transaction: 6000235,
    type: "debit",
    webhook_url: null,
    createdAt: new Date("2023-02-17T18:44:26.871Z"),
    updatedAt: new Date("2023-02-17T18:44:26.871Z"),
  },
  {
    transactionId: "ef372227952d41a7baf1f202afee9a8g",
    accountId: "32400b24-ff3e-4aae-acc8-de0402aa1a78",
    amount: 1000,
    balance_before_transaction: 6000235,
    balance_after_transaction: 6000245,
    type: "credit",
    webhook_url: null,
    createdAt: new Date("2023-02-17T18:45:26.871Z"),
    updatedAt: new Date("2023-02-17T18:45:26.871Z"),
  },
];

// Function to generate report
function generateReport(transactions, accountData, outputFormat) {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([
    ["Account Name", accountData.name],
    ["Document", accountData.document],
    ["Account Number", accountData.accountNumber],
    ["Agency", accountData.agency],
    [],
    ["Date", "Type", "Amount", "Balance"],
  ]);

  let currentDay = null;
  let row = 6;

  transactions.forEach((transaction) => {
    const date = transaction.createdAt;
    const day = date.toISOString().split("T")[0];

    if (day !== currentDay) {
      currentDay = day;
      XLSX.utils.sheet_add_aoa(
        ws,
        [[`Balance on ${day}:`, transaction.balance_before_transaction / 100]],
        {
          origin: `A${row}`,
        }
      );
      row++;
    }

    XLSX.utils.sheet_add_aoa(
      ws,
      [
        [
          date.toISOString(),
          transaction.type,
          transaction.amount / 100,
          transaction.balance_after_transaction / 100,
        ],
      ],
      { origin: `A${row}` }
    );
    row++;
  });

  XLSX.utils.book_append_sheet(wb, ws, "Transaction Report");

  if (outputFormat === "xlsx") {
    const outputFile = "transaction_report.xlsx";
    XLSX.writeFile(wb, outputFile);
    console.log(`Report generated as ${outputFile}`);
  } else if (outputFormat === "csv") {
    const outputFile = "transaction_report.csv";
    const csv = XLSX.utils.sheet_to_csv(ws);
    fs.writeFileSync(outputFile, csv);
    console.log(`Report generated as ${outputFile}`);
  }
}

// Generate report in XLSX format
generateReport(transactions, accountData, "xlsx");

// Generate report in CSV format
generateReport(transactions, accountData, "csv");
