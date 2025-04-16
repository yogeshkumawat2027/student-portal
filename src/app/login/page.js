"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  // Shared state for login and reset form email (you might separate if needed)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login-specific states
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Reset password states
  const [view, setView] = useState("login"); // "login" or "reset"
  const [resetStep, setResetStep] = useState(1); // 1: send OTP, 2: reset password
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Login function
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (err) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Reset password: Step 1 - Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMsg("");
    setIsSendingOtp(true);

    try {
      // Replace with your actual API call to send OTP
      const res = await fetch("/api/request-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMsg(data.error || "Failed to send OTP");
        setIsSendingOtp(false);
        return;
      }
      // If success, move to next step
      setResetStep(2);
    } catch (err) {
      setMsg("Something went wrong while sending OTP!");
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Reset password: Step 2 - Reset Password using OTP
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMsg("");
    if (newPassword !== confirmNewPassword) {
      setMsg("Passwords do not match!");
      return;
    }
    setIsResetting(true);

    try {
      // Replace with your actual API call to reset password
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMsg(data.error || "Failed to reset password");
        setIsResetting(false);
        return;
      }
      // After successful reset, return to login view
      setMsg("Password reset successful! Please log in.");
      setResetStep(1);
      setView("login");
      // Optionally clear reset form states
      setOtp("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      setMsg("Something went wrong during password reset!");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 p-8 max-w-md w-full mx-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl">
        {view === "login" && (
          <>
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-600 drop-shadow-md">
              Welcome Back
            </h2>
            {error && (
              <p className="text-red-500 text-center mb-4 text-sm">{error}</p>
            )}
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">
                  <Mail size={20} />
                </span>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 p-3 rounded bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">
                  <Lock size={20} />
                </span>
                <input
                  type={password ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-12 p-3 rounded bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                  onClick={() =>
                    setPassword((prev) =>
                      prev ? "" : prev
                    ) // You can add toggle logic here if you maintain a showPassword state.
                  }
                >
                  {password ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    // Switch view to reset password
                    setView("reset");
                    setResetStep(1);
                    setMsg("");
                  }}
                  className="text-blue-600 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            {loading && (
              <div className="w-full h-1 bg-blue-100 mt-6 overflow-hidden rounded">
                <div className="h-full bg-blue-600" style={{ width: "100%" }}></div>
              </div>
            )}
          </>
        )}

        {/* Reset Password Form */}
        {view === "reset" && (
          <>
            {resetStep === 1 ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
                  Reset Password
                </h2>
                {/* Email Field with Icon */}
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Mail size={20} />
                  </span>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-2 pl-10 border border-gray-300 rounded text-gray-900"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {msg && <p className="text-sm text-red-500">{msg}</p>}
                <button
                  type="submit"
                  disabled={isSendingOtp}
                  className={`w-full bg-blue-600 text-white py-2 rounded transition-colors duration-300 ${
                    isSendingOtp ? "cursor-not-allowed bg-blue-500" : "hover:bg-blue-500"
                  }`}
                >
                  {isSendingOtp ? (
                    <div className="flex justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    "Send OTP"
                  )}
                </button>
                <div className="text-center">
                  <button
                    onClick={() => setView("login")}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Back to Login
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">
                  Reset Password
                </h2>
                <p className="text-sm text-gray-700">
                  Enter the OTP sent to <span className="font-semibold">{email}</span>
                </p>
                <input
                  type="text"
                  placeholder="OTP"
                  className="w-full p-2 border border-gray-300 rounded text-gray-900"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />

                {/* New Password Field with Icon & Toggle */}
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Lock size={20} />
                  </span>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New Password"
                    className="w-full p-2 pl-10 pr-10 border border-gray-300 rounded text-gray-900"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Confirm New Password Field with Icon & Toggle */}
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Lock size={20} />
                  </span>
                  <input
                    type={showConfirmNewPassword ? "text" : "password"}
                    placeholder="Confirm New Password"
                    className="w-full p-2 pl-10 pr-10 border border-gray-300 rounded text-gray-900"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {msg && <p className="text-sm text-red-500">{msg}</p>}

                <button
                  type="submit"
                  disabled={isResetting}
                  className={`w-full bg-blue-600 text-white py-2 rounded transition-colors duration-300 ${
                    isResetting ? "cursor-not-allowed bg-blue-500" : "hover:bg-blue-500"
                  }`}
                >
                  {isResetting ? (
                    <div className="flex justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    "Reset Password"
                  )}
                </button>
                <div className="text-center">
                  <button
                    onClick={() => setView("login")}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Back to Login
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
