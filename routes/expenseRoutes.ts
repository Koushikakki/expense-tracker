import { Router } from "express";
import { getAllExpenses,addExpense,updatedExpense, deleteExpense} from "../controllers/expenseController.ts";

const router = Router();

router.get('/expenses',getAllExpenses);
router.post('/expenses',addExpense);
router.put('/expenses/:id',updatedExpense);
router.delete('/expenses/:id',deleteExpense);


export default router;