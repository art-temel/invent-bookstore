import { Router } from "express";
import * as userController from '../controllers/userController';

const router = Router();

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserWithBorrowings);

export default router