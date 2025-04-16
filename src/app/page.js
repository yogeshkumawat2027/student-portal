"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative overflow-hidden"
      style={{ backgroundImage: "url('/img.png')" }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-gray-900/50"></div>

      <div className="relative bg-white/90 backdrop-blur-lg rounded-2xl p-10 text-center max-w-3xl shadow-2xl mx-6 transform transition-all duration-500 hover:scale-105">
        {/* Logo/Image - Uncomment if needed */}
        {/* <img
          src="/hero.svg"
          alt="Hero"
          className="mx-auto mb-8 w-2/3 md:w-1/3 transition-transform duration-300 hover:scale-110"
        /> */}

        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-6 tracking-tight animate-fade-in-down">
          Welcome to Student Portal
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto animate-fade-in-up">
          Register your account to access student services, courses, and more with ease.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push("/signup")}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Get Started
          </button>
          <button
            onClick={() => router.push("/login")}
            className="px-8 py-4 bg-green-600 text-white rounded-xl text-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Sign In
          </button>
          {/* <button
            onClick={() => router.push("/admin/login")}
            className="px-8 py-4 bg-orange-600 text-white rounded-xl text-lg font-semibold hover:bg-orange-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Admin Login
          </button> */}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.6s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
}