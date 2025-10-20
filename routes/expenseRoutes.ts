import { Router } from "express";
import { getAllExpenses,addExpense} from "../controllers/expenseController.ts";

const router = Router();

router.get('/expenses',getAllExpenses);
router.post('/expenses',addExpense);




export default router;