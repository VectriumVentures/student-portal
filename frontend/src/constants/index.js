// Application Constants
export const APP_CONFIG = {
  name: "CRM Portal",
  description: "Education Management System",
  version: "1.0.0",
  author: "CRM Team"
};

// API Configuration
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  timeout: 10000,
  retries: 3
};

// User Roles
export const USER_ROLES = {
  STUDENT: "student",
  COUNSELLOR: "counsellor", 
  ADMIN: "admin"
};

// Route Paths
export const ROUTES = {
  // Public Routes
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  
  // Protected Routes
  STUDENT_DASHBOARD: "/student-dashboard",
  COUNSELLOR_DASHBOARD: "/counsellor-dashboard", 
  ADMIN_DASHBOARD: "/admin-dashboard",
  
  // Student Sub-routes
  STUDENT: {
    OVERVIEW: "/student-dashboard/overview",
    APPLICATIONS: "/student-dashboard/applications",
    DOCUMENTS: "/student-dashboard/documents",
    PROFILE: "/student-dashboard/profile",
    UNIVERSITIES: "/student-dashboard/universities",
    SCHOLARSHIPS: "/student-dashboard/scholarships"
  },
  
  // Counsellor Sub-routes
  COUNSELLOR: {
    OVERVIEW: "/counsellor-dashboard/overview",
    STUDENTS: "/counsellor-dashboard/students",
    TASKS: "/counsellor-dashboard/tasks",
    MEETINGS: "/counsellor-dashboard/meetings",
    REPORTS: "/counsellor-dashboard/reports"
  },
  
  // Admin Sub-routes
  ADMIN: {
    OVERVIEW: "/admin-dashboard/overview",
    USERS: "/admin-dashboard/users",
    UNIVERSITIES: "/admin-dashboard/universities",
    ANALYTICS: "/admin-dashboard/analytics",
    SETTINGS: "/admin-dashboard/settings"
  }
};

// Registration Configuration
export const REGISTRATION_CONFIG = {
  roles: [
    {
      value: USER_ROLES.STUDENT,
      label: "Student",
      icon: "🎓",
      description: "Apply to universities and manage applications",
      fields: ["studentId"]
    },
    {
      value: USER_ROLES.COUNSELLOR,
      label: "Counsellor", 
      icon: "👨‍🏫",
      description: "Guide students through their application process",
      fields: ["organization"]
    }
  ]
};

// Form Validation Rules
export const VALIDATION_RULES = {
  email: {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address"
    }
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters long"
    }
  },
  name: {
    required: "Full name is required",
    minLength: {
      value: 2,
      message: "Name must be at least 2 characters long"
    }
  },
  phone: {
    required: "Phone number is required",
    pattern: {
      value: /^\+?[1-9]\d{9,14}$/,
      message: "Please enter a valid phone number"
    }
  }
};

// UI Theme Configuration
export const THEME = {
  colors: {
    primary: {
      50: "#eff6ff",
      500: "#3b82f6", 
      600: "#2563eb",
      700: "#1d4ed8"
    },
    secondary: {
      50: "#f8fafc",
      500: "#64748b",
      600: "#475569"
    },
    success: {
      50: "#f0fdf4",
      500: "#22c55e",
      600: "#16a34a"
    },
    warning: {
      50: "#fffbeb", 
      500: "#f59e0b",
      600: "#d97706"
    },
    error: {
      50: "#fef2f2",
      500: "#ef4444", 
      600: "#dc2626"
    }
  },
  spacing: {
    xs: "0.5rem",
    sm: "1rem", 
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem"
  }
};

// Status Types
export const STATUS_TYPES = {
  ACTIVE: "Active",
  INACTIVE: "Inactive", 
  PENDING: "Pending",
  COMPLETED: "Completed",
  IN_PROGRESS: "In Progress",
  CANCELLED: "Cancelled",
  VERIFIED: "Verified",
  UNDER_REVIEW: "Under Review",
  SUBMITTED: "Submitted",
  DRAFT: "Draft"
};

// Priority Levels
export const PRIORITY_LEVELS = {
  HIGH: "High",
  MEDIUM: "Medium", 
  LOW: "Low"
};

// Document Types
export const DOCUMENT_TYPES = {
  ACADEMIC: "Academic",
  REFERENCE: "Reference",
  ESSAY: "Essay", 
  CERTIFICATE: "Certificate",
  TRANSCRIPT: "Transcript",
  RECOMMENDATION: "Recommendation"
};

// Application Status Flow
export const APPLICATION_STATUS_FLOW = [
  STATUS_TYPES.DRAFT,
  STATUS_TYPES.SUBMITTED,
  STATUS_TYPES.UNDER_REVIEW,
  STATUS_TYPES.COMPLETED
];

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  USER_PREFERENCES: "user_preferences",
  THEME_MODE: "theme_mode"
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  UNAUTHORIZED: "You are not authorized to access this resource.",
  FORBIDDEN: "Access denied. Insufficient permissions.",
  NOT_FOUND: "The requested resource was not found.",
  SERVER_ERROR: "Internal server error. Please try again later.",
  VALIDATION_ERROR: "Please check your input and try again."
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Successfully logged in!",
  REGISTRATION_SUCCESS: "Account created successfully!",
  PROFILE_UPDATED: "Profile updated successfully!",
  DOCUMENT_UPLOADED: "Document uploaded successfully!",
  APPLICATION_SUBMITTED: "Application submitted successfully!"
};
