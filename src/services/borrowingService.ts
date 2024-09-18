import * as borrowingModel from '../repositories/borrowing';
import { checkUserExists } from '../repositories/user';
import { checkBookExists } from '../repositories/book';

export async function borrowBook(userId: number, bookId: number) {
  await checkUserExists(userId);
  await checkBookExists(bookId);

  const isBorrowed = await borrowingModel.checkIsBookBorrowed(bookId);
  if (isBorrowed) throw new Error("Book is not available");
  return borrowingModel.createBorrowing(userId, bookId);

}

export async function returnBook(userId: number, bookId: number, updatedUnderscore?: number) {
  const borrowing = await borrowingModel.findActiveBorrowing(userId, bookId);
  if (!borrowing) {
    throw new Error(`No active borrowing found for user ID ${userId} and book ID ${bookId}.`);
  }
  return borrowingModel.updateBorrowing(borrowing.id, updatedUnderscore);
}
