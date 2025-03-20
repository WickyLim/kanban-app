import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Board, Card, Column } from '@/types';

interface BoardState {
  boards: Board[];
  activeBoard: Board | null;
  setActiveBoard: (boardId: string) => void;
  createBoard: (title: string) => void;
  updateBoard: (boardId: string, title: string) => void;
  deleteBoard: (boardId: string) => void;
  
  createColumn: (boardId: string, title: string) => void;
  updateColumn: (columnId: string, title: string) => void;
  deleteColumn: (columnId: string) => void;
  
  createCard: (columnId: string, title: string, description?: string) => void;
  updateCard: (cardId: string, data: Partial<Card>) => void;
  deleteCard: (cardId: string) => void;
  moveCard: (cardId: string, sourceColumnId: string, destinationColumnId: string, newOrder: number) => void;
}

// Initialize with sample data
const initialBoards: Board[] = [
  {
    id: uuidv4(),
    title: 'My First Board',
    columns: [
      {
        id: uuidv4(),
        title: 'To Do',
        cards: [
          {
            id: uuidv4(),
            title: 'Learn React',
            description: 'Study React fundamentals',
            columnId: '',
            order: 0,
          },
        ],
        boardId: '',
      },
      {
        id: uuidv4(),
        title: 'In Progress',
        cards: [],
        boardId: '',
      },
      {
        id: uuidv4(),
        title: 'Done',
        cards: [],
        boardId: '',
      }
    ],
  },
];

// Fix references
initialBoards.forEach(board => {
  board.columns.forEach(column => {
    column.boardId = board.id;
    column.cards.forEach(card => {
      card.columnId = column.id;
    });
  });
});

