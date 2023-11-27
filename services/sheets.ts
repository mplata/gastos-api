import client from "./supabase";
import { Filters, Spent } from "../types/types";

const uuid = require('uuid');

async function saveExpense(spent: Partial<Spent>) {
  const {
    amount,
    category,
    concept,
  } = spent;

  const row = [
    {
      amount,
      created_at: new Date(),
      category,
      concept,
      user_id: '53e0c6a0-4ed8-43b5-9249-6241d0a63c22',
    },
  ];
  const { statusText } = await client.from('expenses')
    .insert(row)
    .select();
  return statusText;
}

async function getExpenses(filters: Filters): Promise<Spent[] | undefined> {

  const expensesClient = client
    .from('expenses')
    .select('*');
  const { from, to } = filters;
  
  if ( from ) {
    expensesClient.gte('created_at', new Date(from).toISOString());
  }
  if ( to ) {
    expensesClient.lt('created_at', new Date(to).toISOString());
  }
  const { data, error } = await expensesClient;
  console.log(data);

  if (error) {
    console.error('Error en query', error);
    throw new Error(error.message);
  }
  return data?.map((row) => {
    return {
      id: row['id'],
      createdAt: row['created_at'],
      concept: row['concept'],
      userId: row['user_id'],
      amount: row['amount'],
      category: row['category'],
    }
  });
}

export {
  getExpenses,
  saveExpense,
}