// Step.js
import React from 'react';

const Step = ({ step, onEdit, onDelete }) => {
  return (
    <div>
      <h3>{step.title}</h3>
      <p>{step.description}</p>
      <p>{step.metadata}</p>
      <button onClick={() => onEdit(step)}>Edit</button>
      <button onClick={() => onDelete(step)}>Delete</button>
    </div>
  );
};

export default Step;
