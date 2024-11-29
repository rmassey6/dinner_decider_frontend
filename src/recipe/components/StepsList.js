import React from "react";

const StepsList = (props) => {
    return (
        <div className="recipe-steps">
            <h2 className="steps-header">Steps</h2>
            <ol className="steps-list">
                {props.steps.map((step, indx) => {
                    return <li className="step-item" key={indx}>{step}</li>;
                })}
            </ol>
        </div>
    );
};

export default StepsList;
