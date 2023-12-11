import React from 'react';
import '../styles/styles.css';

const ProcessStep = ({ step }) => (
  <div className="process-step">
    <h3>{step.title}</h3>
    <p>{step.description}</p>
  </div>
);

export default ProcessStep;
