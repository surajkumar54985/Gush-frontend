import React from 'react';
import ProcessStep from './ProcessStep';
import '../styles/styles.css';

const ProcessList = ({ steps }) => (
  <div className="process-list container">
    <h2>Processed Steps</h2>
    {
        // console.log(JSON.parse(steps.inputs))
    }
    {steps.map((step) => (
      <ProcessStep step={step} />
    ))}
  </div>
);

export default ProcessList;
