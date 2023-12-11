import React, { useState } from 'react';
import AIAssistedInput from './component/AIAssistedInput';
import ManualProcessInput from './component/ManualProcessInput';
import ProcessList from './component/ProcessList';
import ReorderList from './component/ReorderList';
import Process from './component/Process';
import DynamicInputField from './component/DynamicInputField';
import { saveStepsToDatabase } from './services/apiService';
import './styles/styles.css';
import DynamicInputList from './component/DynamicInputField';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
  const [processedSteps, setProcessedSteps] = useState([]);

  const handleAIProcessed = (aiSteps) => {
    setProcessedSteps(aiSteps);
  };

  const handleManualProcessed = async (manualSteps) => {
    try {
      await saveStepsToDatabase(manualSteps);
      setProcessedSteps(manualSteps);
      console.log(`processedSteps`+processedSteps);
    } catch (error) {
      console.error('Error saving steps:', error.message);
    }
  };

  return (
    <div>
      <AIAssistedInput onAIProcessed={handleAIProcessed} />
      <DndProvider backend={HTML5Backend}>
        <div>
          <DynamicInputList onManualProcessed={handleManualProcessed}/>
        </div>
      </DndProvider>
    </div>
  );
};

export default App;
