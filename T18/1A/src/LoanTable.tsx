import React, { useState } from "react";

interface Payment {
  month: number;
  dueAmount: number;
  payment: number;
}

interface LoanTableProps {
  loanAmount: number;
  interestRate: number;
  term: number;
}

const LoanTable: React.FC<LoanTableProps> = ({
  loanAmount,
  interestRate,
  term,
}) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [remainingBalance, setRemainingBalance] = useState(loanAmount);

  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment =
    (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));

  const initializePayments = () => {
    const initialPayments = Array.from({ length: term }, (_, index) => ({
      month: index + 1,
      dueAmount: monthlyPayment,
      payment: 0,
    }));
    setPayments(initialPayments);
  };

  const handlePaymentChange = (month: number, payment: number) => {
    setPayments((prevPayments) =>
      prevPayments.map((p) => (p.month === month ? { ...p, payment } : p))
    );

    setRemainingBalance((prevBalance) => prevBalance - payment);

    setPayments((prevPayments) =>
      prevPayments.map((p) =>
        p.month > month
          ? {
              ...p,
              dueAmount:
                remainingBalance - payment >= 0
                  ? Math.min(monthlyPayment, remainingBalance - payment)
                  : 0,
            }
          : p
      )
    );
  };

  return (
    <div>
      <button onClick={initializePayments}>Initialize Payments</button>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Due Amount</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.month}>
              <td>{p.month}</td>
              <td>{p.dueAmount.toFixed(2)}</td>
              <td>
                <input
                  type="number"
                  value={p.payment}
                  onChange={(e) =>
                    handlePaymentChange(p.month, Number(e.target.value))
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanTable;
