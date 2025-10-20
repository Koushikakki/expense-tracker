import type { Request, Response } from 'express';
import { db } from '../server/server';

export const getAllExpenses = async (req :Request,res:Response) =>{
    
    const expenseCollection = db.collection('expenses');
    const users = await expenseCollection.get();

    const expenses = users.docs.map(doc=>({
        id : doc.id, ...doc.data()
    }));

    res.status(200).send(expenses);
};

export const addExpense = async (req :Request,res:Response)=>{
    const expenseCollection = db.collection('expenses');
    const { description, amount, category, date } = req.body;


    const newExpense = {
        description: description,
        amount: parseFloat(amount),
        category: category,
        date: date,
    }

    const addRef = await expenseCollection.add(newExpense);
    res.status(201).send({ id:addRef.id, ...newExpense});
};



