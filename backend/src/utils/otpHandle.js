import { userModel } from "../models/user.model.js";
import { sendEmail } from "./sendEmail.js";
import { env } from "../config/env.js";

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function createOtp(email, purpose) {
  const otp = generateOtp();

  const user = await userModel.findOne({ email });

  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  user.otp = {
    value: otp,
    purpose,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  };

  await user.save();

  return {
    success: true,
    otp,
  };
}

export async function verifyOtp(email, otp, purpose) {
  const user = await userModel.findOne({ email });

  if (!user || !user.otp?.value) {
    return {
      success: false,
      message: "Invalid OTP",
    };
  }

  if (user.otp.purpose !== purpose) {
    return {
      success: false,
      message: "Invalid OTP purpose",
    };
  }

  if (user.otp.expiresAt < new Date()) {
    user.otp = {
      value: null,
      purpose: null,
      expiresAt: null,
    };

    await user.save();

    return {
      success: false,
      message: "OTP expired",
    };
  }

  const isOtpCorrect = await user.compareOtp(otp);

  if (!isOtpCorrect) {
    return {
      success: false,
      message: "Invalid OTP",
    };
  }

  user.otp = {
    value: null,
    purpose: null,
    expiresAt: null,
  };

  return {
    success: true,
    message: "OTP verified",
  };
}

export const sendVerificationOtp = async (user, purpose) => {
  const otpResult = await createOtp(user.email, purpose);

  if (!otpResult.success) {
    return otpResult;
  }

  /* will remove in production */
  if (env.nodeEnv === "development") {
    console.log("otp", otpResult?.otp);
    return {
      success: true,
      message: "OTP sent to email",
    };

  }

  await sendEmail({
    to: user.email,
    subject: "to process verify by your email",
    html: `
      <h2>Your verification code</h2>
      <p>Use this code to verify your Rank Eats account:</p>
      <h1>${otpResult.otp}</h1>
      <p>This code will expire in 5 minutes.</p>
      <p>If you did not request this, you can ignore this email.</p>
    `,
  });

  return {
    success: true,
    message: "OTP sent to email",
  };
};