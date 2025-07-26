import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../features/auth/authSlice";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, user } = useSelector((state) => state.auth);

  // Get the intended destination from location state
  const from = location.state?.from?.pathname || null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return;
    }

    try {
      const result = await dispatch(loginUser(formData));

      if (loginUser.fulfilled.match(result)) {
        const userRole = result.payload.role;

        // Navigate based on role or intended destination
        if (from) {
          navigate(from, { replace: true });
        } else {
          switch (userRole) {
            case "student":
              navigate("/student-dashboard");
              break;
            case "counsellor":
              navigate("/counsellor-dashboard");
              break;
            case "admin":
              navigate("/admin-dashboard");
              break;
            default:
              navigate("/student-dashboard");
          }
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Clear error when component unmounts or when user starts typing
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (formData.email || formData.password) {
      dispatch(clearError());
    }
  }, [formData.email, formData.password, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-100 to-indigo-200">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <img
          src="https://undraw.co/api/illustrations/50f176f0-b2b0-40f7-92bc-cb6a616624a5"
          alt="login"
          className="w-32 mx-auto mb-4"
        />
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Not a user?{" "}
          <Link to="/register" className="text-sky-600 hover:underline">
            Create new account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
