// src/features/cards/components/Card.tsx
import React, { useState } from 'react';
import { Card as CardType } from '@/types';
import useBoardStore from '@/stores/useBoardStore';
import { Card as UICard, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CardProps {
  card: CardType;
}

const Card: React.FC<CardProps> = ({ card }) => {
  const { updateCard, deleteCard } = useBoardStore();
  const [isEditing, setIsEditing] = useState(false);
  const [titleInput, setTitleInput] = useState(card.title);
  const [descriptionInput, setDescriptionInput] = useState(card.description || '');
  
  const handleSave = () => {
    updateCard(card.id, {
      title: titleInput,
      description: descriptionInput,
    });
    setIsEditing(false);
  };
  
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this card?')) {
      deleteCard(card.id);
    }
  };
  
  if (isEditing) {
    return (
      <UICard className="bg-white shadow-sm">
        <CardContent className="p-3">
          <div className="flex flex-col gap-2">
            <Input
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              placeholder="Card title"
              className="w-full"
              autoFocus
            />
            <Input
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
              placeholder="Description (optional)"
              className="w-full"
            />
            <div className="flex justify-end gap-2 mt-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>Save</Button>
            </div>
          </div>
        </CardContent>
      </UICard>
    );
  }
  
  return (
    <UICard 
      className="bg-white shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => setIsEditing(true)}
    >
      <CardHeader className="p-3 pb-0">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{card.title}</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          >
            ×
          </Button>
        </div>
      </CardHeader>
      {card.description && (
        <CardContent className="p-3 pt-2">
          <p className="text-sm text-gray-600">{card.description}</p>
        </CardContent>
      )}
    </UICard>
  );
};

export default Card;
