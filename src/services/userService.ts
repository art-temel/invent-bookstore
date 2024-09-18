// src/services/userService.ts

import * as userModel from '../repositories/user';
import { UserDTO, UserWithBorrowingsDTO } from '../dtos/userDto';

export async function createUser(name: string): Promise<UserDTO> {
  const user = await userModel.createUser(name);
  return {
    id: user.id,
    name: user.name
  };
}

export async function getAllUsers(): Promise<UserDTO[]> {
  const users = await userModel.getAllUsers();
  return users.map(user => ({
    id: user.id,
    name: user.name
  }));
}

export async function getUserWithBorrowings(userId: number): Promise<UserWithBorrowingsDTO> {
  const userWithBorrowings = await userModel.getUserWithBorrowings(userId);
  if (!userWithBorrowings) {
    throw new Error(`User with ID ${userId} not found`);
  }

  const pastBorrowings = userWithBorrowings.borrowings
    .filter(borrowing => borrowing.returnedAt !== null)
    .map(borrowing => ({
      name: borrowing.book.name,
      userScore: borrowing.userScore,
    }));

  const presentBorrowings = userWithBorrowings.borrowings
    .filter(borrowing => borrowing.returnedAt === null)
    .map(borrowing => ({
      name: borrowing.book.name,
    }));

  return {
    id: userWithBorrowings.id,
    name: userWithBorrowings.name,
    books: {
      past: pastBorrowings,
      present: presentBorrowings,
    },
  };
}
