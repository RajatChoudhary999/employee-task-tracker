import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Card, CardContent } from "@mui/material";
import { loginUser } from "../../services/authService";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser({ email, password });

      // save auth data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      // redirect based on role
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/employee");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold text-center mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Login to continue
          </p>

          {error && (
            <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <TextField
              label="Email"
              fullWidth
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              fullWidth
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              className="!mt-2"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
