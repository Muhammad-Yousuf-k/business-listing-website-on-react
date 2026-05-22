import { userModel } from "../models/user.model.js";
import saveToken from "../utils/saveToken.js";
import { verifyOtp, sendVerificationOtp } from "../utils/otpHandle.js";
import cloudinary from "../config/cloudinary.js";

/* REGISTER */
export const register = async (req, res, next) => {
  try {
    const { name, email, password, address, role } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
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

    const otpResult = await sendVerificationOtp(user, "verify_email");

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

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User Not Found",
      });

    }

    if (!(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!user.isVerified) {
      const otpResult = await sendVerificationOtp(user, "verify_email")

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

/* UPDATE ROLE */
export const updateRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    const { _id } = req.user;

    const user = await userModel.findOne({ _id })

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User Not Found",
      });

    }

    user.role = role;
    await user.save();


    res.status(200).json({
      success: true,
      message: "Role updated successfully",
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};

/* UPDATE AVATAR */
export const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "avatars",
    });

    console.log(result);


    await userModel.findByIdAndUpdate(req.user._id, {
      avatar: result.secure_url,
    });

    res.status(200).json({
      success: true,
      avatar: result.secure_url,
    });
  } catch (error) {
    next(error);
  }
};


/* verify otp */
export const OtpVerify = async (req, res, next) => {

  try {
    const { email, otp, purpose, newPassword } = req.body
    const result = await verifyOtp(email, otp, purpose)
    if (!result.success) {
      return res.status(401).json({
        success: false,
        message: result.message,
      });
    }
    const user = await userModel.findOne({ email });

    if (purpose === "verify_email") {
      user.isVerified = true;
      await user.save();
    }

    if (purpose === "reset_password") {
      if (!newPassword) {
        user.password = newPassword;
        await user.save();
      }
    }

    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    next(error);  // Pass the error to the error handler middleware
  }
};

/* SEND OTP */
export const sendOtp = async (req, res, next) => {
  try {
    const { email, purpose } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otpResult = await sendVerificationOtp(user, purpose)

    if (!otpResult?.success) {
      return res.status(400).json(otpResult);
    }

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
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
      message: "User data",
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
        role: req.user.role,
        address: req.user.address,
        isVerified: req.user.isVerified,
      },
    });
  } catch (error) {
    next(error);
  }
};
