import React from 'react';
import './App.css';
import LikertScale from './LikertScale';
import Button from 'react-bootstrap/Button';
import Table from './Table.js';

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

    updateProgress() {
        var count = 0;
        var bar = document.getElementById('ProgressBar');
        count = count + 100 / 16;
        bar.style.width = count + '%';
    }

    render() {
        let content;
        content = 
            <div>
                <div className="Subtitle" style={{marginBottom: "10px"}}>
                    Please read the following job listings for professional drivers below.
                </div>
                <div className="BigText" style={{marginTop: "10px"}}>
                    We would like to know your opinion about both of them and which one you would prefer to take if you were given the chance to choose.
                </div>
                <hr/>
                <div>
                    <div>
                        <Table pair={this.props.pairs[this.state.idx]}/>
                    </div>
                </div>
                <hr/>
                <div>
                    <div>
                        <div className="QuestionMargin Question">
                            To what extent would you be willing to accept <span className="underline">job listing 1</span>?
                        </div>
                        <LikertScale
                            n={5}
                            currId={this.state.idx}
                            saveResponse={this.props.saveResponse}
                            question={"j" + this.state.idx + "-1"}
                            multipleText={true}
                            answers={["Not willing at all", "Not really willing", "Undecided", "Somewhat willing", "Willing"]}
                        />
                    </div>

                    <div>
                        <div className="QuestionMargin Question">
                            To what extent would you be willing to accept <span className="underline">job listing 2</span>?
                        </div>
                        <LikertScale
                            n={5}
                            currId={this.state.idx}
                            saveResponse={this.props.saveResponse}
                            question={"j" + this.state.idx + "-2"}
                            multipleText={true}
                            answers={["Not willing at all", "Not really willing", "Undecided", "Somewhat willing", "Willing"]}
                        />
                    </div>


                    <div>
                        <div className="QuestionMargin Question">
                            Which one of the two job listings above do you prefer?
                        </div>
                        <LikertScale
                            n={2}
                            currId={this.state.idx}
                            saveResponse={this.props.saveResponse}
                            question={"choice" + this.state.idx}
                            multipleText={true}
                            answers={["Job Listing 1", "Job Listing 2"]}
                        />
                    </div>
                    
                </div>
                <hr style={{marginTop: "30px"}}/>
                <div style={{textAlign: "right"}}>
                <Button variant="secondary" onClick={ this.nextScenario}>Next</Button>
                    <div style={{display: (this.state.attCheck) ? "none" : "block", textAlign: "left"}}>{this.state.idx + 1}/16</div>
            </div>
        <div id="ProgressCase">
            <div id="ProgressBar"></div>
        </div>
            </div>
        return(
            <div>
                {content}
            </div>
        );
    }

}

export default Study;