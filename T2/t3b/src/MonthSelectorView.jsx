import React from "react";

const MonthSelectorView = ({ selectedMonth, handleMonthSelect, months }) => {
  return (
    <select
      value={selectedMonth}
      onChange={(e) => handleMonthSelect(e.target.value)}
    >
      {months.map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
    </select>
  );
};

export default MonthSelectorView;
