import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/dashboards/StudentDashboard";
import CounsellorDashboard from "./pages/dashboards/CounsellorDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import { StudentRoute, CounsellorRoute, AdminRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/student-dashboard"
          element={
            <StudentRoute>
              <StudentDashboard />
            </StudentRoute>
          }
        />
        <Route
          path="/counsellor-dashboard"
          element={
            <CounsellorRoute>
              <CounsellorDashboard />
            </CounsellorRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* Legacy route redirects */}
        <Route path="/student" element={<Navigate to="/student-dashboard" replace />} />
        <Route path="/counsellor" element={<Navigate to="/counsellor-dashboard" replace />} />
        <Route path="/admin" element={<Navigate to="/admin-dashboard" replace />} />

        {/* Catch-all: redirect to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
