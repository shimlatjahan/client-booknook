export type Book = {
  _id: string;

  title: string;
  author: string;
  category: string;
  image: string;
  description: string;

  totalCopies: number;
  availableCopies: number;

  addedBy?: {
    id?: string;
    name?: string;
    email?: string;
  };

  addedAt?: string;
};