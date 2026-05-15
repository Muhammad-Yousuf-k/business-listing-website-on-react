import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { toast } from "react-toastify";


const colors = {
    primary: "#085db7",
    secondary: "#f7f8f9",
    accent: "#f1592a",
    gray: "#6a7282",
    black: "#000000",
    white: "#ffffff",
};

export default function OTPVerify() {
    const { verifyOTP, resendOTP } = useUser();
    const navigate = useNavigate();

    const [otp, setOtp] = useState(Array(6).fill(""));
    const [status, setStatus] = useState("idle"); // idle | loading | success | error
    const [shake, setShake] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(null);
    const inputRefs = useRef([]);
    const location = useLocation();
    const email = location.state?.email;

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const digit = value.slice(-1);
        const newOtp = [...otp];
        newOtp[index] = digit;
        setOtp(newOtp);
        if (digit && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace") {
            if (otp[index]) {
                const newOtp = [...otp];
                newOtp[index] = "";
                setOtp(newOtp);
            } else if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        } else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowRight" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        if (!pasted) return;
        const newOtp = [...otp];
        pasted.split("").forEach((char, i) => {
            if (i < 6) newOtp[i] = char;
        });
        setOtp(newOtp);
        const nextEmpty = newOtp.findIndex((d) => d === "");
        inputRefs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus();
    };

    const handleVerify = async () => {
        setStatus("loading")

        const finalOtp = otp.join('');
        // function to verify OTP goes here, using finalOtp variable
        let result = await verifyOTP(email, finalOtp, "verify_email");

        if (!result) {
            toast.error("somthing went wrong, plz click resend Otp")
            setStatus("error")
        }

        navigate("/login")
        setStatus("success")
    };

    const handleResend = () => {
        setOtp(Array(6).fill(""));
        setStatus("idle");
        inputRefs.current[0]?.focus();
        // function to resend OTP goes here
        resendOTP(email, "verify_email");
    };

    const isFilled = otp.every((d) => d !== "");

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{ backgroundColor: colors.secondary, fontFamily: "'DM Sans', sans-serif" }}
        >
            <link
                href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Sora:wght@600;700&display=swap"
                rel="stylesheet"
            />

            <div
                className="w-full max-w-md rounded-2xl overflow-hidden"
                style={{
                    backgroundColor: colors.white,
                    boxShadow: "0 8px 40px rgba(8,93,183,0.10), 0 1.5px 6px rgba(8,93,183,0.06)",
                }}
            >
                {/* Top accent bar */}
                <div style={{ height: 5, background: `linear-gradient(90deg, ${colors.primary} 60%, ${colors.accent} 100%)` }} />

                <div className="px-8 pt-10 pb-10">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center"
                            style={{ backgroundColor: `${colors.primary}12` }}
                        >
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <rect x="4" y="10" width="24" height="16" rx="3" stroke={colors.primary} strokeWidth="2" />
                                <path d="M10 10V8a6 6 0 1 1 12 0v2" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
                                <circle cx="16" cy="18" r="2.5" fill={colors.accent} />
                                <path d="M16 20.5V23" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="text-center mb-1">
                        <h1
                            className="text-2xl font-bold tracking-tight"
                            style={{ fontFamily: "'Sora', sans-serif", color: colors.black }}
                        >
                            Verify your identity
                        </h1>
                    </div>
                    <p className="text-center text-sm mb-8" style={{ color: colors.gray }}>
                        Enter the 6-digit code sent to{" "}
                        <span className="font-semibold" style={{ color: colors.primary }}>
                            {email || "y*****f@gmail.com"}
                        </span>
                    </p>

                    {/* OTP Inputs */}
                    <div
                        className={`flex justify-center gap-3 mb-6 ${shake ? "animate-shake" : ""}`}
                        style={shake ? { animation: "shake 0.45s ease" } : {}}
                    >
                        {otp.map((digit, i) => {
                            const isFocused = focusedIndex === i;
                            const hasValue = digit !== "";
                            let borderColor = colors.gray + "44";
                            if (status === "error") borderColor = "#ef4444";
                            else if (status === "success") borderColor = "#22c55e";
                            else if (isFocused) borderColor = colors.primary;
                            else if (hasValue) borderColor = colors.primary + "88";

                            return (
                                <input
                                    key={i}
                                    ref={(el) => (inputRefs.current[i] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(i, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(i, e)}
                                    onPaste={handlePaste}
                                    onFocus={() => setFocusedIndex(i)}
                                    onBlur={() => setFocusedIndex(null)}
                                    disabled={status === "loading" || status === "success"}
                                    className="w-11 h-14 text-center text-xl font-bold rounded-xl outline-none transition-all duration-150 select-none"
                                    style={{
                                        border: `2px solid ${borderColor}`,
                                        color: colors.black,
                                        backgroundColor:
                                            status === "success"
                                                ? "#f0fdf4"
                                                : status === "error"
                                                    ? "#fef2f2"
                                                    : isFocused
                                                        ? `${colors.primary}08`
                                                        : colors.secondary,
                                        caretColor: colors.primary,
                                        boxShadow: isFocused ? `0 0 0 3px ${colors.primary}18` : "none",
                                        transform: isFocused ? "translateY(-2px)" : "translateY(0)",
                                    }}
                                />
                            );
                        })}
                    </div>

                    {/* Status message */}
                    <div className="h-5 flex justify-center items-center mb-5">
                        {status === "error" && (
                            <p className="text-sm font-medium flex items-center gap-1" style={{ color: "#ef4444" }}>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <circle cx="7" cy="7" r="6" stroke="#ef4444" strokeWidth="1.5" />
                                    <path d="M7 4v3.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                                    <circle cx="7" cy="10" r="0.75" fill="#ef4444" />
                                </svg>
                                Invalid code. Please try again.
                            </p>
                        )}
                        {status === "success" && (
                            <p className="text-sm font-medium flex items-center gap-1" style={{ color: "#22c55e" }}>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <circle cx="7" cy="7" r="6" stroke="#22c55e" strokeWidth="1.5" />
                                    <path d="M4.5 7l2 2 3-3" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Verification successful!
                            </p>
                        )}
                    </div>

                    {/* Verify Button */}
                    <button
                        onClick={handleVerify}
                        disabled={status === "loading" || status === "success"}
                        className="w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-150 flex items-center justify-center gap-2"
                        style={{
                            backgroundColor:
                                status === "success"
                                    ? "#22c55e"
                                    : !isFilled
                                        ? colors.primary + "55"
                                        : colors.primary,
                            color: colors.white,
                            cursor: status === "loading" || status === "success" ? "default" : !isFilled ? "not-allowed" : "pointer",
                            boxShadow: isFilled && status === "idle" ? `0 4px 14px ${colors.primary}40` : "none",
                            transform: isFilled && status === "idle" ? "translateY(0)" : "none",
                        }}
                    >
                        {status === "loading" ? (
                            <>
                                <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="2" strokeOpacity="0.3" />
                                    <path d="M8 2a6 6 0 0 1 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                Verifying...
                            </>
                        ) : status === "success" ? (
                            <>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M3 8l3.5 3.5 6.5-6.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Verified
                            </>
                        ) : (
                            "Verify Code"
                        )}
                    </button>

                    {/* Resend */}
                    <div className="mt-5 text-center text-sm" style={{ color: colors.gray }}>
                        Didn't receive the code?{" "}
                        <button
                            onClick={handleResend}
                            className="font-semibold transition-colors duration-150"
                            style={{ color: colors.accent }}
                            onMouseEnter={(e) => (e.target.style.color = colors.primary)}
                            onMouseLeave={(e) => (e.target.style.color = colors.accent)}
                        >
                            Resend
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          18% { transform: translateX(-6px); }
          36% { transform: translateX(6px); }
          54% { transform: translateX(-4px); }
          72% { transform: translateX(4px); }
          90% { transform: translateX(-2px); }
        }
        .animate-shake {
          animation: shake 0.45s ease;
        }
      `}</style>
        </div>
    );
}