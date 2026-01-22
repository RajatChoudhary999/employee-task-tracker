import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Chip,
  Divider,
} from "@mui/material";
import api from "../../services/api";

const statusColor = (status) => {
  if (status === "completed") return "success";
  if (status === "in_progress") return "warning";
  return "default";
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // create task state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const fetchData = async () => {
    try {
      const usersRes = await api.get("user/get-all-users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const tasksRes = await api.get("task/get-all-tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // only employees in dropdown
      setUsers(usersRes.data.filter((u) => u.role === "employee"));
      setTasks(tasksRes.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    fetchData();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "task/create-task",
        {
          title,
          description,
          due_date: dueDate,
          assigned_to: assignedTo,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // reset form
      setTitle("");
      setDescription("");
      setDueDate("");
      setAssignedTo("");

      window.alert("Task Created Successfully");

      // refresh tasks
      fetchData();
    } catch (error) {
      console.error("Create task failed", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

 return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center bg-white px-8 py-4 shadow-sm">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <div className="p-8 space-y-10">
        {/* CREATE TASK */}
        <Paper className="p-6">
          <h2 className="text-xl font-semibold mb-2">Create Task</h2>
          <p className="text-gray-500 mb-4">
            Assign tasks to employees
          </p>

          <Divider className="mb-6" />

          <form
            onSubmit={handleCreateTask}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <TextField
              label="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <TextField
              label="Due Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />

            <TextField
              label="Description"
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <TextField
              select
              label="Assign To"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              required
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </TextField>

            <div className="md:col-span-2">
              <Button type="submit" variant="contained" size="large">
                Create Task
              </Button>
            </div>
          </form>
        </Paper>

        {/* TASKS TABLE */}
        <Paper className="p-6">
          <h2 className="text-xl font-semibold mb-2">All Tasks</h2>
          <p className="text-gray-500 mb-4">
            Overview of all assigned tasks
          </p>

          <Divider className="mb-4" />

          {tasks.length === 0 ? (
            <p>No tasks found</p>
          ) : (
            <Table>
              <TableHead>
                <TableRow className="bg-gray-50">
                  <TableCell>ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Assigned To</TableCell>
                  <TableCell>Due Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id} hover>
                    <TableCell>{task.id}</TableCell>
                    <TableCell className="font-medium">
                      {task.title}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={task.status.replace("_", " ")}
                        color={statusColor(task.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{task.User?.name}</TableCell>
                    <TableCell>
                      {new Date(task.due_date).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Paper>
      </div>
    </div>
  );
};

export default AdminDashboard;
