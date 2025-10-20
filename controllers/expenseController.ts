import type { Request, Response } from 'express';
import { db } from '../server/server';
import { error } from 'console';

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

export const deleteExpense = async(req : Request, res:Response)=>{
    const expenseCollection = db.collection('expenses');
    const id =req.params.id;
    const docRef = expenseCollection.doc(id);

    const doc = await docRef.get();
    if(!doc.exists){
        return res.status(404).send({error : "Expense not found"});
    }
    
    await docRef.delete();

    res.status(204).send();
};

export const updatedExpense = async(req : Request, res:Response)=>{
    const expenseCollection = db.collection('expenses');
    const id =req.params.id;
    const docRef = expenseCollection.doc(id);

    
    const doc = await docRef.get();
    if(!doc.exists){
        return res.status(404).send({error : "Expense not found"});
    }

    const { description, amount, category, date } = req.body;

    const updatedExpenseData = {
            description,
            amount:parseFloat(amount),
            category,
            date
        };


    await docRef.set(updatedExpenseData, { merge: true });
    const updatedDoc = await docRef.get();

    res.send({ id: updatedDoc.id, ...updatedDoc.data() });
}


