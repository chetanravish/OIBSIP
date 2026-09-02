import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  User,
  Mail,
  Calendar,
  LogOut,
  CheckCircle,
  Lock,
} from "lucide-react";
import { getDashboard } from "../api/devvault.api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/", { replace: true });
    return;
  }

  const fetchUser = async () => {
    try {
      const data = await getDashboard(token);
      setUser(data.user);
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-white">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#111827]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
            </div>

            <div>
              <h1 className="text-xl font-semibold">AuthVault</h1>
              <p className="text-xs text-gray-400">
                JWT Authentication Dashboard
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl text-sm font-medium transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* Welcome */}
        <div>
          <h2 className="text-3xl font-bold">
            Welcome, {user?.username || "User"} 👋
          </h2>
          <p className="text-gray-400 mt-2">
            You have successfully logged in using JWT Authentication.
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          <div className="bg-[#131826] rounded-2xl border border-white/5 p-5">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-400" />
              <span className="text-gray-300">Authentication</span>
            </div>
            <h3 className="text-2xl font-bold mt-3 text-green-400">
              Verified
            </h3>
          </div>

          <div className="bg-[#131826] rounded-2xl border border-white/5 p-5">
            <div className="flex items-center gap-3">
              <Lock className="text-blue-400" />
              <span className="text-gray-300">Session</span>
            </div>
            <h3 className="text-2xl font-bold mt-3">Active</h3>
          </div>

          <div className="bg-[#131826] rounded-2xl border border-white/5 p-5">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-purple-400" />
              <span className="text-gray-300">Protected Route</span>
            </div>
            <h3 className="text-2xl font-bold mt-3">Enabled</h3>
          </div>
        </div>

        {/* User Information */}
        <div className="bg-[#131826] rounded-2xl border border-white/5 p-6">
          <h3 className="text-xl font-semibold mb-5">Logged-in User</h3>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <User className="text-blue-400" />
              <div>
                <p className="text-xs text-gray-500">Username</p>
                <p className="font-medium">{user?.username}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="text-blue-400" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Calendar className="text-blue-400" />
              <div>
                <p className="text-xs text-gray-500">Account Created</p>
                <p className="font-medium">
                  {new Date(user?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Project Features */}
        <div className="bg-[#131826] rounded-2xl border border-white/5 p-6">
          <h3 className="text-xl font-semibold mb-4">
            OASIS Project Requirements
          </h3>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "User Registration",
              "Password Validation",
              "Duplicate Email Check",
              "Bcrypt Password Hashing",
              "JWT Login",
              "Protected Dashboard",
              "Session using LocalStorage",
              "Secure Logout",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-gray-300"
              >
                <CheckCircle size={16} className="text-green-400" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}