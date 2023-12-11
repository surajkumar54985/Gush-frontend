import React, { useState } from 'react';
import { getAIProcessedSteps } from '../services/aiService';
import '../styles/styles.css';

const AIAssistedInput = ({ onAIProcessed }) => {
  const [userInput, setUserInput] = useState('');

  const handleAIProcess = async () => {
    try {
      const aiSteps = await getAIProcessedSteps(userInput);
      onAIProcessed(aiSteps);
    } catch (error) {
      console.error('AI processing error:', error.message);
    }
  };

  return (
    <div className="ai-assisted-input container">
      <h2>AI-Assisted Process Creation</h2>
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Describe your process..."
      />
      <button onClick={handleAIProcess}>Process with AI</button>
    </div>
  );
};

export default AIAssistedInput;
