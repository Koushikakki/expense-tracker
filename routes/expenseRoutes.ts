import { Router } from "express";
import { getAllExpenses } from "../controllers/expenseController.ts";

const router = Router();

router.get('/expenses',getAllExpenses);



export default router;