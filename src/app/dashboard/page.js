"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaIdBadge, FaBuilding, FaVenusMars, FaBirthdayCake, FaPhone, FaHome } from "react-icons/fa";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("/api/info", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (!user)
    return (
      <p className="text-center text-white text-lg mt-10 animate-pulse">
        Loading...
      </p>
    );

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black bg-cover bg-center flex items-center justify-center p-6"
      style={{ backgroundImage: "url('/img.png')" }}
    >
      <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-x3 p-8 w-full max-w-2xl text-black border border-white/20">
        <h1 className="text-3xl font-bold mb-4 text-center text-black">
          Welcome, {user.name || user.email}
        </h1>

        <p className="text-center italic text-gray-700 mb-6">
          “Here is your complete information.”
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-black">
          <p className="flex items-center gap-2"><FaEnvelope /> <strong>Email:</strong> {user.email}</p>
          <p className="flex items-center gap-2"><FaUser /> <strong>Name:</strong> {user.name || "-"}</p>
          <p className="flex items-center gap-2"><FaIdBadge /> <strong>Roll No:</strong> {user.rollNo || "-"}</p>
          <p className="flex items-center gap-2"><FaBuilding /> <strong>Branch:</strong> {user.branch || "-"}</p>
          <p className="flex items-center gap-2"><FaVenusMars /> <strong>Gender:</strong> {user.gender || "-"}</p>
          <p className="flex items-center gap-2"><FaBirthdayCake /> <strong>Date of Birth:</strong> {user.dob || "-"}</p>
          <p className="flex items-center gap-2"><FaPhone /> <strong>Phone:</strong> {user.phone || "-"}</p>
          <p className="flex items-center gap-2"><FaHome /> <strong>Address:</strong> {user.address || "-"}</p>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
