import { userModel } from "../models/user.model.js";
import saveToken from "../utils/saveToken.js";
import { verifyOtp, sendVerificationOtp } from "../utils/otpHandle.js";

/* REGISTER */
export const register = async (req, res, next) => {
  try {
    const { name, email, password, address, role } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser?.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await userModel.create({
      name,
      email,
      password,
      role,
      address,
    });

    const otpResult = await sendVerificationOtp(user);

    if (!otpResult.success) {
      return res.status(400).json(otpResult);
    }

    res.status(201).json({
      success: true,
      message: "Registered successfully. OTP sent to email.",
    });
  } catch (error) {
    next(error);
  }
};

/* LOGIN */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel
      .findOne({ email })
      .select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!user.isVerified) {
      const otpResult = await sendVerificationOtp(user);

      if (!otpResult.success) {
        return res.status(400).json(otpResult);
      }

      return res.status(403).json({
        success: false,
        message: "Please verify your email. New OTP sent to email.",
        errorCode: "435345",
      });
    }

    saveToken(res, user);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/* verify otp */
export const otpVerify = async (req, res, next) => {

  try {
    const { email, otp, purpose } = req.body
    const result = await verifyOtp(email, otp, purpose)
    if (!result.success) {
      return res.status(401).json({
        success: false,
        message: result.message,
      });
    }
    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    next(error);  // Pass the error to the error handler middleware
  }
};

/* RESEND OTP */
export const resendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user?.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email already verified",
      });
    }

    const otpResult = await sendVerificationOtp(user);

    if (!otpResult?.success) {
      return res.status(400).json(otpResult);
    }

    res.status(200).json({
      success: true,
      message: "OTP resent successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user?.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email already verified",
      });
    }

    const otpResult = await sendVerificationOtp(user);

    if (!otpResult?.success) {
      return res.status(400).json(otpResult);
    }

    res.status(200).json({
      success: true,
      message: "OTP resent successfully",
    });
  } catch (error) {
    next(error);
  }
};

/* LOGOUT */
export const logout = async (req, res) => {

  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

/* CHECK USER */
export const checkUser = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      successCode: "345225",
      message: "User data",
      user: req.user,
    });
  } catch (error) {
    next(error);  // Pass the error to the error handler middleware
  }
};
