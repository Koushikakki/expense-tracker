import express from 'express';

const app = express();
app.use(express.json());

interface Expense {
    id: number;
    description: string;
    amount: number;
    category: string;
    date: string; 
}

export let expenses : Expense[] = [
    { id: 1, description: 'Groceries', amount: 85.50, category: 'Food', date: '2025-10-05' },
    { id: 2, description: 'Gas', amount: 45.00, category: 'Transport', date: '2025-10-06' },
  ];

app.listen(3001,()=>{
    console.log("Expense Tracker");
});