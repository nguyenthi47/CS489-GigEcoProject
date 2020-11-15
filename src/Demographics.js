import React, { Component } from 'react';
import './App.css';
import LikertScale from './LikertScale';
import { demographics } from './Data.js';
import Button from 'react-bootstrap/Button';

class Demographics extends Component {
    constructor(props) {
        super(props);

        this.skipStage = this.skipStage.bind(this);

    }

    skipStage() {
        if(!this.props.checkDemographics()) {
            alert("Please answer all questions.");
        } else {
            this.props.skipStage();
        }

    }

    render() {
        return (
            <div>
                <div className="Subtitle">
                    Please, answer the demographic questions below.
                </div>
                <hr/>
                <div>
                    {demographics.map((group, groupIdx) => (
                        <div key={"group" + groupIdx}>
                        {
                            group.questions.map((question, qIdx) => (
                                <div className="QuestionMargin" key={"dem" + groupIdx + qIdx}>
                                    <div key={"dem" + groupIdx + qIdx} className="Question">
                                        {question.text}
                                    </div>
                                    <LikertScale 
                                        key={question.id}
                                        n={question.options.length} 
                                        currId={question.id}
                                        saveResponse={this.props.saveResponse}
                                        question={question.id}
                                        multipleText={true}
                                        answers={question.options}
                                        //vertical={group.id === "experience" && question.id !== "court"}
                                        demographics={true}/>
                                </div>
                            ))
                        }
                        <hr/>
                        </div>
                    ))}
                </div>
                <div style={{textAlign: "right"}}>
                    <Button variant="secondary" onClick={this.skipStage}>Next</Button>
                </div>
            </div>
        );
    }
}

export default Demographics;