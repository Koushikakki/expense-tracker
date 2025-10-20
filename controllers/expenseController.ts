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

export const updatedExpense = (req : Request, res : Response)=> {
    console.log("got a put request");
    const id =parseInt(req.params.id);

    const index = expenses.findIndex(task=>task.id===id);
    if(index === -1){
      return res.status(404).send("expense not found");
    }

    const { description, amount, category, date } = req.body;

    const updatedExpense = {
      id,
      description,
      amount:parseFloat(amount),
      category,
      date
    }

    expenses[index] = updatedExpense;

    res.send(updatedExpense);
};


export const deleteExpense = (req : Request, res:Response)=>{

    console.log("got a delete request");

    const id =parseInt(req.params.id);
    const index = expenses.findIndex(task=> task.id===id);

    expenses.splice(index,1);
    res.status(204).send();
};
