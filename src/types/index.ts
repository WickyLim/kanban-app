// src/types/index.ts
export interface Board {
  id: string;
  title: string;
  columns: Column[];
}

export interface Column {
  id: string;
  title: string;
  cards: Card[];
  boardId: string;
}

export interface Card {
  id: string;
  title: string;
  description?: string;
  columnId: string;
  order: number;
  labels?: Label[];
}

export interface Label {
  id: string;
  name: string;
  color: string;
}
