import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from "@mui/material";

const data = [
  {
    id: "670247a582fb7e701a09fd00",
    name: "let's see",
    tenure: 120,
    interestRate: 22,
    lastUpdateDate: "2024-10-05T18:00:00.000Z",
    lowerAmount: 10000,
    upperAmount: null,
    institutionRiskProfile: "LOW",
    institution: {
      id: "66f11718fa05e0b2828f5b53",
      name: "ekush-fdr",
      image:
        "https://bini-test-bucket.blr1.digitaloceanspaces.com/fdr-institution/66f11718fa05e0b2828f5b53/image?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=DO00T8KXWCBKJYQPV8XQ%2F20241007%2Fblr1%2Fs3%2Faws4_request&X-Amz-Date=20241007T111954Z&X-Amz-Expires=3600&X-Amz-Signature=edb9e5a4255c95bb2cb353c3b37ec3f61d41a4f956d580b963e7f5bfb956ade8&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D%22image.jpeg%22%3B%20id%3D66f11718fa05e0b2828f5b55&x-id=GetObject",
      tag: "ekush-fdr",
    },
  },
  {
    id: "66fd6753d123d2fec1313fb2",
    name: "test metric",
    tenure: 120,
    interestRate: 50,
    lastUpdateDate: "2024-10-01T18:00:00.000Z",
    lowerAmount: 200000,
    upperAmount: 20000000,
    institutionRiskProfile: "MEDIUM",
    institution: {
      id: "66f11718fa05e0b2828f5b53",
      name: "ekush-fdr",
      image:
        "https://bini-test-bucket.blr1.digitaloceanspaces.com/fdr-institution/66f11718fa05e0b2828f5b53/image?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=DO00T8KXWCBKJYQPV8XQ%2F20241007%2Fblr1%2Fs3%2Faws4_request&X-Amz-Date=20241007T111954Z&X-Amz-Expires=3600&X-Amz-Signature=edb9e5a4255c95bb2cb353c3b37ec3f61d41a4f956d580b963e7f5bfb956ade8&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D%22image.jpeg%22%3B%20id%3D66f11718fa05e0b2828f5b55&x-id=GetObject",
      tag: "ekush-fdr",
    },
  },
  {
    id: "66fbb2d4258d9f9fa99242ea",
    name: "34",
    tenure: 120,
    interestRate: 1,
    lastUpdateDate: "2024-09-30T18:00:00.000Z",
    lowerAmount: 10000,
    upperAmount: null,
    institutionRiskProfile: "MEDIUM",
    institution: {
      id: "66f11718fa05e0b2828f5b53",
      name: "ekush-fdr",
      image:
        "https://bini-test-bucket.blr1.digitaloceanspaces.com/fdr-institution/66f11718fa05e0b2828f5b53/image?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=DO00T8KXWCBKJYQPV8XQ%2F20241007%2Fblr1%2Fs3%2Faws4_request&X-Amz-Date=20241007T111954Z&X-Amz-Expires=3600&X-Amz-Signature=edb9e5a4255c95bb2cb353c3b37ec3f61d41a4f956d580b963e7f5bfb956ade8&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D%22image.jpeg%22%3B%20id%3D66f11718fa05e0b2828f5b55&x-id=GetObject",
      tag: "ekush-fdr",
    },
  },
  {
    id: "66fbb219739e3b71d228af84",
    name: "New FDR Demo",
    tenure: 120,
    interestRate: 3.5,
    lastUpdateDate: "2024-09-30T18:00:00.000Z",
    lowerAmount: 10000,
    upperAmount: 1200000,
    institutionRiskProfile: "LOW",
    institution: {
      id: "66f11718fa05e0b2828f5b53",
      name: "ekush-fdr",
      image:
        "https://bini-test-bucket.blr1.digitaloceanspaces.com/fdr-institution/66f11718fa05e0b2828f5b53/image?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=DO00T8KXWCBKJYQPV8XQ%2F20241007%2Fblr1%2Fs3%2Faws4_request&X-Amz-Date=20241007T111954Z&X-Amz-Expires=3600&X-Amz-Signature=edb9e5a4255c95bb2cb353c3b37ec3f61d41a4f956d580b963e7f5bfb956ade8&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D%22image.jpeg%22%3B%20id%3D66f11718fa05e0b2828f5b55&x-id=GetObject",
      tag: "ekush-fdr",
    },
  },
  {
    id: "66fb7c899855a03c06840f9c",
    name: "ok",
    tenure: 120,
    interestRate: 55,
    lastUpdateDate: "2024-10-01T18:00:00.000Z",
    lowerAmount: 1100000,
    upperAmount: 1300000,
    institutionRiskProfile: "HIGH",
    institution: {
      id: "66f11718fa05e0b2828f5b53",
      name: "ekush-fdr",
      image:
        "https://bini-test-bucket.blr1.digitaloceanspaces.com/fdr-institution/66f11718fa05e0b2828f5b53/image?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=DO00T8KXWCBKJYQPV8XQ%2F20241007%2Fblr1%2Fs3%2Faws4_request&X-Amz-Date=20241007T111954Z&X-Amz-Expires=3600&X-Amz-Signature=edb9e5a4255c95bb2cb353c3b37ec3f61d41a4f956d580b963e7f5bfb956ade8&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D%22image.jpeg%22%3B%20id%3D66f11718fa05e0b2828f5b55&x-id=GetObject",
      tag: "ekush-fdr",
    },
  },
  {
    id: "66fb7c589855a03c06840f80",
    name: "This is test",
    tenure: 365,
    interestRate: 2.5,
    lastUpdateDate: "2024-09-30T18:00:00.000Z",
    lowerAmount: 1100000,
    upperAmount: 1200000,
    institutionRiskProfile: "MEDIUM",
    institution: {
      id: "66f11718fa05e0b2828f5b53",
      name: "ekush-fdr",
      image:
        "https://bini-test-bucket.blr1.digitaloceanspaces.com/fdr-institution/66f11718fa05e0b2828f5b53/image?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=DO00T8KXWCBKJYQPV8XQ%2F20241007%2Fblr1%2Fs3%2Faws4_request&X-Amz-Date=20241007T111954Z&X-Amz-Expires=3600&X-Amz-Signature=edb9e5a4255c95bb2cb353c3b37ec3f61d41a4f956d580b963e7f5bfb956ade8&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D%22image.jpeg%22%3B%20id%3D66f11718fa05e0b2828f5b55&x-id=GetObject",
      tag: "ekush-fdr",
    },
  },
  {
    id: "66fb792a739e3b71d228a905",
    name: "name",
    tenure: 44,
    interestRate: 3,
    lastUpdateDate: "2024-10-02T18:00:00.000Z",
    lowerAmount: 1100000,
    upperAmount: 1200000,
    institutionRiskProfile: "MEDIUM",
    institution: {
      id: "66f11718fa05e0b2828f5b53",
      name: "ekush-fdr",
      image:
        "https://bini-test-bucket.blr1.digitaloceanspaces.com/fdr-institution/66f11718fa05e0b2828f5b53/image?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=DO00T8KXWCBKJYQPV8XQ%2F20241007%2Fblr1%2Fs3%2Faws4_request&X-Amz-Date=20241007T111954Z&X-Amz-Expires=3600&X-Amz-Signature=edb9e5a4255c95bb2cb353c3b37ec3f61d41a4f956d580b963e7f5bfb956ade8&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D%22image.jpeg%22%3B%20id%3D66f11718fa05e0b2828f5b55&x-id=GetObject",
      tag: "ekush-fdr",
    },
  },
];

