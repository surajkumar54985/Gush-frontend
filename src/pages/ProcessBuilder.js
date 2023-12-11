import React, { useState } from 'react';
import AiAssistedInput from '../component/AIAssistedInput';
import ManualInput from '../component/ManualInput';

function ProcessCreation() {
  const [processSteps, setProcessSteps] = useState([]);

  const handleAiAssistedSubmit = (generatedSteps) => {
    setProcessSteps(generatedSteps);
  };

  const handleManualSubmit = (manualSteps) => {
    setProcessSteps(manualSteps);
  };

  return (
    <div>
      <h2>Create a Process</h2>
      <AiAssistedInput onSubmit={handleAiAssistedSubmit} />
      <ManualInput onSubmit={handleManualSubmit} />
      <div>
        <h3>Final Process Steps</h3>
        <ul>
          {processSteps.map((step, index) => (
            <li key={index}>{step.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProcessCreation;
