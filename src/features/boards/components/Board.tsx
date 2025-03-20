// src/features/boards/components/Board.tsx
import React, { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import useBoardStore from '@/stores/useBoardStore';
import Column from '@/features/columns/components/Column';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

interface BoardProps {
  boardId: string;
}

const Board: React.FC<BoardProps> = ({ boardId }) => {
  const { boards, activeBoard, setActiveBoard, updateBoard, createColumn, moveCard } = useBoardStore();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [newColumnTitle, setNewColumnTitle] = useState('');
  
  React.useEffect(() => {
    setActiveBoard(boardId);
  }, [boardId, setActiveBoard]);
  
  if (!activeBoard) {
    return <div>Board not found</div>;
  }
  
  const handleTitleClick = () => {
    setTitleInput(activeBoard.title);
    setIsEditingTitle(true);
  };
  
  const handleTitleSave = () => {
    updateBoard(activeBoard.id, titleInput);
    setIsEditingTitle(false);
  };
  
  const handleAddColumn = () => {
    if (newColumnTitle.trim()) {
      createColumn(activeBoard.id, newColumnTitle);
      setNewColumnTitle('');
    }
  };
  
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    
    // If there's no destination or the item was dropped back where it started
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }
    
    moveCard(
      draggableId,
      source.droppableId,
      destination.droppableId,
      destination.index
    );
  };
  
  return (
    <div className="h-screen flex flex-col">
      <header className="bg-white shadow p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              <Button variant="ghost">← Home</Button>
            </Link>
            
            {isEditingTitle ? (
              <div className="flex gap-2">
                <Input
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  className="max-w-xs"
                  autoFocus
                />
                <Button onClick={handleTitleSave}>Save</Button>
              </div>
            ) : (
              <h1 
                className="text-2xl font-bold cursor-pointer" 
                onClick={handleTitleClick}
              >
                {activeBoard.title}
              </h1>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-grow overflow-x-auto p-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-4 h-full">
            {activeBoard.columns.map((column) => (
              <Column key={column.id} column={column} />
            ))}
            
            <div className="shrink-0 w-72 bg-gray-100 rounded-lg p-3 h-min">
              <div className="flex gap-2">
                <Input
                  placeholder="Add new column"
                  value={newColumnTitle}
                  onChange={(e) => setNewColumnTitle(e.target.value)}
                />
                <Button onClick={handleAddColumn}>Add</Button>
              </div>
            </div>
          </div>
        </DragDropContext>
      </main>
    </div>
  );
};

export default Board;
