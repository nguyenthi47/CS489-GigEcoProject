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
      idx: 0
    }

    this.nextScenario = this.nextScenario.bind(this);
  }

  nextScenario() {
    var checkList = ["choice" + this.state.idx, "j" + this.state.idx + "-2", "j" + this.state.idx + "-1"];
    if (this.props.checkIfSkip(checkList)) {
      if (this.state.idx === 15) {
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
    return (
      <React.Fragment>
        <CssBaseline />
        {/* Hero unit */}
        <Container maxWidth="sm" component="main" className={classes.instruction}>
          <Typography component="h1" variant="h5" color="textPrimary" gutterBottom>
            Instruction
          </Typography>
          <Typography variant="body1"  color="textSecondary" component="p">
            Please read the following job listings for professional drivers below.
            We would like to know your opinion about both of them and which one you would prefer to take if you were given the chance to choose.
          </Typography>
        </Container>
        {/* End hero unit */}
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            {this.props.pairs[this.state.idx].map((jobSpecs, jobIdx) => (
              <Grid item key={jobIdx} sm={12} md={6}>
                <JobCard 
                  jobIdx = {jobIdx}
                  title = {"Job Listing " + (jobIdx + 1)}
                  saveResponse = {this.props.saveResponse}
                  question = {"j" + this.state.idx + "-1"}
                  jobSpecs = {jobSpecs}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
        <hr style={{marginTop: "30px"}}/>
          <div style={{textAlign: "right"}}>
              <Button variant="secondary" onClick={this.nextScenario}>Next</Button>
              <div style={{display: (this.state.attCheck) ? "none" : "block", textAlign: "left"}}>{this.state.idx + 1}/16</div>
          </div>
      </React.Fragment>
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
