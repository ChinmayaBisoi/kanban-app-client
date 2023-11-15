export type Board = {
  createdAt: string;
  description: string;
  isDeleted: boolean;
  isPinned: boolean;
  labels: [string];
  title: string;
  updatedAt: string;
  userEmail: string;
  userId: string;
  __v: number;
  _id: string;
  id: string;
};

export interface Column {
  boardId: string;
  cards: [];
  createdAt: string;
  id: string;
  isDeleted: boolean;
  order: number;
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface Card {
  columnId: string;
  title: string;
  order: number;
  description: string;
  dueDate?: string;
  isDeleted: boolean;
  updatedAt: string;
  __v: number;
  _id: string;
  id: string;
}

export interface BoardDetails {
  columns?: Column[] | [];
  createdAt: string;
  description: string;
  id: string;
  isDeleted: boolean;
  isPinned: boolean;
  labels: string[];
  title: string;
  updatedAt: string;
  userEmail: string;
  userId: string;
  __v: number;
  _id: string;
}
