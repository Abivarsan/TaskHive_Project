// src/BudgetTable.js
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import { Margin } from '@mui/icons-material';
import "./Styles/BudgettableStyles.css";

const Budgettable = ({ budgetData }) => {
  
  return (
    <TableContainer component={Paper}>
                {budgetData.map((item, index) => (
            <React.Fragment key={index}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table" id="budgetTable">
        <TableHead>
          <TableRow>
            <TableCell align="left" colSpan={3}>
            <b > Project Name: {item.projectName}</b>
            </TableCell>
            <TableCell align="left">Date: {moment(item.date).format('YYYY-MM-DD')}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Expense</b></TableCell>
            <TableCell colSpan={5}><b>Amount</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

              <TableRow>
                <TableCell>Selection Process Cost</TableCell>
                <TableCell align="left" colSpan={5}>{item.selectionprocessCost}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>License Cost</TableCell>
                <TableCell align="left" colSpan={5}>{item.licenseCost}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Server Cost</TableCell>
                <TableCell align="left" colSpan={5}>{item.serversCost}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Hardware Cost</TableCell>
                <TableCell align="left" colSpan={5}>{item.hardwareCost}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Connection Cost</TableCell>
                <TableCell align="left" colSpan={5}>{item.connectionCost}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Developer Cost</TableCell>
                <TableCell align="left" colSpan={5}>{item.developerCost}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Other Expenses</TableCell>
                <TableCell align="left" colSpan={5}>{item.otherExpenses}</TableCell>
              </TableRow>
              <hr />
              <TableRow>
                <TableCell><b>Total Cost</b></TableCell>
                <TableCell align="left" colSpan={6}>{item.totalCost}</TableCell>
              </TableRow>
        </TableBody>
      </Table>
      </React.Fragment>
                ))}
    </TableContainer>
  );
};

export default Budgettable;
