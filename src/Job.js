import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import RateJob from './Rate.js'
import Divider from '@material-ui/core/Divider';
import CardHeader from '@material-ui/core/CardHeader';

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
}));

const rows = [
  {idx: "Working hours (time period)", label: "Working Hours"},
  {idx: "Working hours (length)", label: "Work Length"},
  {idx: "Salary", label: "Salary"},
  {idx: "Day off", label: "Holiday"},
  {idx: "Evaluation", label: "Evaluation Frequency"},
  {idx: "Direct Supervisor", label: "Direct Supervisor"},
  {idx: "Working Options (companies in same sector)", label: "Allowed to Work for Competitor"}

];

export default function JobCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card>
      <CardHeader
        title={props.title}
        titleTypographyProps={{ align: 'center' }}
        subheaderTypographyProps={{ align: 'center' }}
        action={null}
        className={classes.cardHeader}
      />
      <CardContent>
        <ul>
          {rows.map((row, rowIdx) => (
            <Typography component="li" variant="subtitle1" align="center" key={rowIdx}>
              {row.label + ": " + props.jobSpecs[row.idx]}
            </Typography>
          ))}
        </ul>
        <Divider />
            <Typography component="p" variant="body1" align="left">
                To what extent would you be willing to accept this job listing?
            </Typography>
        <div>
          <RateJob 
            saveResponse = {props.saveResponse}
            question = {props.question}
          />
        </div>
      </CardContent>
    </Card>
  );
}