const useBoardStore = create<BoardState>((set, get) => ({
  boards: initialBoards,
  activeBoard: initialBoards[0],
  
  setActiveBoard: (boardId) => {
    const board = get().boards.find(board => board.id === boardId) || null;
    set({ activeBoard: board });
  },
  
  createBoard: (title) => {
    const newBoard: Board = {
      id: uuidv4(),
      title,
      columns: [
        {
          id: uuidv4(),
          title: 'To Do',
          cards: [],
          boardId: '',
        },
        {
          id: uuidv4(),
          title: 'In Progress',
          cards: [],
          boardId: '',
        },
        {
          id: uuidv4(),
          title: 'Done',
          cards: [],
          boardId: '',
        },
      ],
    };
    
    // Update references
    newBoard.columns.forEach(column => {
      column.boardId = newBoard.id;
    });
    
    set(state => ({ 
      boards: [...state.boards, newBoard],
      activeBoard: newBoard,
    }));
  },
  
  updateBoard: (boardId, title) => {
    set(state => ({
      boards: state.boards.map(board => 
        board.id === boardId ? { ...board, title } : board
      ),
      activeBoard: state.activeBoard?.id === boardId 
        ? { ...state.activeBoard, title } 
        : state.activeBoard
    }));
  },
  
  deleteBoard: (boardId) => {
    set(state => {
      const filteredBoards = state.boards.filter(board => board.id !== boardId);
      return {
        boards: filteredBoards,
        // If the active board was deleted, set a new active board
        activeBoard: state.activeBoard?.id === boardId 
          ? filteredBoards[0] || null 
          : state.activeBoard
      };
    });
  },
  
  createColumn: (boardId, title) => {
    const newColumn: Column = {
      id: uuidv4(),
      title,
      cards: [],
      boardId,
    };
    
    set(state => {
      const updatedBoards = state.boards.map(board => 
        board.id === boardId 
          ? { ...board, columns: [...board.columns, newColumn] } 
          : board
      );
      
      return {
        boards: updatedBoards,
        activeBoard: state.activeBoard?.id === boardId 
          ? updatedBoards.find(board => board.id === boardId) || state.activeBoard 
          : state.activeBoard
      };
    });
  },
  
  updateColumn: (columnId, title) => {
    set(state => {
      const updatedBoards = state.boards.map(board => ({
        ...board,
        columns: board.columns.map(column => 
          column.id === columnId ? { ...column, title } : column
        )
      }));
      
      // Update active board if needed
      const activeBoard = state.activeBoard 
        ? updatedBoards.find(board => board.id === state.activeBoard?.id) || state.activeBoard
        : null;
      
      return { boards: updatedBoards, activeBoard };
    });
  },
  
  deleteColumn: (columnId) => {
    set(state => {
      const updatedBoards = state.boards.map(board => ({
        ...board,
        columns: board.columns.filter(column => column.id !== columnId)
      }));
      
      // Update active board if needed
      const activeBoard = state.activeBoard 
        ? updatedBoards.find(board => board.id === state.activeBoard?.id) || state.activeBoard
        : null;
      
      return { boards: updatedBoards, activeBoard };
    });
  },
  
  createCard: (columnId, title, description = '') => {
    const newCard: Card = {
      id: uuidv4(),
      title,
      description,
      columnId,
      order: 0, // Will be updated below
    };
    
    set(state => {
      const updatedBoards = state.boards.map(board => {
        const updatedColumns = board.columns.map(column => {
          if (column.id === columnId) {
            // Set correct order for the new card
            newCard.order = column.cards.length;
            return {
              ...column,
              cards: [...column.cards, newCard]
            };
          }
          return column;
        });
        
        return {
          ...board,
          columns: updatedColumns,
        };
      });
      
      // Update active board if needed
      const activeBoard = state.activeBoard 
        ? updatedBoards.find(board => board.id === state.activeBoard?.id) || state.activeBoard
        : null;
      
      return { boards: updatedBoards, activeBoard };
    });
  },
  
  updateCard: (cardId, data) => {
    set(state => {
      const updatedBoards = state.boards.map(board => ({
        ...board,
        columns: board.columns.map(column => ({
          ...column,
          cards: column.cards.map(card => 
            card.id === cardId ? { ...card, ...data } : card
          )
        }))
      }));
      
      // Update active board if needed
      const activeBoard = state.activeBoard 
        ? updatedBoards.find(board => board.id === state.activeBoard?.id) || state.activeBoard
        : null;
      
      return { boards: updatedBoards, activeBoard };
    });
  },
  
  deleteCard: (cardId) => {
    set(state => {
      const updatedBoards = state.boards.map(board => ({
        ...board,
        columns: board.columns.map(column => ({
          ...column,
          cards: column.cards.filter(card => card.id !== cardId)
        }))
      }));
      
      // Update active board if needed
      const activeBoard = state.activeBoard 
        ? updatedBoards.find(board => board.id === state.activeBoard?.id) || state.activeBoard
        : null;
      
      return { boards: updatedBoards, activeBoard };
    });
  },
  
  moveCard: (cardId, sourceColumnId, destinationColumnId, newOrder) => {
    set(state => {
      // Find the card to move
      let cardToMove: Card | null = null;
      let updatedBoards = state.boards.map(board => {
        const updatedColumns = board.columns.map(column => {
          if (column.id === sourceColumnId) {
            const cardIndex = column.cards.findIndex(card => card.id === cardId);
            if (cardIndex !== -1) {
              cardToMove = { ...column.cards[cardIndex], columnId: destinationColumnId };
              return {
                ...column,
                cards: column.cards.filter(card => card.id !== cardId)
              };
            }
          }
          return column;
        });
        
        return {
          ...board,
          columns: updatedColumns,
        };
      });
      
      // If card was found, add it to the destination column
      if (cardToMove) {
        updatedBoards = updatedBoards.map(board => {
          const updatedColumns = board.columns.map(column => {
            if (column.id === destinationColumnId) {
              // Insert card at the right position
              const newCards = [...column.cards];
              cardToMove!.order = newOrder;
              newCards.splice(newOrder, 0, cardToMove!);
              
              // Update orders for all cards
              const reorderedCards = newCards.map((card, index) => ({
                ...card,
                order: index
              }));
              
              return {
                ...column,
                cards: reorderedCards
              };
            }
            return column;
          });
          
          return {
            ...board,
            columns: updatedColumns,
          };
        });
      }
      
      // Update active board if needed
      const activeBoard = state.activeBoard 
        ? updatedBoards.find(board => board.id === state.activeBoard?.id) || state.activeBoard
        : null;
      
      return { boards: updatedBoards, activeBoard };
    });
  },
}));

export default useBoardStore;
