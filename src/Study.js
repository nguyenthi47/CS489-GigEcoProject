import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import LikertScale from './LikertScale';
import JobCard from './Job';
import ProgressBar from './ProgressBar';

const styles = theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  instruction: {
    padding: theme.spacing(8, 0, 6),
  },
  choice: {
    padding: theme.spacing(3, 0, 6),
    textAlign: "center"
  },
  cardHeader: {
    backgroundColor:
    theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardStudy: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
});

class Study extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      idx: -1,
      choice: null
    }

    this.nextScenario = this.nextScenario.bind(this);
  }

  saveResponse(q, v) {
    this.props.saveResponse(q, v);
    this.setState({choice: v});
  }

  nextScenario() {
    if (this.state.idx === -1) {
      this.props.saveTime("introEnd")
      this.setState({
        idx: this.state.idx + 1
      })
      return;
    }

    var checkList = ["choice" + this.state.idx, "j" + this.state.idx + "-2", "j" + this.state.idx + "-1"];
    if (this.props.checkIfSkip(checkList)) {
      if (this.state.idx === 9) {
        this.props.skipStage();
      } else {
        this.props.saveTime("scenario" +  this.state.idx + "end")
        this.setState({
          idx: this.state.idx + 1
        })
      }
    } else {
      alert("Please answer all questions.");
    }

  }
  
  render() {
    const { classes } = this.props;
    let content;
    if (this.state.idx === -1) {
      content = <React.Fragment>
      <CssBaseline />
      {/* Hero unit */}
      <Container maxWidth="md" component="main" className={classes.instruction}>
        <Typography component="h1" variant="h5" color="textPrimary" gutterBottom>
          Instructions
        </Typography>
        <Typography component="h1" variant="h6" color="textSecondary" gutterBottom>
          We will present you various job listings and we would like to know what you think about them.
          <br/>
          Each listing will be composed of various attributes. Please read the information below about them.
        </Typography>
        <hr/>
        <Typography variant="subtitle1"  color="textSecondary" component="div">
          <b>Working hours (time period)</b>: from when to when you would have to work (e.g., 9am-5pm, totally flexible).
          <br/>
          <b>Working hours (length)</b>: the minimum numbers of hours you would have to work (e.g., minimum 8 hours).
          <br/>
          <b>Salary</b>: how your salary would be calculated (e.g., base salary + hourly salary).
          <br/>
          <b>Holiday</b>: the job's holiday policy (e.g., paid, but with restrictions).
          <br/>
          <b>Evaluation Frequency</b>: how frequently you would be evaluated by your supervisor (e.g., yearly, daily).
          <br/>
          <b>Direct Supervisor</b>: whether you would have a direct supervisor, and if the supervisor would be a human or an algorithm (e.g., yes, no, an algorithm).
          <br/>
          <b>Allowed to Work for Competitor</b>: whether you would be allowed to work for a competitor (e.g., yes).
        </Typography>
      </Container>
        <div style={{textAlign: "right"}}>
          <hr style={{marginTop: "10px"}}/>
          <Button variant="contained" onClick={this.nextScenario}>Next</Button>
        </div>
      </React.Fragment>
    } else {
      content = <React.Fragment>
      <CssBaseline />
      {/* Hero unit */}
      <Container maxWidth="md" component="main" className={classes.instruction}>
        <Typography component="h1" variant="h5" color="textPrimary" gutterBottom>
          Instructions
        </Typography>
        <Typography variant="body1"  color="textSecondary" component="p">
          Please read the following job listings for professional drivers below. <br/>
          We would like to know your opinion about both of them and which one you would prefer to take if you were given the chance.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems = "flex">
          {this.props.pairs[this.state.idx].map((jobSpecs, jobIdx) => (
            <Grid item key={jobIdx} sm={12} md={6} style={{display: 'flex'}}>
              <JobCard 
                jobIdx = {jobIdx}
                qIdx = {this.state.idx}
                title = {"Job Listing " + (jobIdx + 1)}
                saveResponse = {this.props.saveResponse}
                question = {"j" + this.state.idx + "-" + (jobIdx + 1)}
                jobSpecs = {jobSpecs}
                checkJobEval = {this.props.checkJobEval}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="sm" component="main" className={classes.choice}>
        <Typography component="h1" variant="h6" color="textPrimary" gutterBottom>
          Which one of the two job listings above do you prefer? 
        </Typography>
        <Typography variant="body1"  color="textSecondary" component="p">
          <Button variant="contained"
          color={(this.props.checkChoice("choice" + this.state.idx) === 1)? "primary": "default"}
          onClick={() => this.saveResponse("choice" + this.state.idx, 1)}>Job Listing 1</Button>
          <span style={{padding: "25px"}}></span>
          <Button variant="contained" 
          color={(this.props.checkChoice("choice" + this.state.idx) === 2)? "primary": "default"}
          onClick={() => this.saveResponse("choice" + this.state.idx, 2)}
          >Job Listing 2</Button>
        </Typography>
      </Container>
      <div style={{textAlign: "right"}}>
        <hr style={{marginTop: "10px"}}/>
        <Button variant="contained" onClick={this.nextScenario}>Next</Button>
        <br/>
        <br/>
        <div style={{display: (this.state.attCheck) ? "none" : "block", textAlign: "left"}}>{this.state.idx + 1}/10</div>
        <div> <ProgressBar value= {this.state.idx + 1}/> </div>
      </div>
    </React.Fragment>
    }
    return (
      content
    );
  }
}

export default withStyles(styles) (Study);

// import React from 'react';
// import './App.css';
// import LikertScale from './LikertScale';
// import Button from 'react-bootstrap/Button';
// import Table from './Table.js';
// 
// class Study extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             idx: 0
//         }
// 
//         this.nextScenario = this.nextScenario.bind(this);
//     }
// 
//     nextScenario() {
//         var checkList = ["choice" + this.state.idx, "j" + this.state.idx + "-2", "j" + this.state.idx + "-1"];
//         if (this.props.checkIfSkip(checkList)) {
//             if (this.state.idx === 15) {
//                 this.props.skipStage();
//             } else {
//                 this.props.saveTime("scenario" +  this.state.idx + "end")
//                 this.setState({
//                     idx: this.state.idx + 1
//                 })
//             }
//         } else {
//             alert("Please answer all questions.");
//         }
// 
//     }
// 
//     render() {
//         let content;
//         content = 
//             <div>
//                 <div className="Subtitle" style={{marginBottom: "10px"}}>
//                     Please read the following job listings for professional drivers below.
//                 </div>
//                 <div className="BigText" style={{marginTop: "10px"}}>
//                     We would like to know your opinion about both of them and which one you would prefer to take if you were given the chance to choose.
//                 </div>
//                 <hr/>
//                 <div>
//                     <div>
//                         <Table pair={this.props.pairs[this.state.idx]}/>
//                     </div>
//                 </div>
//                 <hr/>
//                 <div>
//                     <div>
//                         <div className="QuestionMargin Question">
//                             To what extent would you be willing to accept <span className="underline">job listing 1</span>?
//                         </div>
//                         <LikertScale
//                             n={5}
//                             currId={this.state.idx}
//                             saveResponse={this.props.saveResponse}
//                             question={"j" + this.state.idx + "-1"}
//                             multipleText={true}
//                             answers={["Not willing at all", "Not really willing", "Undecided", "Somewhat willing", "Willing"]}
//                         />
//                     </div>
// 
//                     <div>
//                         <div className="QuestionMargin Question">
//                             To what extent would you be willing to accept <span className="underline">job listing 2</span>?
//                         </div>
//                         <LikertScale
//                             n={5}
//                             currId={this.state.idx}
//                             saveResponse={this.props.saveResponse}
//                             question={"j" + this.state.idx + "-2"}
//                             multipleText={true}
//                             answers={["Not willing at all", "Not really willing", "Undecided", "Somewhat willing", "Willing"]}
//                         />
//                     </div>
// 
// 
//                     <div>
//                         <div className="QuestionMargin Question">
//                             Which one of the two job listings above do you prefer?
//                         </div>
//                         <LikertScale
//                             n={2}
//                             currId={this.state.idx}
//                             saveResponse={this.props.saveResponse}
//                             question={"choice" + this.state.idx}
//                             multipleText={true}
//                             answers={["Job Listing 1", "Job Listing 2"]}
//                         />
//                     </div>
//                     
//                 </div>
//                 <hr style={{marginTop: "30px"}}/>
//                 <div style={{textAlign: "right"}}>
//                     <Button variant="secondary" onClick={this.nextScenario}>Next</Button>
//                     <div style={{display: (this.state.attCheck) ? "none" : "block", textAlign: "left"}}>{this.state.idx + 1}/16</div>
//                 </div>
//             </div>
//         return(
  //             <div>
//                 {content}
//             </div>
//         );
//     }
// 
// }
  // 
