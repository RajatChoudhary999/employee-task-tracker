const asyncHandler = require("express-async-handler");

const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403);
    throw new Error("Access denied. Admin only");
  }
});

module.exports = { isAdmin };
