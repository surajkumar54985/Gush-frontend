// Process.js
import React, { useState } from 'react';
import Step from './Step';

const Process = () => {
  const [steps, setSteps] = useState([]);
  const [newStep, setNewStep] = useState({ title: '', description: '', metadata: '' });
  const [editingStep, setEditingStep] = useState(null);

  const handleCreateStep = () => {
    setSteps([...steps, { ...newStep, id: Date.now() }]);
    setNewStep({ title: '', description: '', metadata: '' });
  };

  const handleEditStep = (step) => {
    setEditingStep(step);
    setNewStep(step);
  };

  const handleUpdateStep = () => {
    const updatedSteps = steps.map((step) =>
      step.id === editingStep.id ? { ...newStep } : step
    );
    setSteps(updatedSteps);
    setEditingStep(null);
    setNewStep({ title: '', description: '', metadata: '' });
  };

  const handleDeleteStep = (step) => {
    const updatedSteps = steps.filter((s) => s.id !== step.id);
    setSteps(updatedSteps);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const startIndex = e.dataTransfer.getData('text/plain');
    const endIndex = steps.length - 1; // You can change this based on your design
    handleReorderSteps(startIndex, endIndex);
  };

  const handleReorderSteps = (startIndex, endIndex) => {
    const reorderedSteps = [...steps];
    const [removed] = reorderedSteps.splice(startIndex, 1);
    reorderedSteps.splice(endIndex, 0, removed);
    setSteps(reorderedSteps);
  };

  return (
    <div>
      <h1>Process Definition</h1>

      {/* Create a new step */}
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newStep.title}
          onChange={(e) => setNewStep({ ...newStep, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newStep.description}
          onChange={(e) => setNewStep({ ...newStep, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Metadata"
          value={newStep.metadata}
          onChange={(e) => setNewStep({ ...newStep, metadata: e.target.value })}
        />
        {editingStep ? (
          <button onClick={handleUpdateStep}>Update Step</button>
        ) : (
          <button onClick={handleCreateStep}>Create Step</button>
        )}
      </div>

      {/* Display existing steps */}
      <div>
        {steps.map((step, index) => (
          <Step
            key={step.id}
            step={step}
            onEdit={handleEditStep}
            onDelete={handleDeleteStep}
          />
        ))}
      </div>

      {/* Drag-and-drop for reordering steps */}
      <div>
        <h2>Reorder Steps</h2>
        <ul>
          {steps.map((step, index) => (
            <li
              key={step.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
            >
              {step.title}
            </li>
          ))}
        </ul>
        <div onDragOver={handleDragOver} onDrop={handleDrop}>
          Drop here to reorder
        </div>
      </div>
    </div>
  );
};

export default Process;
