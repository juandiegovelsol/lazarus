import React, { useState } from "react";
import LoanForm from "./LoanForm";
import LoanTable from "./LoanTable";

const App: React.FC = () => {
  const [loanDetails, setLoanDetails] = useState<{
    loanAmount: number;
    interestRate: number;
    term: number;
  } | null>(null);

  const handleFormSubmit = (
    loanAmount: number,
    interestRate: number,
    term: number
  ) => {
    setLoanDetails({ loanAmount, interestRate, term });
  };

  return (
    <div className="App">
      <h1>Loan Manager</h1>
      <LoanForm onSubmit={handleFormSubmit} />
      {loanDetails && (
        <LoanTable
          loanAmount={loanDetails.loanAmount}
          interestRate={loanDetails.interestRate}
          term={loanDetails.term}
        />
      )}
    </div>
  );
};

export default App;
