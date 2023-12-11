import React, { useState } from 'react';
// import { useDrag, useDrop } from 'react-dnd';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = 'INPUT';

const InputItem = ({ id, value, index, moveItem, removeItem, updateValue }) => {

  const [, drag] = useDrag({
    type: ItemType,
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div className="manual-process-input container">
        <div ref={(node) => drag(drop(node))} style={{ marginBottom: '8px' }}>
            <input
                type="text"
                value={value}
                onChange={(e) => updateValue(id, e.target.value)}
            />
            <button onClick={() => removeItem(id)}>Remove</button>
        </div>
    </div>
  );
};


const InputItem2 = ({ id, value, updateValue }) => {

    // const [, drag] = useDrag({
    //   type: ItemType,
    //   item: { id, index },
    // });
  
    // const [, drop] = useDrop({
    //   accept: ItemType,
    //   hover: (draggedItem) => {
    //     if (draggedItem.index !== index) {
    //       moveItem(draggedItem.index, index);
    //       draggedItem.index = index;
    //     }
    //   },
    // });
  
    return (
      <div className="manual-process-input container">
          <div style={{ marginBottom: '8px' }}>
              <input
                  type="text"
                  value={value}
                  onChange={(e) => updateValue(id, e.target.value)}
              />
              {/* <button onClick={() => removeItem(id)}>Remove</button> */}
          </div>
      </div>
    );
  };


const DynamicInputList = ({onManualProcessed}) => {
    // const [manualSteps, setManualSteps] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [datas, setDatas] = useState();

  const moveItem = (fromIndex, toIndex) => {
    setInputs((prevInputs) => {
      const updatedInputs = [...prevInputs];
      const [movedItem] = updatedInputs.splice(fromIndex, 1);
      updatedInputs.splice(toIndex, 0, movedItem);
      return updatedInputs;
    });
  };

  const handleAddInput = () => {
    setInputs((prevInputs) => [
      ...prevInputs,
      { id: Date.now(), value: '' } // Add a new input field with a unique id
    ]);
  };
  const handleAddData = () => {
    setDatas((prevInputs) => [
      ...prevInputs,
      { id: Date.now(), value: '' } // Add a new input field with a unique id
    ]);
  };

  const handleRemoveInput = (id) => {
    setInputs((prevInputs) => prevInputs.filter((input) => input.id !== id));
  };

  const handleInputChange = (id, value) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) => (input.id === id ? { ...input, value } : input))
    );
  };

//   const handleChangeStep = (index, field, value) => {
//     setManualSteps((prevSteps) =>
//       prevSteps.map((step, i) => (i === index ? { ...step, [field]: value } : step))
//     );
//   };

  return (
    <div className="manual-process-input container">
      <h2>Manual Process Input</h2>
      {/* <button onClick={handleAddInput}>Add Input</button> */}
      <div>
        <input 
        type="text"
        onChange={(e) => setDatas(e.target.value)}
        />
        {/* {datas.map((input) => 
            <InputItem2
            key={input.id}
            id={input.id}
            value={input.value}
            updateValue={handleInputChange}
            />
        )} */}
        
        {inputs.map((input, index) => (
        <InputItem
            key={input.id}
            id={input.id}
            value={input.value}
            index={index}
            moveItem={moveItem}
            removeItem={handleRemoveInput}
            updateValue={handleInputChange}
        />
        ))}
        <button onClick={handleAddInput}>Add Step</button>
        <button onClick={() => onManualProcessed({datas,inputs})}>Process Manually</button>
      </div>
    </div>
  );
};

export default DynamicInputList;
