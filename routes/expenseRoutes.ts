import { Router } from "express";
import { getAllExpenses,addExpense,updatedExpense} from "../controllers/expenseController.ts";

const router = Router();

router.get('/expenses',getAllExpenses);
router.post('/expenses',addExpense);
router.put('/expenses/:id',updatedExpense);



export default router;