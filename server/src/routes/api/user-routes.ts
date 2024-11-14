import { Router } from 'express';
import userController from '../../controllers/user-controller';

const router = Router();

// Route to create a new user
router.post('/signup', userController.createUser);

// Route to get all users
router.get('/users', userController.getAllUsers);

// Route to get a user by ID
router.get('/:id', userController.getUserById);

// Route to update a user by ID
router.put('/:id', userController.updateUser);

// delete a user by ID
router.delete('/:id', userController.deleteUser);

// countries
// Route to create a new user

export default router;
