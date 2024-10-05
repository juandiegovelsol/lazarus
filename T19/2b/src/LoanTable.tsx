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

  const calculateMonthlyPayment = (amount: number, term: number) => {
    return (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
  };

  const initializePayments = () => {
    const initialPayments: Payment[] = [];

    let remainingBalance = loanAmount;
    const monthlyPayment = calculateMonthlyPayment(loanAmount, term);

    for (let i = 0; i < term; i++) {
      const monthlyInterest = remainingBalance * monthlyRate;
      const capitalPayment = monthlyPayment - monthlyInterest;

      initialPayments.push({
        month: i + 1,
        monthlyFee: monthlyPayment,
        dueAmount: remainingBalance - capitalPayment,
        monthlyInterest,
        capitalPayment,
        payment: 0,
      });

      remainingBalance -= capitalPayment;
    }

    setPayments(initialPayments);
  };

  const updatePayment = (payment: Payment, additionalPayment: number) => {
    const updatedPayment = { ...payment };

    updatedPayment.payment = additionalPayment;

    return updatedPayment;
  };

  const updateSubsequentPayments = (
    payments: Payment[],
    index: number,
    newMonthlyFee: number
  ) => {
    const updatedPayments = [...payments];

    for (let i = index; i < updatedPayments.length; i++) {
      const previousPayment = updatedPayments[i - 1];

      const monthlyInterest = previousPayment.dueAmount * monthlyRate;
      const capitalPayment = newMonthlyFee - monthlyInterest;

      updatedPayments[i] = {
        ...updatedPayments[i],
        monthlyFee: newMonthlyFee,
        monthlyInterest,
        capitalPayment,
        dueAmount: previousPayment.dueAmount - capitalPayment,
      };
    }

    return updatedPayments;
  };

  const handlePaymentChange = (month: number, payment: number) => {
    setPayments((prevPayments) => {
      const updatedPayments = [...prevPayments];

      const index = month - 1;
      const currentPayment = updatedPayments[index];

      const updatedCurrentPayment = updatePayment(currentPayment, payment);

      const actualCapitalPayment =
        updatedCurrentPayment.capitalPayment + payment;
      const remainingBalance =
        index === 0 ? loanAmount : updatedPayments[index - 1].dueAmount;

      updatedCurrentPayment.dueAmount = remainingBalance - actualCapitalPayment;

      updatedPayments[index] = updatedCurrentPayment;

      const newMonthlyFee = calculateMonthlyPayment(
        updatedCurrentPayment.dueAmount,
        updatedPayments.length - index
      );

      return updateSubsequentPayments(
        updatedPayments,
        index + 1,
        newMonthlyFee
      );
    });
  };

  useEffect(() => {
    initializePayments();
  }, []);

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
          {payments.map((payment) => (
            <tr key={payment.month}>
              <td>{payment.month}</td>
              <td>
                {payment.monthlyFee > 0
                  ? payment.monthlyFee.toFixed(2)
                  : "0.00"}
              </td>
              <td>
                {payment.monthlyInterest > 0
                  ? payment.monthlyInterest.toFixed(2)
                  : "0.00"}
              </td>
              <td>
                {payment.capitalPayment > 0
                  ? payment.capitalPayment.toFixed(2)
                  : "0.00"}
              </td>
              <td>
                {payment.dueAmount > 0 ? payment.dueAmount.toFixed(2) : "0.00"}
              </td>
              <td>
                <input
                  type="number"
                  value={payment.payment.toString().replace(/\.0+$/, "")}
                  onChange={(e) =>
                    handlePaymentChange(payment.month, Number(e.target.value))
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
