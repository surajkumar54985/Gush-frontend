import React, { useState } from 'react';
import '../styles/styles.css';

const ManualProcessInput = ({ onManualProcessed }) => {
  const [manualSteps, setManualSteps] = useState([]);

  const handleAddStep = () => {
    setManualSteps((prevSteps) => [...prevSteps, { title: '', description: '', metadata: '' }]);
  };

  const handleRemoveStep = (index) => {
    setManualSteps((prevSteps) => prevSteps.filter((_, i) => i !== index));
  };

  const handleChangeStep = (index, field, value) => {
    setManualSteps((prevSteps) =>
      prevSteps.map((step, i) => (i === index ? { ...step, [field]: value } : step))
    );
  };

  return (
    <div className="manual-process-input container">
      <h2>Manual Process Input</h2>
      {manualSteps.map((step, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Title"
            value={step.title}
            onChange={(e) => handleChangeStep(index, 'title', e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={step.description}
            onChange={(e) => handleChangeStep(index, 'description', e.target.value)}
          />
          <input
            type="text"
            placeholder="Metadata"
            value={step.metadata}
            onChange={(e) => handleChangeStep(index, 'metadata', e.target.value)}
          />
          <button onClick={() => handleRemoveStep(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddStep}>Add Step</button>
      <button onClick={() => onManualProcessed(manualSteps)}>Process Manually</button>
    </div>
  );
};

export default ManualProcessInput;
