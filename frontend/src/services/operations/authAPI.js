import { apiConnector } from "../apiconnector";
import { endpoints } from "../api";
import { setLoading, setUser, clearAuth, setError, clearError } from "../../features/auth/authSlice";

const {
    LOGIN_API,
    REGISTER_API,
    LOGOUT_API,
} = endpoints;

export function signUp(name, email, password, role, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        dispatch(clearError()); // Clear any previous errors
        
        try {
            console.log("Sending signup data:", {
                name, email, role
                // Don't log passwords
            });
            
            const response = await apiConnector("POST", REGISTER_API, {
                name,
                email,
                password,
                role,
            });

            console.log("SIGNUP API RESPONSE............", response);

            // ✅ FIXED: Proper response validation
            if (!response?.data) {
                throw new Error("Invalid response from server");
            }
            
            // Check if there's an error in the response
            if (response.data.error) {
                throw new Error(response.data.message || "Signup failed");
            }
            
            // Clear loading state
            dispatch(setLoading(false));
            
            // Show success message
            alert("Account created successfully!");
            
            // Navigate based on role after a short delay
            setTimeout(() => {
                if (role === "student") {
                    navigate("/student");
                } else if (role === "counsellor") {
                    navigate("/counsellor");
                } else {
                    navigate("/");
                }
            }, 1000);
            
            return response.data;
            
        } catch (error) {
            console.log("SIGNUP API ERROR............", error);
            
            const errorMessage = error.response?.data?.message || 
                               error.response?.data?.msg || 
                               error.message || 
                               "Signup failed";
            
            // ✅ ADDED: Store error in Redux state
            dispatch(setError(errorMessage));
            dispatch(setLoading(false));
            
            // Show alert for immediate user feedback
            alert(errorMessage);
            
            throw error;
        }
    };
}

export function login(email, password, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        dispatch(clearError()); // Clear any previous errors
        
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password,
            });

            console.log("LOGIN API RESPONSE............", response);

            // ✅ FIXED: Better response validation
            if (!response?.data) {
                throw new Error("Invalid response from server");
            }
            
            // Check for error in response
            if (response.data.error) {
                throw new Error(response.data.message || "Login failed");
            }
            
            // ✅ ADDED: Validate required data
            if (!response.data.token || !response.data.user) {
                throw new Error("Invalid login response - missing token or user data");
            }
            
            // Store user data in localStorage
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            
            // ✅ ADDED: Update Redux state with user data
            dispatch(setUser({
                user: response.data.user,
                token: response.data.token,
                role: response.data.user.role
            }));
            
            dispatch(setLoading(false));
            
            // Navigate based on role
            const userRole = response.data.user?.role || response.data.role;
            if (userRole === "student") {
                navigate("/student");
            } else if (userRole === "counsellor") {
                navigate("/counsellor");
            } else {
                navigate("/");
            }
            
            return response.data;
            
        } catch (error) {
            console.log("LOGIN API ERROR............", error);
            
            const errorMessage = error.response?.data?.message || 
                               error.message || 
                               "Login failed";
            
            // ✅ ADDED: Store error in Redux state
            dispatch(setError(errorMessage));
            dispatch(setLoading(false));
            
            alert(errorMessage);
            
            throw error;
        }
    };
}

export function logout(navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        
        try {
            // Call logout API
            await apiConnector("POST", LOGOUT_API);
            
            // Clear localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            
            // ✅ ADDED: Clear Redux auth state
            dispatch(clearAuth());
            
            // Navigate to home
            navigate("/");
            
        } catch (error) {
            console.log("LOGOUT ERROR............", error);
            
            // Even if API call fails, still clear local data
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            dispatch(clearAuth());
            navigate("/");
        }
    };
}