import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

const normalise = value => (value) * 100 / 16;

// Example component that utilizes the `normalise` function at the point of render.
function ProgressBar(props) {
  return (
    <React.Fragment>
      <LinearProgress variant="determinate" value={normalise(props.value)} />
    </React.Fragment>
  )
}

export default ProgressBar;