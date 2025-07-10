// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000",
//   withCredentials: true,          
// });

// export default api;

const Base_URL = "http://localhost:5000"

export const endpoints = {
    // Auth endpoints - FIXED
    LOGIN_API: "/api/auth/login",           // ✅ Added /auth
    REGISTER_API: "/api/auth/register",     // ✅ Added /auth
    LOGOUT_API: "/api/auth/logout",         // ✅ Already correct
    RESETPASSTOKEN_API: "/api/auth/reset-password-token",
    RESETPASSWORD_API: "/api/auth/reset-password",
    
    // User endpoints
    GET_USER_API: "/api/user/profile",
    UPDATE_USER_API: "/api/user/update",
    
    // Other endpoints
    GET_COURSES_API: "/api/courses",
    GET_COURSE_API: "/api/courses/:id",
};