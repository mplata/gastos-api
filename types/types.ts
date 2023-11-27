export interface Spent {
  id: string,
  createdAt: Date,
  concept: string,
  amount: number,
  userId: string,
  category: string,
};

export interface Filters {
  from? : Date,
  to? : Date,
}