import { Request, Response } from 'express';
import User, { IUser } from '../models/User';

// Controller for user-related operations
const userController = {
  // Create a new user
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email } = req.body;
      const newUser: IUser = new User({ name, email });
      await newUser.save();
      return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to create user' });
    }
  },

  // Get all users
  async getAllUsers(_req: Request, res: Response): Promise<Response> {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
  },

  // Get a single user by ID
  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to fetch user' });
    }
  },

  // Update a user by ID
  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email } = req.body;
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { name, email },
        { new: true, runValidators: true }
      );
      if (!user) return res.status(404).json({ error: 'User not found' });
      return res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to update user' });
    }
  },

  // Delete a user by ID
  
};


export default userController;