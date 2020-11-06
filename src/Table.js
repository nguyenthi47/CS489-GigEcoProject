import React from 'react';
import './App.css';

class Table extends React.Component{
    render() {
        let content;
        const cols = [
            {idx: "Working hours (time period)", label: "Working Hours"},
            {idx: "Working hours (length)", label: "Work Length"},
            {idx: "Salary", label: "Salary"},
            {idx: "Day off", label: "Holiday"},
            {idx: "Evaluation", label: "Evaluation Frequency"},
            {idx: "Direct Supervisor", label: "Direct Supervisor"},
            {idx: "Working Options (companies in same sector)", label: "Allowed to Work for Competitor"}

        ];
        content = 
            <div style={{marginTop: "20px", marginBottom: "20px"}}>
                <table className="tableCol center">
                    <thead>
                        <tr>
                            <td/>
                            <td className="tableLeftCol">Job Listing 1</td>
                            <td className="tableLeftCol">Job Listing 2</td>
                        </tr>
                    </thead>
                    <tbody>
                        {(cols.map((row, rowIdx) => (
                            <tr key={rowIdx}>
                                <td className="tableLeftCol">
                                    {row.label}
                                </td>
                                <td className="tableInfo">
                                    {this.props.pair[0][row.idx]}
                                </td>
                                <td>
                                    {this.props.pair[1][row.idx]}
                                </td>
                            </tr>
                        )))
                    } 
                    </tbody>
                </table>
            </div>;
        return(
            <div>
                {content}
            </div>
        )
    }
}

export default Table;