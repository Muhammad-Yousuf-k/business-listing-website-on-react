import { useEffect, useState } from "react";
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
        } else {
          throw new Error("User data not found in response");
        }

        setError(null);
      } catch (err) {
        setUser(null);
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

      setUser(res?.data?.user);
      setError(null);
      setSuccess(res || "Login Sucessfully");
      return true;

    } catch (err) {
      setError(err || "Login failed. Check your credentials and try again.");

      if (err.response?.data?.errorCode === "435345") {
        navigate("/verify-otp", {
          state: {
            email: email,
            purpose: "verify_email",
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
      setSuccess(res || "register Successfully");

      return true;
    } catch (err) {
      setError(err);
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
      setSuccess(res);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  /* verify OTP */
  const verifyOtp = async (email, otp, purpose, newPassword = "") => {
    setLoading(true);

    try {
      const res = await api.post("/auth-api/otp-verify", {
        email,
        otp,
        purpose,
        newPassword,
      });
      setSuccess(res);

      setError(null);

      return true;
    } catch (err) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async (email, purpose) => {
    setLoading(true);

    try {
      const res = await api.post("/auth-api/send-otp", {
        email,
        purpose,
      });

      setError(null);
      if (purpose !== "reset_password") {
        setSuccess(res || "OTP Resend");
      }
      return true;
    } catch (err) {
      setError(err || "OTP resend failed");
      return false;
    } finally {
      setLoading(false);
    }
  };




  /* verify OTP */
  const verifyEmailOTPForPassword = async (email, otp, purpose, NewPassword) => {
    setLoading(true);

    try {
      const res = await api.post("/auth-api/reset-password-verify", {
        email,
        otp,
        purpose,
        NewPassword,
      });
      setSuccess(res);

      setError(null);

      return true;
    } catch (err) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };







  const handleUpdateRole = async (role) => {
    try {
      if (user?.role === role) {
        toast.info(`You are already ${role}`);
        return;
      }

      const res = await api.post("/auth-api/update-role", {
        role,
      });

      setUser((prev) => ({
        ...prev,
        role: res?.data?.role || role,
      }));

      setSuccess(res);
    } catch (error) {
      setError(error || "Role updated failed");
    }
  };

  const handleUpdateAvatar = async (form) => {
    try {
      if (!form) {
        toast.error("image not found");
        return;
      }

      const res = await api.post("/auth-api/update-avatar", form);

      setUser((prev) => ({
        ...prev,
        avatar: res?.data?.avatar || "",
      }));

      setSuccess(res);
    } catch (error) {
      setError(error || "Role updated failed");
    }
  };




  const errorHandler = (err) => {

    if (error === null) { return }
    toast.error(err?.response?.data?.message || "something went wrong");
    setError(null)

  }

  const successHandler = (success) => {

    if (success === null) { return }
    toast.success(success?.data?.message || success);
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
        handleUpdateRole,
        handleUpdateAvatar,
        isLoggedIn,
        loading,
        error,
        login,
        register,
        logout,
        verifyOtp,
        verifyEmailOTPForPassword,
        sendOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;