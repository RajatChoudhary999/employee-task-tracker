const express = require("express");
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  getTasksByUserId,
} = require("../controllers/taskController");
const { protect } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/roleMiddleware");

const router = express.Router();

// -------------------- GET END POINTS --------------------------------

// Get all tasks
router.get("/get-all-tasks", protect, getAllTasks);

// Get task by id
router.get("/get-task/:id", protect, getTaskById);

// Get tasks for a specific user
router.get("/get-user-tasks/:id", protect, getTasksByUserId);

// -------------------- PUT END POINTS --------------------------------

// Update task (title / description / status)
router.put("/update-task/:id", protect, updateTask);

// -------------------- POST END POINTS -------------------------------

// Create a new task (admin)
router.post("/create-task", protect, isAdmin, createTask);

module.exports = router;
