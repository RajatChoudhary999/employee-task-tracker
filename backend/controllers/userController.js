const generateToken = require("../config/generateToken");
const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!(name && email && password)) {
    res.status(400);
    throw new Error("Please Enter All the Fields");
  }

  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists Please Login");
  }

  const user = await User.create({
    name,
    email,
    password,
    role, // optional, defaults to employee
  });

  if (user) {
    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Failed to Create the User");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  console.log("inside get all users");
  const users = await User.findAll({ attributes: { exclude: ["password"] } });
  res.json(users);
});

module.exports = {
  registerUser,
  authUser,
  getAllUsers,
};
