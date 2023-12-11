// ReorderList.js
import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemTypes = {
  CARD: 'card',
};

const DraggableItem = ({ id, text, index, moveCard }) => {
  const [, ref] = useDrag({
    type: ItemTypes.CARD,
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveCard(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} style={{ border: '1px solid black', padding: '8px', margin: '4px' }}>
      {text}
    </div>
  );
};

const ReorderList = () => {
  const [cards, setCards] = useState([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
    { id: 4, text: 'Item 4' },
  ]);

  const moveCard = (fromIndex, toIndex) => {
    const updatedCards = [...cards];
    const [movedCard] = updatedCards.splice(fromIndex, 1);
    updatedCards.splice(toIndex, 0, movedCard);
    setCards(updatedCards);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h2>Reorder List</h2>
        {cards.map((card, index) => (
          <DraggableItem key={card.id} index={index} id={card.id} text={card.text} moveCard={moveCard} />
        ))}
      </div>
    </DndProvider>
  );
};

export default ReorderList;
