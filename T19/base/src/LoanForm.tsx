import React, { useState } from "react";

interface LoanFormProps {
  onSubmit: (loanAmount: number, interestRate: number, term: number) => void;
}

const LoanForm: React.FC<LoanFormProps> = ({ onSubmit }) => {
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [term, setTerm] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(loanAmount, interestRate, term);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Loan Amount:</label>
        <input
          type="number"
          value={loanAmount.toString().replace(/\.0+$/, "")}
          onChange={(e) => setLoanAmount(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Interest Rate (%):</label>
        <input
          type="number"
          value={interestRate.toString().replace(/\.0+$/, "")}
          onChange={(e) => setInterestRate(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Term (Months):</label>
        <input
          type="number"
          value={term.toString().replace(/\.0+$/, "")}
          onChange={(e) => setTerm(Number(e.target.value))}
          required
        />
      </div>
      <button type="submit">Create Loan</button>
    </form>
  );
};

export default LoanForm;
