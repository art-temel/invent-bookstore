import { prisma } from './prisma';

// Create a user
export async function createUser(name: string) {
  return prisma.user.create({
    data: { name },
  });
}

// Read all users
export async function getAllUsers() {
  return prisma.user.findMany();
}

// Read user with borrowings
export async function getUserWithBorrowings(userId: number) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      borrowings: {
        include: { book: true },
      },
    },
  });
}

// Check User Exists
export async function checkUserExists(userId: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    throw new Error(`User with ID ${userId} not found`);
  }
  return user;
}