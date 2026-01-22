const express = require("express");
const {
  registerUser,
  authUser,
  getAllUsers,
} = require("../controllers/userController");
const { isAdmin } = require("../middlewares/roleMiddleware");
const { get } = require("mongoose");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

// --------------------POST END POINTS-------------------------------
router.post("/create-user", registerUser);
router.post("/login", authUser);

router.get("/get-all-users", protect, isAdmin, getAllUsers);

module.exports = router;
