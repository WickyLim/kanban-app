'use client';

import { useParams } from 'next/navigation';
import Board from '@/features/boards/components/Board';

export default function BoardPage() {
  const params = useParams();
  const boardId = params.id as string;
  
  return <Board boardId={boardId} />;
}
