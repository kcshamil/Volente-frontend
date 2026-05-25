import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function AdminLogin() {
  const [form, setForm] = useState({
    username: "admin",
    password: "admin123",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Auto redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (token) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${API_URL}/admin/login`,
        form
      );

      // Check token exists
      if (res.data?.token) {
        localStorage.setItem("adminToken", res.data.token);

        navigate("/admin/dashboard");
      } else {
        setError("Token not received from server");
      }

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0eb] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-[#ede7df]">

        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-light text-[#2c2c2c] mb-2"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Admin Portal
          </h1>

          <p className="text-xs uppercase tracking-widest text-[#a89880]">
            Manage Volente Store
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >

          {/* Username */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#7a6e65] mb-2">
              Username
            </label>

            <input
              type="text"
              required
              autoComplete="username"
              className="w-full bg-[#fcfaf8] border border-[#ede7df] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2c2c2c] transition-colors"
              value={form.username}
              onChange={(e) =>
                setForm({
                  ...form,
                  username: e.target.value,
                })
              }
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#7a6e65] mb-2">
              Password
            </label>

            <input
              type="password"
              required
              autoComplete="current-password"
              className="w-full bg-[#fcfaf8] border border-[#ede7df] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2c2c2c] transition-colors"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs text-red-500 text-center">
              {error}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2c2c2c] text-white py-4 rounded-xl text-[11px] uppercase tracking-widest hover:bg-[#1a1a1a] transition-all disabled:opacity-50"
          >
            {loading
              ? "Logging in..."
              : "Enter Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}