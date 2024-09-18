import * as bookModel from '../repositories/book';
import { GetBooksDTO,GetBookDTO } from '../dtos/bookDTO'

export async function createBook(title: string) {
  return bookModel.createBook(title);
}

export async function getAllBooks():Promise<GetBooksDTO[]> {
  return bookModel.getAllBooks();
}

export async function getBookById(bookId: number): Promise<GetBookDTO> {
  const book = await bookModel.getBookById(bookId);
  if (!book) {
    throw new Error(`Book with ID ${bookId} not found`);
  }
  const score = await bookModel.getBookAverageRating(bookId);
  return {
    ...book,
    score,
  };
}
