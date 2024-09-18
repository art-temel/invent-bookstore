import { Request, Response } from 'express';
import * as borrowingService from '../services/borrowingService';
const { check, validationResult } = require('express-validator');

const validateScore = [
  check('score')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Score is required.')
    .isNumeric()
    .withMessage('Score must be a number.'),
];

export async function borrowBook(req: Request, res: Response) {
  try {
    const { userId, bookId } = req.params;
    await borrowingService.borrowBook(Number(userId), Number(bookId));
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function returnBook(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userId, bookId } = req.params;
    const score = req.body.score;
    await borrowingService.returnBook(Number(userId), Number(bookId), score);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
