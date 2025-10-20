import type { Request, Response } from 'express';
import { expenses } from '../server/server';

export const getAllExpenses = (req : Request, res : Response)=>{
    console.log("got a GET request");
    res.status(200).send(expenses);
};



