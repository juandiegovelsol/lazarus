import React, { useState, useEffect } from "react";

interface Payment {
  month: number;
  monthlyFee: number;
  dueAmount: number;
  monthlyInterest: number;
  capitalPayment: number;
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

  const monthlyRate = interestRate / 100;
  const monthlyPayment =
    (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));

  const initializePayments = () => {
    const initialPayments = Array.from({ length: term }, (_, index) => ({
      month: index + 1,
      monthlyFee: monthlyPayment,
      dueAmount: loanAmount - (monthlyPayment - loanAmount * monthlyRate),
      monthlyInterest: loanAmount * monthlyRate,
      capitalPayment: monthlyPayment - loanAmount * monthlyRate,
      payment: 0,
    }));

    for (let i = 0; i < initialPayments.length; i++) {
      if (i !== 0) {
        initialPayments[i].monthlyInterest =
          initialPayments[i - 1].dueAmount * monthlyRate;
        initialPayments[i].capitalPayment =
          initialPayments[i].monthlyFee - initialPayments[i].monthlyInterest;
        initialPayments[i].dueAmount =
          initialPayments[i - 1].dueAmount -
          initialPayments[i].capitalPayment -
          initialPayments[i].payment;
      }
    }

    setPayments(initialPayments);
  };

  useEffect(() => {
    initializePayments();
  }, []);

  const handlePaymentChange = (month: number, payment: number) => {
    setPayments((prevPayments) => {
      const newPayments = [...prevPayments];
      newPayments[month - 1].payment = payment;
      let remainingBalance =
        month === 1 ? loanAmount : newPayments[month - 2].dueAmount;

      remainingBalance -= payment + newPayments[month - 1].capitalPayment;
      newPayments[month - 1].dueAmount = remainingBalance;

      const newMonthlyFee =
        (remainingBalance * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, month - newPayments.length));

      for (let i = month; i < newPayments.length; i++) {
        newPayments[i].monthlyInterest =
          newPayments[i - 1].dueAmount * monthlyRate;
        newPayments[i].monthlyFee = newMonthlyFee;
        newPayments[i].capitalPayment =
          newPayments[i].monthlyFee - newPayments[i].monthlyInterest;
        newPayments[i].dueAmount =
          newPayments[i - 1].dueAmount - newPayments[i].capitalPayment;
      }

      return newPayments;
    });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Monthly Fee</th>
            <th>Monthly Interest</th>
            <th>Capital Payment</th>
            <th>Due Amount</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.month}>
              <td>{p.month}</td>
              <td>{p.monthlyFee > 0 ? p.monthlyFee.toFixed(2) : "0.00"}</td>
              <td>
                {p.monthlyInterest > 0 ? p.monthlyInterest.toFixed(2) : "0.00"}
              </td>
              <td>
                {p.capitalPayment > 0 ? p.capitalPayment.toFixed(2) : "0.00"}
              </td>
              <td>{p.dueAmount > 0 ? p.dueAmount.toFixed(2) : "0.00"}</td>
              <td>
                <input
                  type="number"
                  value={p.payment.toString().replace(/\.0+$/, "")}
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
