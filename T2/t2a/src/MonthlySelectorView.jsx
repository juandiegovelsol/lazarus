import React from "react";

const MonthlySelectorView = ({ months, selectedMonth, handleMonthChange }) => {
  return (
    <select value={selectedMonth} onChange={handleMonthChange}>
      {months.map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
    </select>
  );
};

export default MonthlySelectorView;
