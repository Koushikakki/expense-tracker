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


