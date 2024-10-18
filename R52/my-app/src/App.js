import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function App() {
  const classes = useStyles();

  const data = [
    // your data here
  ];

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Fund Name</TableCell>
            <TableCell>AMC</TableCell>
            <TableCell>Tenure</TableCell>
            <TableCell>Deposit Amount</TableCell>
            <TableCell>Interest Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.institution.name}</TableCell>
              <TableCell>{row.tenure}</TableCell>
              <TableCell>
                {row.lowerAmount} -{" "}
                {row.upperAmount === null ? "No Limit" : row.upperAmount}
              </TableCell>
              <TableCell>{row.interestRate}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default App;
