import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function App() {
  const classes = useStyles();

  const data = [
      {
          "id": "670247a582fb7e701a09fd00",
          "name": "let's see",
          "tenure": 120,
          "interestRate": 22,
          "lastUpdateDate": "2024-10-05T18:00:00.000Z",
          "lowerAmount": 10000,
          "upperAmount": null,
          "institutionRiskProfile": "LOW",
          "institution": {
              "id": "66f11718fa05e0b2828f5b53",
              "name": "ekush-fdr",
              "image": "https://bini-test-bucket.blr1.digitaloceanspaces.com/fdr-institution/66f11718fa05e0b2828f5b53/image?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=DO00T8KXWCBKJYQPV8XQ%2F20241007%2Fblr1%2Fs3%2Faws4_request&X-Amz-Date=20241007T111954Z&X-Amz-Expires=3600&X-Amz-Signature=edb9e5a4255c95bb2cb353c3b37ec3f61d41a4f956d580b963e7f5bfb956ade8&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D%22image.jpeg%22%3B%20id%3D66f11718fa05e0b2828f5b55&x-id=GetObject",
              "tag": "ekush-fdr"
          }
      },
      {
          "id": "66fd6753d123d2fec1313fb2",
          "name": "test metric",
          "tenure": 120,
          "interestRate": 50,
          "lastUpdateDate": "2024-10-01T18:00:00.000Z",
          "lowerAmount": 200000,
          "upperAmount": 20000000,
          "institutionRiskProfile": "MEDIUM",
          "institution": {
              "id": "66f11718fa05e0b2828f5b53",
              "name": "ekush-fdr",
              "image": "https://bini-test-bucket.blr1.digitaloceanspaces.com/fdr-institution/66f11718fa05e0b2828f5b53/image?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=DO00T8KXWCBKJYQPV8XQ%2F20241007%2Fblr1%2Fs3%2Faws4_request&X-Amz-Date=20241007T111954Z&X-Amz-Expires=3600&X-Amz-Signature=edb9e5a4255c95bb2cb353c3b37ec3f61d41a4f956d580b963e7f5bfb956ade8&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D%22image.jpeg%22%3B%20id%3D66f11718fa05e0b2828f5b55&x-id=GetObject",
              "tag": "ekush-fdr"
          }
      },
      {
          "id": "66fbb2d4258d9f9fa99242ea",
          "name": "34",
          "tenure": 120,
          "interestRate": 1,
          "lastUpdateDate": "2024-09-30T18:00:00.000Z",
          "lowerAmount": 10000,
          "upperAmount": null,
          "institutionRiskProfile": "MEDIUM",
          "institution": {
              "id": "66f11718fa05e0b2828f5b53",
              "name": "ekush-fdr",
              "image": "https://bini-test-bucket.blr1.digitaloceanspaces.com/fdr-institution/66f11718fa05e0b2828f5b53/image?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=DO00T8KXWCBKJYQPV8XQ%2F20241007%2Fblr1%2Fs3%2Faws4_request&X-Amz-Date=20241007T111954Z&X-Amz-Expires=3600&X-Amz-Signature=edb9e5a4255c95bb2cb353c3b37ec3f61d41a4f956d580b963e7f5bfb956ade8&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D%22image.jpeg%22%3B%20id%3D66f11718fa05e0b2828f5b55&x-id=GetObject",
              "tag": "ekush-fdr"
          }
      },
      {
          "id": "66fbb219739e3b71d228af84",
          "name": "New FDR Demo",
          "tenure": 120,
          "interestRate": 3.5,
          "lastUpdateDate": "2024-09-30T18:00:00.000Z",
          "lowerAmount": 10000,
          "upperAmount": 1200000,
          "institutionRiskProfile": "LOW",
          "institution": {
              "id": "66f11718fa05e0b2828f5b53",
              "name": "ekush-fdr",
              "image": "https://bini-test-bucket.blr1.digitaloceanspaces.com/fdr-institution/66f11718fa05e0b2828f5b53/image?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=DO00T8KXWCBKJYQPV8XQ%2F20241007%2Fblr1%2Fs3%2Faws4_request&X-Amz-Date=20241007T111954Z&X-Amz-Expires=3600&X-Amz-Signature=edb9e5a4255c95bb2cb353c3b37ec3f61d41a4f956d580b963e7f5bfb956ade8&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D%22image.jpeg%22%3B%20id%3D66f11718fa05e0b2828f5b55&x-id=GetObject",
              "tag": "ekush-fdr"
          }
      },
      {
          "id": "66fb7c899855a03c06840f9c",
          "name": "ok",
          "tenure": 120,
          "interestRate": 55,
          "lastUpdateDate": "2024-10-01T18:00:00.000Z",
          "lowerAmount": 1100000,
          "upperAmount": 1300000,
          "institutionRiskProfile": "HIGH",
          "institution": {
              "id": "66f11718fa05e0b2828f5b53",
              "name": "ekush-fdr",
              "image": "https://bini-test-bucket.blr1.digitaloceanspaces.com/fdr-institution/66f11718fa05e0b2828f5b53/image?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=DO00T8KXWCBKJYQPV8XQ%2F20241007%2Fblr1%2Fs3%2Faws4_request&X-Amz-Date=20241007T111954Z&X-Amz-Expires=3600&X-Amz-Signature=edb9e5a4255c95bb2cb353c3b37ec3f61d41a4f956d580b963e7f5bfb956ade8&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D%22image.jpeg%22%3B%20id%3D66f11718fa05e0b2828f5b55&x-id=GetObject",
              "tag": "ekush-fdr"
          }
      },
      {
          "id": "66fb7c589855a03c06840f80",
          "name": "This is test",
          "tenure": 365,
          "interestRate": 2.5,
          "lastUpdateDate": "2024-09-30T18:00:00.000Z",
          "lowerAmount": 1100000,
          "upperAmount": 1200000,
          "institutionRiskProfile": "MEDIUM",
          "institution": {
              "id": "66f11718fa05e0b2828f5b53",
              "name": "ekush-fdr",
              "image": "https://bini-test-bucket.blr1.digitaloceanspaces.com/fdr-institution/66f11718fa05e0b2828f5b53/image?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=DO00T8KXWCBKJYQPV8XQ%2F20241007%2Fblr1%2Fs3%2Faws4_request&X-Amz-Date=20241007T111954Z&X-Amz-Expires=3600&X-Amz-Signature=edb9e5a4255c95bb2cb353c3b37ec3f61d41a4f956d580b963e7f5bfb956ade8&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D%22image.jpeg%22%3B%20id%3D66f11718fa05e0b2828f5b55&x-id=GetObject",
              "tag": "ekush-fdr"
          }
      },
      {
          "id": "66fb792a739e3b71d228a905",
          "name": "name",
          "tenure": 44,
          "interestRate": 3,
          "lastUpdateDate": "2024-10-02T18:00:00.000Z",
          "lowerAmount": 1100000,
          "upperAmount": 1200000,
          "institutionRiskProfile": "MEDIUM",
          "institution": {
              "id": "66f11718fa05e0b2828f5b53",
              "name": "ekush-fdr",
              "image": "https://bini-test-bucket.blr1.digitaloceanspaces.com/fdr-institution/66f11718fa05e0b2828f5b53/image?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=DO00T8KXWCBKJYQPV8XQ%2F20241007%2Fblr1%2Fs3%2Faws4_request&X-Amz-Date=20241007T111954Z&X-Amz-Expires=3600&X-Amz-Signature=edb9e5a4255c95bb2cb353c3b37ec3f61d41a4f956d580b963e7f5bfb956ade8&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D%22image.jpeg%22%3B%20id%3D66f11718fa05e0b2828f5b55&x-id=GetObject",
              "tag": "ekush-fdr"
          }
      }
  
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
                {row.lowerAmount} - {row.upperAmount === null ? 'No Limit' : row.upperAmount}
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