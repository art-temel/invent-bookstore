import { prisma } from './prisma';

// Create a book
export async function createBook(name: string) {
  return prisma.book.create({
    data: { name },
  });
}

// Read all books
export async function getAllBooks() {
  return prisma.book.findMany();
}

// Read a book by ID with average rating
export async function getBookById(bookId: number) {
  return prisma.book.findUnique({
    where: { id: bookId },
  });
}

// Aggregate average rating for a book
export async function getBookAverageRating(bookId: number) {
  const { _avg: { userScore: averageRating } = { userScore: 0 } } = await prisma.borrowing.aggregate({
    where: { bookId },
    _avg: { userScore: true },
  });

  return averageRating || -1;
}

// Check Book Exist
export async function checkBookExists(bookId: number) {
  const book = await prisma.book.findUnique({
    where: { id: bookId },
  });
  if (!book) {
    throw new Error(`Book with ID ${bookId} not found`);
  }
  return book;
}