const asyncHandler = require("express-async-handler");
const Task = require("../Models/taskModel");
const User = require("../Models/userModel");

const checkUserExists = async (userId) => {
  const user = await User.findByPk(userId);
  return user;
};

const createTask = asyncHandler(async (req, res) => {
  console.log("Task creating");
  const { title, description, due_date, assigned_to } = req.body;

  if (!(title && due_date && assigned_to)) {
    res.status(400);
    throw new Error("Please Enter All the Required Fields");
  }

  const task = await Task.create({
    title,
    description,
    due_date,
    assigned_to,
  });

  if (task) {
    return res.status(201).json({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      due_date: task.due_date,
      assigned_to: task.assigned_to,
    });
  } else {
    res.status(400);
    throw new Error("Failed to Create Task");
  }
});

const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "name", "email"], // JOIN users
      },
    ],
    order: [["createdAt", "ASC"]],
  });

  if (!tasks || tasks.length === 0) {
    return res.status(200).json({
      message: "No tasks found",
      data: [],
    });
  }

  res.status(200).json(tasks);
});

const getTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findOne({
    where: { id },
    include: [
      {
        model: User,
        attributes: ["id", "name", "email"],
      },
    ],
  });

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  res.status(200).json(task);
});

const getTasksByUserId = asyncHandler(async (req, res) => {
  const { id } = req.params; // user id

  if (!(await checkUserExists(id))) {
    res.status(404);
    throw new Error("User not found");
  }

  const tasks = await Task.findAll({
    where: { assigned_to: id },
    include: [
      {
        model: User,
        attributes: ["id", "name", "email"],
      },
    ],
    order: [["createdAt", "ASC"]],
  });

  if (!tasks || tasks.length === 0) {
    return res.status(200).json({
      message: "No tasks found for this user",
      data: [],
    });
  }

  res.status(200).json(tasks);
});

const updateTask = asyncHandler(async (req, res) => {
  console.log("updateTask route called");

  const { id } = req.params;
  const { title, description, status } = req.body;

  const task = await Task.findByPk(id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  task.title = title ?? task.title;
  task.description = description ?? task.description;
  task.status = status ?? task.status;

  await task.save();

  res.status(200).json({
    message: "Task updated successfully",
    task,
  });
});

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  getTasksByUserId,
  updateTask,
};
