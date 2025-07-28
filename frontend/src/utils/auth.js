import { USER_ROLES, ROUTES } from '../constants';

/**
 * Get role-based redirect path
 * @param {string} role - User role
 * @returns {string} - Redirect path
 */
export const getRoleBasedRedirect = (role) => {
  switch (role) {
    case USER_ROLES.STUDENT:
      return ROUTES.STUDENT_DASHBOARD;
    case USER_ROLES.COUNSELLOR:
      return ROUTES.COUNSELLOR_DASHBOARD;
    case USER_ROLES.ADMIN:
      return ROUTES.ADMIN_DASHBOARD;
    default:
      return ROUTES.LOGIN;
  }
};

/**
 * Check if user has required role
 * @param {string} userRole - Current user role
 * @param {string|string[]} requiredRoles - Required role(s)
 * @returns {boolean} - Has permission
 */
export const hasRole = (userRole, requiredRoles) => {
  if (!userRole) return false;
  
  if (Array.isArray(requiredRoles)) {
    return requiredRoles.includes(userRole);
  }
  
  return userRole === requiredRoles;
};

/**
 * Check if user can access resource
 * @param {object} user - Current user
 * @param {string} resourceUserId - Resource owner ID
 * @returns {boolean} - Can access
 */
export const canAccessResource = (user, resourceUserId) => {
  if (!user) return false;
  
  // Admin can access everything
  if (user.role === USER_ROLES.ADMIN) return true;
  
  // User can access their own resources
  return user.id === resourceUserId;
};

/**
 * Get user initials for avatar
 * @param {string} name - User name
 * @returns {string} - Initials
 */
export const getUserInitials = (name) => {
  if (!name) return 'U';
  
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Get role color class
 * @param {string} role - User role
 * @returns {string} - CSS class
 */
export const getRoleColor = (role) => {
  switch (role) {
    case USER_ROLES.ADMIN:
      return "text-purple-600 bg-purple-100";
    case USER_ROLES.COUNSELLOR:
      return "text-blue-600 bg-blue-100";
    case USER_ROLES.STUDENT:
      return "text-green-600 bg-green-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

/**
 * Get role icon
 * @param {string} role - User role
 * @returns {string} - Icon emoji
 */
export const getRoleIcon = (role) => {
  switch (role) {
    case USER_ROLES.ADMIN:
      return "👑";
    case USER_ROLES.COUNSELLOR:
      return "👨‍🏫";
    case USER_ROLES.STUDENT:
      return "🎓";
    default:
      return "👤";
  }
};

/**
 * Validate token format
 * @param {string} token - JWT token
 * @returns {boolean} - Is valid format
 */
export const isValidTokenFormat = (token) => {
  if (!token || typeof token !== 'string') return false;
  
  // Basic JWT format check (3 parts separated by dots)
  const parts = token.split('.');
  return parts.length === 3;
};

/**
 * Check if token is expired (client-side check only)
 * @param {string} token - JWT token
 * @returns {boolean} - Is expired
 */
export const isTokenExpired = (token) => {
  if (!isValidTokenFormat(token)) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    return payload.exp < currentTime;
  } catch (error) {
    return true;
  }
};

/**
 * Get user permissions based on role
 * @param {string} role - User role
 * @returns {object} - Permissions object
 */
export const getUserPermissions = (role) => {
  const basePermissions = {
    canViewProfile: true,
    canEditProfile: true,
    canChangePassword: true
  };

  switch (role) {
    case USER_ROLES.ADMIN:
      return {
        ...basePermissions,
        canManageUsers: true,
        canManageUniversities: true,
        canViewAnalytics: true,
        canManageSystem: true,
        canAccessAllData: true
      };
      
    case USER_ROLES.COUNSELLOR:
      return {
        ...basePermissions,
        canManageStudents: true,
        canViewStudentData: true,
        canCreateTasks: true,
        canScheduleMeetings: true,
        canGenerateReports: true
      };
      
    case USER_ROLES.STUDENT:
      return {
        ...basePermissions,
        canManageApplications: true,
        canUploadDocuments: true,
        canViewUniversities: true,
        canViewScholarships: true,
        canContactCounsellors: true
      };
      
    default:
      return basePermissions;
  }
};
