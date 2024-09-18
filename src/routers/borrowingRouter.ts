import { Router } from "express";
import * as borrowingController from '../controllers/borrowingController';

const router = Router();

router.post('/users/:userId/borrow/:bookId', borrowingController.borrowBook);
router.post('/users/:userId/return/:bookId', borrowingController.returnBook);

export default router


