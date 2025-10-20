import express from 'express';
import expenseRoutes from '../routes/expenseRoutes.ts';

const app = express();
app.use(express.json());

import admin from 'firebase-admin';

import fs from 'fs';
import path from 'path';

const serviceAccountPath = path.resolve('./expenseTrackerServiceKey.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}


export const db =admin.firestore();

app.use('/',expenseRoutes);

app.listen(3001,()=>{
    console.log("Expense Tracker");
});