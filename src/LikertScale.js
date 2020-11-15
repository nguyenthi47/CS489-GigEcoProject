import React, { Component } from 'react';
import './App.css';

class LikertScale extends Component{
    render() {
        const items = [];
        for (let i = 0; i < this.props.n; i++) {
            items.push(i);
        }
        return (
            <div className="LikertScale"
                style={(!this.props.demographics) ? {textAlign: "left", marginLeft: "10px"} : {}}>
                {!this.props.multipleText ? <span style={{display: "inline-block"}} className="Text">{this.props.leftText}</span> : <span></span>}
                {items.map((option, opIdx) => (
                    <div key={opIdx} style={{display: (this.props.multipleText && !this.props.vertical) ? "inline-block" : "inline", margin: "0px 5px 0px 5px",
                    "textAlign": "center"}}>
                        <input key={this.props.question + opIdx} 
                        type="radio" 
                        className="scalePoint"
                        id={this.props.question + opIdx}
                        name={this.props.question} 
                        onClick={() => this.props.saveResponse(this.props.question, !this.props.multipleText ? opIdx : this.props.answers[opIdx])}
                        style={{"marginBottom": "0px", "marginTop": "2px"}}/>
                        {(this.props.multipleText) ? 
                        <label style={{"display": "block","marginLeft": "5px", "marginTop": "0px",
                         "marginBottom": "0px", "marginRight": "5px",
                          "textAlign": (this.props.vertical) ? "left" : "center"}}>{this.props.answers[opIdx]}</label> :
                        <span></span>}
                    </div>
                ))}
                {!this.props.multipleText ? <span style={{display: "inline-block"}} className="Text">{this.props.rightText}</span> : <span></span>}
            </div>
        );
    }
}

export default LikertScale;
