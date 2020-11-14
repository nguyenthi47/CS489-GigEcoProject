import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './App.css';

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

function createAttr(key, attribute) {
  return { key, attribute }
}

const rows = [
  createAttr('Working hours (time period)', 'Working Hours'),
  createAttr('Working hours (length)', 'Work Length'),
  createAttr('Salary', 'Salary'),
  createAttr('Day off', 'Holiday'),
  createAttr('Evaluation', 'Evaluation Frequency'),
  createAttr('Direct Supervisor', 'Direct Supervisor'),
  createAttr('Working Options (companies in same sector)', 'Allowed to Work for Competitor')
];


export default function BasicTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Attributes</TableCell>
            <TableCell align="center">Job Listing 1</TableCell>
            <TableCell align="center">Job Listing 2</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.key}>
              <TableCell component="th" scope="row">
                {row.attribute}
              </TableCell>
              <TableCell align="left">{props.pair[0][row.key]}</TableCell>
              <TableCell align="left">{props.pair[1][row.key]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
