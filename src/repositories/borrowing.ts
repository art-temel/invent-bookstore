import { prisma } from './prisma';

// Create a borrowing record
export async function createBorrowing(userId: number, bookId: number) {
  return prisma.borrowing.create({
    data: {
      userId,
      bookId,
      borrowedAt: new Date(),
      userScore: -1,
    },
    include: {
      book: true,
    },
  });
}

// Find an active borrowing record
export async function findActiveBorrowing(userId: number, bookId: number) {
  return prisma.borrowing.findFirstOrThrow({
    where: { userId, bookId, returnedAt: null },
  });
}

// Check the books is available for borrow
export async function checkIsBookBorrowed(bookId: number) {
  return prisma.borrowing.findFirst({
    where: { bookId, returnedAt: null },
  });
}

// Update a borrowing record
export async function updateBorrowing(borrowingId: number, userScore?: number) {
  return prisma.borrowing.update({
    where: { id: borrowingId },
    data: {
      returnedAt: new Date(),
      userScore: userScore,
    },
    include: {
      book: true,
    },
  });
}
