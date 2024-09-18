import { Router } from "express";
import * as bookController from '../controllers/bookController';

const router = Router();

router.post('/', bookController.createBook);
router.get('/', bookController.getAllBooks);
router.get('/:bookId', bookController.getBookById);

export default router