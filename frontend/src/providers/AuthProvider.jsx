import { useEffect, useState, cache } from "react";
import api from "../api/interceptors";
import { setCsrfToken } from "../api/csrf";
import { AuthContext } from "../context/AuthContext";
import { markAuthChecked } from "../api/interceptors";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const isLoggedIn = !!user;

  /* INIT AUTH (RUN ONCE) */
  useEffect(() => {

    const initAuth = async () => {
      setLoading(true);

      try {
        // 1. CSRF token
        const csrfRes = await api.get("/csrf-token");
        setCsrfToken(csrfRes.data.csrfToken);

        // 2. Check user from cookie
        const res = await api.get("/auth-api/checkUser");

        // Ensure the user object exists in the response
        if (res.data && res.data.user) {
          setUser(res.data.user);
          setUserRole(res.data.user?.role || null);
          setUserAvatar(res.data.user?.avatar || "/unknownuser.png");
        } else {
          throw new Error("User data not found in response");
        }

        setError(null);
      } catch (err) {
        setUser(null);
        setUserRole(null);
        setUserAvatar(null);
        // setError(err);
      } finally {
        setLoading(false);
        markAuthChecked();
      }
    };

    initAuth();
  }, []);

  /* LOGIN */
  const login = async (email, password) => {
    setLoading(true);

    try {
      const res = await api.post("/auth-api/login", {
        email,
        password,
      });

      setUser(res.data.user);
      setUserRole(res.data.user?.role || null);
      setUserAvatar(res.data.user?.avatar || "/unknownuser.png");
      setError(null);
      setSuccess(res || "Login Sucessfully");
      return true;

    } catch (err) {
      setError(err || "Login failed");

      if (err.response?.data?.errorCode === "435345") {
        navigate("/verify-otp", {
          state: {
            email: email,
          },
        });
      }

      return false;
    } finally {
      setLoading(false);
    }
  };

  /* REGISTER */
  const register = async (form) => {
    setLoading(true);

    try {
      const res = await api.post("/auth-api/register", form);

      setError(null);
      setSuccess(res || "register Sucessfully");

      return true;
    } catch (err) {
      setError(err || "Registration failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  /* LOGOUT */
  const logout = async () => {
    setLoading(true);

    try {
      const res = await api.post("/auth-api/logout");

      setUser(null);
      setUserRole(null);
      setUserAvatar(null);
      setError(null);
      setSuccess(res || "Logout Sucessfully");
    } catch (err) {
      setError(err || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  /* verify OTP */
  const verifyOTP = async (email, otp, purpose) => {
    setLoading(true);

    try {
      const res = await api.post("/auth-api/verify-otp", {
        email,
        otp,
        purpose,
      });
      setSuccess(res || "OTP Verifyed");

      setError(null);

      return true;
    } catch (err) {
      setError(err || "OTP verification failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async (email, purpose) => {
    setLoading(true);

    try {
      const res = await api.post("/auth-api/resend-otp", {
        email,
        purpose,
      });

      setError(null);
      setSuccess(res || "OTP Resend");
      return true;
    } catch (err) {
      setError(err || "OTP resend failed");
      return false;
    } finally {
      setLoading(false);
    }
  };



  const errorHandler = (err) => {

    if (error === null) { return }
    toast.error(err?.response?.data?.message || "something went wrong");
    setError(null)

  }

  const successHandler = (success) => {

    if (success === null) { return }
    toast.success(success?.data?.message || "work done");
    setSuccess(null)

  }

  useEffect(() => {
    errorHandler(error)
    successHandler(success)
  }, [error, success])


  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        userAvatar,
        isLoggedIn,
        loading,
        error,
        login,
        register,
        logout,
        verifyOTP,
        resendOTP,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;