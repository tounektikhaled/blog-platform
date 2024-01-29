const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret_key = process.env.secret_key;

const getUsers = async () => {
  return await UserModel.find();
}

const getUserById = async (_, { id }) => {
  try {
    // Find the user by ID
    const user = await UserModel.findById(id);

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    return user;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw new Error(`Unable to fetch user with ID ${id}`);
  }
};


const getMe = async (_, __, context) => {
  try {
    // Check if there is an authenticated user in the context
    if (!context.user) {
      throw new Error('Unauthorized');
    }

    // Retrieve the authenticated user by their ID
    const authenticatedUser = await UserModel.findById(context.user.id);

    if (!authenticatedUser) {
      throw new Error('Authenticated user not found');
    }

    return authenticatedUser;
  } catch (error) {
    console.error('Error fetching authenticated user:', error);
    throw new Error('Unable to fetch authenticated user');
  }
};


const createUser = async (_, { username, password }) => {
  try {
    // Create a new user instance with the provided username and password
    const user = new UserModel({ username, password });

    // Save the user to the database
    await user.save();

    // Return the created user
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Unable to create user');
  }
};


const updateUser = async (_, { id, username, password }) => {
  try {
    // Find the user by ID and update their username and password
    const updatedUser = await UserModel.findByIdAndUpdate(id, { username, password }, { new: true });

    if (!updatedUser) {
      throw new Error(`User with ID ${id} not found`);
    }

    return updatedUser;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw new Error(`Unable to update user with ID ${id}`);
  }
};


const deleteUser = async (_, { id }) => {
  try {
    // Find the user by ID and delete them
    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      throw new Error(`User with ID ${id} not found`);
    }

    return true;
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw new Error(`Unable to delete user with ID ${id}`);
  }
};

const loginUser = async (_, { username, password }) => {
  try {
    // Find the user by username
    const user = await UserModel.findOne({ username });

    // Check if the user exists
    if (!user) {
      throw new Error('Invalid username or password');
    }

    // Compare the provided password with the hashed password in the database
    const validPassword = await bcrypt.compare(password, user.password);

    // If the password is invalid, throw an error
    if (!validPassword) {
      throw new Error('Invalid username or password');
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ id: user._id, username: user.username }, secret_key, { expiresIn: '1h' });

    // Return the user and token
    return { user, token };
  } catch (error) {
    console.error('Error during user login:', error);
    throw new Error('Unable to login');
  }
};


module.exports = {
  AuthPayload: {
    loginUser
  },
  Query: {
    getMe,
    getUsers,
    getUserById,
  },
  Mutation: {
    createUser,
    updateUser,
    deleteUser,
  }

};