const FdrTable = () => {
  const [tableData, setTableData] = useState(data);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      if (orderBy === "tenure") {
        return order === "asc" ? a.tenure - b.tenure : b.tenure - a.tenure;
      } else if (orderBy === "depositAmount") {
        return order === "asc"
          ? a.lowerAmount - b.lowerAmount
          : b.lowerAmount - a.lowerAmount;
      } else if (orderBy === "interestRate") {
        return order === "asc"
          ? a.interestRate - b.interestRate
          : b.interestRate - a.interestRate;
      } else if (orderBy === "projectedEarning") {
        const projectedEarningA =
          a.lowerAmount + (a.lowerAmount * a.interestRate) / 100;
        const projectedEarningB =
          b.lowerAmount + (b.lowerAmount * b.interestRate) / 100;
        return order === "asc"
          ? projectedEarningA - projectedEarningB
          : projectedEarningB - projectedEarningA;
      }
      return 0;
    });
    setTableData(sortedData);
  }, [order, orderBy, data]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Fund Name</TableCell>
            <TableCell>AMC</TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "tenure"}
                direction={orderBy === "tenure" ? order : "asc"}
                onClick={() => handleSort("tenure")}
              >
                Tenure
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "depositAmount"}
                direction={orderBy === "depositAmount" ? order : "asc"}
                onClick={() => handleSort("depositAmount")}
              >
                Deposit Amount
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "interestRate"}
                direction={orderBy === "interestRate" ? order : "asc"}
                onClick={() => handleSort("interestRate")}
              >
                Interest Rate
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "projectedEarning"}
                direction={orderBy === "projectedEarning" ? order : "asc"}
                onClick={() => handleSort("projectedEarning")}
              >
                Projected Earning
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.institution.name}</TableCell>
              <TableCell>{row.tenure}</TableCell>
              <TableCell>
                {row.lowerAmount} - {row.upperAmount || "No upper limit"}
              </TableCell>
              <TableCell>{row.interestRate}%</TableCell>
              <TableCell>
                {row.lowerAmount} + {(row.lowerAmount * row.interestRate) / 100}{" "}
                = {row.lowerAmount + (row.lowerAmount * row.interestRate) / 100}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FdrTable;
