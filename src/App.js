import React, { Component } from 'react';
import './App.css';
import Consent from './Consent.js';
import data from './totalCombinations.json';
import Study from './Study.js';
import { getNRandomItems, demographicsIds, config } from './Data.js';
import Demographics from './Demographics.js';
import firebase from 'firebase';
import Button from 'react-bootstrap/Button';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: data["combinations"],
      currId: 0,
      stages: ["consent", "study", "demographics", "end"],
      time: {
        "init": new Date()
      },
      pairs: this.getRandomPairs(),
      responses: {}
    }

    this.saveTime = this.saveTime.bind(this);
    this.skipStage = this.skipStage.bind(this);
    this.saveResponse = this.saveResponse.bind(this);
    this.checkIfSkip = this.checkIfSkip.bind(this);
    this.checkDemographics = this.checkDemographics.bind(this);
    this.saveToFirebase = this.saveToFirebase.bind(this);
    this.redirectToSurveyCompletion = this.redirectToSurveyCompletion.bind(this);

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
  }
  }

  checkDemographics() {
    var count = 0;
    for (var id in demographicsIds) {
      if (demographicsIds[id] in this.state.responses) {
        count = count + 1;
      }
    }
    return count === demographicsIds.length;
  }

  saveToFirebase() {
    const min = 1;
    const max = 10000;
    const rand = Math.round(min + Math.random() * (max - min));

    var allResponses = this.state.responses;
    const times = this.state.time;
    for (var keyTime in times) {
        allResponses[keyTime] = times[keyTime];
    }

    firebase.database().ref("/" + rand).set(allResponses).catch(error => console.log(error)).then(() => this.redirectToSurveyCompletion());
  }

  redirectToSurveyCompletion() {
    let path = 'https://google.com';
    window.open(path, "_self");
}

  getRandomPairs() {
    var n = 10;
    var pairs = [];
    for (let i = 0; i < n; i++) {
      pairs = [...pairs, getNRandomItems(data["combinations"], 2)];
    }
    return pairs;
  }

  checkIfSkip(varNames) {
    for (var name in varNames) {
      if (!(varNames[name] in this.state.responses)) {
        return false;
      }
    }
    return true;
  }

  saveResponse(question, answer) {
    var tmp = this.state.responses;
    tmp[question] = answer;
    this.setState({responses: tmp});
  }

  saveTime(nameTime) {
    const delta_time = new Date() - this.state.time["init"];
    this.setState({time: {...this.state.time, [nameTime]: delta_time}});
  }

  skipStage() {
    this.saveTime(this.state.stages[this.state.currId] + "End");
    this.setState({currId: this.state.currId + 1});
  }

  render() {
    let stage, content;
    stage = this.state.stages[this.state.currId];
    if (stage === "consent") {
      content = <Consent skipStage={this.skipStage}/>
    } else if (stage === "study") {
      content = <Study skipStage={this.skipStage} pairs={this.state.pairs} saveResponse={this.saveResponse} checkIfSkip={this.checkIfSkip}/>
    } else if (stage === "demographics") {
      content = <Demographics skipStage={this.skipStage} checkDemographics={this.checkDemographics} saveResponse={this.saveResponse}/>
    } else if (stage === "end") {
      content = <div>
      <div className="Title">Thank you for participating in our survey!</div>
      <div className="Subtitle">
          Please be informed that all the job listings in this survey were created for the sake of this study. <br/>
          If you have any questions, feel free to contact us at gcamilo7@gmail.com.
          <hr/>
      </div>
      <div className="QuestionMargin">
          <span className="Title Spotlight RedSpotlight">Click on the button below to complete the survey.</span>
          <div className="QuestionMargin">
              <Button variant="secondary" onClick={this.saveToFirebase}>Complete Survey</Button>
          </div>
      </div>
    </div>; 
    } else {
      content = "Error 404"
    }

    return(
      <div className="App">
        {content}
      </div>
    )
  }
}

export default App;
