import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import './App.css';

const labels = {
  1: 'Not willing at all',
  2: 'Not really willing',
  3: 'Undecided',
  4: 'Somewhat willing',
  5: 'Willing',
};

const styles = theme => ({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});

class RateJob extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: null,
      hover: -1
    }
  }

  handleChange(e, newValue) {
    this.setState({value: newValue});
    this.props.saveResponse(this.props.question, labels[newValue]);
  }

  render() {
  const {classes} = this.props;
  return (
    <div className={classes.root}>
      <Rating
        name="hover-feedback"
        value={this.state.value}
        precision={1}
        onChange={this.handleChange}
        onChangeActive={(event, newHover) => {
          this.setState({hover: newHover});
        }}
      />
      {this.state.value !== null && <Box>{labels[this.state.hover !== -1 ? this.state.hover : this.state.value]}</Box>}
    </div>
  );
  }
}

export default withStyles(styles) (RateJob);
