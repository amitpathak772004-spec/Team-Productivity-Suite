const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');
const { ApiError } = require('../utils/apiError');
const userRepository = require('../repositories/userRepository');

const registerUser = async (data) => {
  const existingUser = await userRepository.findUserByEmail(data.email);
  if (existingUser) {
    throw new ApiError(400, 'Email already registered');
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await userRepository.createUser({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: data.role || 'EMPLOYEE',
    department: data.department || 'General',
    avatar: data.avatar || '',
  });

  const token = generateToken({ userId: user._id, role: user.role });
  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      avatar: user.avatar,
      isActive: user.isActive,
      createdAt: user.createdAt,
    },
    token,
  };
};

const loginUser = async (email, password) => {
  const user = await userRepository.findUserByEmail(email).select('+password');
  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = generateToken({ userId: user._id, role: user.role });
  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      avatar: user.avatar,
      isActive: user.isActive,
      createdAt: user.createdAt,
    },
    token,
  };
};

const getProfile = async (userId) => {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user;
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};
