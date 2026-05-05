import React, { useContext, useState } from "react";
import { api } from "../api";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await api.post("/api/v1/user/login", {
        email: email.trim(),
        password,
        role: "Patient",
      });

      toast.success(res.data.message || "Login successful!");
      setIsAuthenticated(true);

      // Reset state before navigating to avoid updates on unmounted component
      setEmail("");
      setPassword("");

      navigateTo("/");
    } catch (error) {
      const serverMsg = error?.response?.data?.message;

      const networkMsg =
        error?.code === "ERR_NETWORK" || error?.message === "Network Error"
          ? "Cannot reach the server. Run backend on port 5000."
          : null;

      toast.error(serverMsg || networkMsg || error?.message || "Login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container form-component login-form">
      <h2>Sign In</h2>
      <p>Please Login To Continue</p>
      <p>
        Your health journey starts here. Sign in to manage your appointments and
        records.
      </p>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <p style={{ marginBottom: 0 }}>Not Registered?</p>
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "#271776ca" }}
          >
            Register Now
          </Link>
        </div>

        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <button type="submit" disabled={isLoading} onClick={handleLogin}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;