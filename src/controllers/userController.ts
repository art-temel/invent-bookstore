import { Request, Response } from 'express';
import * as userService from '../services/userService';

export async function createUser(req: Request, res: Response) {
  try {
    const { name } = req.body;
    await userService.createUser(name);
    res.status(201).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getUserWithBorrowings(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const user = await userService.getUserWithBorrowings(Number(userId));
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
