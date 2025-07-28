import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { verifyToken } from "../features/auth/authSlice";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { token, user, loading } = useSelector((state) => state.auth);
  const [isVerifying, setIsVerifying] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const verifyUserToken = async () => {
      if (token && !user) {
        try {
          await dispatch(verifyToken());
        } catch (error) {
          console.error("Token verification failed:", error);
        }
      }
      setIsVerifying(false);
    };

    verifyUserToken();
  }, [token, user, dispatch]);

  // Show loading spinner while verifying
  if (loading || isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if no token
  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Redirect to login if user data is missing (token might be invalid)
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Check if user account is active
  if (user.isActive === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="mt-6 text-xl font-semibold text-gray-900">Account Deactivated</h2>
          <p className="mt-2 text-gray-600">Your account has been deactivated. Please contact support.</p>
        </div>
      </div>
    );
  }

  // Check role-based access
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user role
    const redirectPath = getRoleBasedRedirect(user.role);
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

// Helper function to get role-based redirect path
const getRoleBasedRedirect = (role) => {
  switch (role) {
    case "student":
      return "/student-dashboard";
    case "counsellor":
      return "/counsellor-dashboard";
    case "admin":
      return "/admin-dashboard";
    default:
      return "/";
  }
};

// Higher-order component for role-specific protection
export const StudentRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={["student"]}>
    {children}
  </ProtectedRoute>
);

export const CounsellorRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={["counsellor"]}>
    {children}
  </ProtectedRoute>
);

export const AdminRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={["admin"]}>
    {children}
  </ProtectedRoute>
);

// Multi-role protection
export const CounsellorOrAdminRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={["counsellor", "admin"]}>
    {children}
  </ProtectedRoute>
);

export default ProtectedRoute;
