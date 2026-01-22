const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");
const User = require("../Models/userModel");

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "in_progress", "completed"),
      allowNull: false,
      defaultValue: "pending",
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    assigned_to: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    tableName: "tasks",
    timestamps: true,
  }
);

// relations
User.hasMany(Task, { foreignKey: "assigned_to" });
Task.belongsTo(User, { foreignKey: "assigned_to" });

module.exports = Task;
