"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  User,
  School,
  IdCard,
  BookOpen,
  Calendar,
  Phone,
  MapPin,
  Mail,
  Lock,
  ShieldCheck
} from "lucide-react";

export default function Signup() {
  console.log("Hii");
  
  const [form, setForm] = useState({
    name: "",
    college: "",
    rollNo: "",
    branch: "",
    dob: "",
    gender: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
  });



  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

    

      const data = await res.json();
      if (res.ok) {
        setShowOtpInput(true);
        setMessage("OTP sent to your email!");
      } else {
        setMessage(data.error || "Signup failed");
      }
    } catch (error) {
      setMessage("Error signing up");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/otp-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, otp }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsRegistered(true);
        setMessage("Account verified! Redirecting...");
        setTimeout(() => router.push("/login"), 4000);
      } else {
        setMessage(data.error || "OTP verification failed");
      }
    } catch (error) {
      setMessage("Error verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-no-repeat bg-cover bg-center"
      style={{
        
      }}
    >
      {/* Profile details container now in light theme */}
      <div className="relative z-10 p-8 max-w-md w-full mx-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl">
        {!isRegistered ? (
          <>
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-2 ">
              <ShieldCheck className="inline mr-2" />
              Sign Up
            </h2>
            <p className="text-center text-gray-800 mb-4 text-sm">
              Create your account to access your college dashboard.
            </p>

            {loading && (
              <div className="w-full h-1 bg-gray-300 mb-3">
                <div className="h-full bg-blue-600 "></div>
              </div>
            )}

            {!showOtpInput ? (
              <form onSubmit={handleSignup} className="space-y-3 ">
                {[
                  { name: "name", placeholder: "Full Name", icon: <User size={16} /> },
                  { name: "college", placeholder: "College Name", icon: <School size={16} /> },
                  { name: "rollNo", placeholder: "Roll Number", icon: <IdCard size={16} /> },
                  { name: "branch", placeholder: "Branch", icon: <BookOpen size={16} /> },
                ].map(({ name, placeholder, icon }) => (
                  <div className="relative" key={name}>
                    <span className="absolute left-2 top-2 text-gray-500">{icon}</span>
                    <input
                      type="text"
                      name={name}
                      placeholder={placeholder}
                      value={form[name]}
                      onChange={handleChange}
                      required
                      className="w-full pl-8 p-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring focus:border-blue-400 transition bg-white text-gray-800"
                    />
                  </div>
                ))}

                <div className="relative">
                  <span className="absolute left-2 top-2 text-gray-500">
                    <Calendar size={16} />
                  </span>
                  <input
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                    required
                    className="w-full pl-8 p-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring focus:border-blue-400 transition bg-white text-gray-800"
                  />
                </div>

                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring focus:border-blue-400 transition bg-white text-gray-800"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>

                <div className="relative">
                  <span className="absolute left-2 top-2 text-gray-500">
                    <Phone size={16} />
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-8 p-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring focus:border-blue-400 transition bg-white text-gray-800"
                  />
                </div>

                <div className="relative">
                  <span className="absolute left-2 top-2 text-gray-500">
                    <MapPin size={16} />
                  </span>
                  <textarea
                    name="address"
                    placeholder="Address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    className="w-full pl-8 p-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring focus:border-blue-400 transition bg-white text-gray-800"
                  />
                </div>

                <div className="relative">
                  <span className="absolute left-2 top-2 text-gray-500">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-8 p-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring focus:border-blue-400 transition bg-white text-gray-800"
                  />
                </div>

                <div className="relative">
                  <span className="absolute left-2 top-2 text-gray-500">
                    <Lock size={16} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-8 pr-10 p-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring focus:border-blue-400 transition bg-white text-gray-800"
                  />
                  <span
                    className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                </div>

                <div className="relative">
                  <span className="absolute left-2 top-2 text-gray-500">
                    <Lock size={16} />
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-8 pr-10 p-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring focus:border-blue-400 transition bg-white text-gray-800"
                  />
                  <span
                    className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-2 rounded-sm hover:bg-blue-700 text-sm transition transform hover:scale-105"
                >
                  {loading ? "Signing up..." : "Signup"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-3 ">
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring focus:border-green-400 transition bg-white text-gray-800"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-2 rounded-sm hover:bg-blue-700 text-sm transition transform hover:scale-105"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </form>
            )}

            {message && (
              <p className="text-red-600 mt-3 text-xs text-center ">
                {message}
              </p>
            )}
          </>
        ) : (
          <div className="text-center py-10 animate-fadeIn space-y-4">
            <div className="text-5xl animate-bounce">🎉</div>
            <h2 className="text-2xl font-bold text-green-700">Congratulations!</h2>
            <p className="text-gray-800 text-sm">Your registration is complete.</p>
            <p className="text-gray-600 text-sm italic">Redirecting to login...</p>
          </div>
        )}
      </div>
    </div>
  );
}
