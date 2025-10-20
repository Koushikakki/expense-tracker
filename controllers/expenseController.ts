import type { Request, Response } from 'express';
import { expenses } from '../server/server';

export const getAllExpenses = (req : Request, res : Response)=>{
    console.log("got a GET request");
    res.status(200).send(expenses);
};

export const addExpense = (req : Request, res: Response) => {
    console.log("got a post request");

    const { description, amount, category, date } = req.body;
    const newExpense = {
        id: (expenses[expenses.length-1].id)+1,
        description: description,
        amount: parseFloat(amount),
        category: category,
        date: date,
    }

    expenses.push(newExpense);
    res.status(201).send(newExpense);
};



