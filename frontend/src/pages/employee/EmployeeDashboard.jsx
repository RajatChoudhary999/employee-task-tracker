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
  MenuItem,
  Select,
} from "@mui/material";
import api from "../../services/api";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const fetchTasks = async () => {
    try {
      const res = await api.get(`task/get-user-tasks/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // backend may return {message, data: []}
      if (res.data.data) {
        setTasks(res.data.data);
      } else {
        setTasks(res.data || []);
      }
    } catch (error) {
      console.error("Fetch tasks error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token || !user) {
      navigate("/");
      return;
    }
    fetchTasks();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await api.put(
        `task/update-task/${taskId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // refresh tasks
      fetchTasks();
    } catch (error) {
      console.error("Status update failed:", error);
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
      <div className="flex justify-between items-center bg-white px-6 py-4 shadow">
        <h1 className="text-xl font-bold">Employee Dashboard</h1>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <div className="p-6">
        <Paper className="p-6">
          <h2 className="text-lg font-semibold mb-4">My Tasks</h2>

          {tasks.length === 0 ? (
            <p>No tasks assigned</p>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Due Date</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.id}</TableCell>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.description}</TableCell>

                    {/* STATUS UPDATE */}
                    <TableCell>
                      <Select
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(task.id, e.target.value)
                        }
                        size="small"
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="in_progress">In Progress</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                      </Select>
                    </TableCell>

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

export default EmployeeDashboard;
