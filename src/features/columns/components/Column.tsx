// src/features/columns/components/Column.tsx
import React, { useState } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Column as ColumnType } from '@/types';
import Card from '@/features/cards/components/Card';
import useBoardStore from '@/stores/useBoardStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ColumnProps {
  column: ColumnType;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  const { updateColumn, deleteColumn, createCard } = useBoardStore();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(column.title);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isAddingCard, setIsAddingCard] = useState(false);
  
  const handleTitleClick = () => {
    setTitleInput(column.title);
    setIsEditingTitle(true);
  };
  
  const handleTitleSave = () => {
    updateColumn(column.id, titleInput);
    setIsEditingTitle(false);
  };
  
  const handleDeleteColumn = () => {
    if (confirm('Are you sure you want to delete this column and all its cards?')) {
      deleteColumn(column.id);
    }
  };
  
  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      createCard(column.id, newCardTitle);
      setNewCardTitle('');
      setIsAddingCard(false);
    }
  };
  
  // Sort cards by order
  const sortedCards = [...column.cards].sort((a, b) => a.order - b.order);
  
  return (
    <div className="shrink-0 w-72 bg-gray-100 rounded-lg flex flex-col max-h-full">
      <div className="p-3 flex justify-between items-center border-b border-gray-200">
        {isEditingTitle ? (
          <div className="flex gap-2 w-full">
            <Input
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              className="w-full"
              autoFocus
            />
            <Button size="sm" onClick={handleTitleSave}>Save</Button>
          </div>
        ) : (
          <>
            <h3 
              className="font-medium text-lg cursor-pointer" 
              onClick={handleTitleClick}
            >
              {column.title}
            </h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleDeleteColumn}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </Button>
          </>
        )}
      </div>
      
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div 
            className="flex-grow p-2 overflow-y-auto"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {sortedCards.map((card, index) => (
              <Draggable key={card.id} draggableId={card.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="mb-2"
                  >
                    <Card card={card} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      
      <div className="p-2 mt-auto">
        {isAddingCard ? (
          <div className="flex flex-col gap-2">
            <Input
              placeholder="Enter card title"
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setIsAddingCard(false)}
              >
                Cancel
              </Button>
              <Button size="sm" onClick={handleAddCard}>Add</Button>
            </div>
          </div>
        ) : (
          <Button 
            variant="ghost" 
            className="w-full text-gray-500 hover:text-gray-700 justify-start"
            onClick={() => setIsAddingCard(true)}
          >
            + Add a card
          </Button>
        )}
      </div>
    </div>
  );
};

export default Column;