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

    let dueAmount = loanAmount;
    const monthlyPayment = calculateMonthlyPayment(loanAmount, term);

    for (let i = 0; i < term; i++) {
      const monthlyInterest = dueAmount * monthlyRate;
      const capitalPayment = monthlyPayment - monthlyInterest;

      initialPayments.push({
        month: i + 1,
        monthlyFee: monthlyPayment,
        dueAmount,
        monthlyInterest,
        capitalPayment,
        payment: 0,
      });

      dueAmount -= capitalPayment;
    }

    setPayments(initialPayments);
  };

  useEffect(() => {
    initializePayments();
  }, []);

  const updatePayment = (payment: Payment, newPayment: number) => {
    const updatedPayment = { ...payment };
    updatedPayment.payment = newPayment;
    return updatedPayment;
  };

  const calculateNewMonthlyFee = (remainingBalance: number, term: number) => {
    return (
      (remainingBalance * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term))
    );
  };

  const handlePaymentChange = (month: number, payment: number) => {
    setPayments((prevPayments) => {
      const updatedPayments = [...prevPayments];

      const currentPaymentIndex = month - 1;
      const currentPayment = updatedPayments[currentPaymentIndex];

      const updatedCurrentPayment = updatePayment(currentPayment, payment);
      updatedPayments[currentPaymentIndex] = updatedCurrentPayment;

      let remainingBalance =
        month === 1
          ? loanAmount
          : updatedPayments[currentPaymentIndex - 1].dueAmount;
      const actualCapitalPayment =
        updatedCurrentPayment.capitalPayment + payment;

      remainingBalance -= actualCapitalPayment;
      updatedCurrentPayment.dueAmount = remainingBalance;

      const newMonthlyFee = calculateNewMonthlyFee(
        remainingBalance,
        updatedPayments.length - month
      );

      for (let i = currentPaymentIndex + 1; i < updatedPayments.length; i++) {
        const previousPayment = updatedPayments[i - 1];
        const updatedPayment = { ...updatedPayments[i] };

        updatedPayment.monthlyFee = newMonthlyFee;
        updatedPayment.monthlyInterest =
          previousPayment.dueAmount * monthlyRate;
        updatedPayment.capitalPayment =
          newMonthlyFee - updatedPayment.monthlyInterest;
        updatedPayment.dueAmount =
          previousPayment.dueAmount - updatedPayment.capitalPayment;

        updatedPayments[i] = updatedPayment;
      }

      return updatedPayments;
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
