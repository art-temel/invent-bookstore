import { Request, Response } from 'express';
import * as bookService from '../services/bookService';

export async function createBook(req: Request, res: Response) {
  try {
    const { name } = req.body;
    await bookService.createBook(name);
    res.status(201).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getAllBooks(req: Request, res: Response) {
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getBookById(req: Request, res: Response) {
  try {
    const { bookId } = req.params;
    const book = await bookService.getBookById(Number(bookId));
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
