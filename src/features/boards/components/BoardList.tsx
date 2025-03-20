'use client';

// src/features/boards/components/BoardList.tsx
import React from 'react';
import { useRouter } from 'next/navigation';
import useBoardStore from '@/stores/useBoardStore';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const BoardList: React.FC = () => {
  const router = useRouter();
  const { boards, createBoard, setActiveBoard } = useBoardStore();
  
  const handleCreateBoard = () => {
    createBoard(`New Board ${boards.length + 1}`);
  };
  
  const handleSelectBoard = (boardId: string) => {
    setActiveBoard(boardId);
    router.push(`/board/${boardId}`);
  };
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Boards</h1>
        <Button onClick={handleCreateBoard}>Create Board</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {boards.map((board) => (
          <Card 
            key={board.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleSelectBoard(board.id)}
          >
            <CardHeader>
              <CardTitle>{board.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {board.columns.length} columns | 
                {board.columns.reduce((acc, column) => acc + column.cards.length, 0)} cards
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BoardList;

