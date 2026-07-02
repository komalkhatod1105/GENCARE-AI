import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { formatError } from "@/lib/api";
import { Heart } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(formatError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="flex items-center gap-2 mb-8 justify-center"
        >
          <div className="w-9 h-9 rounded-md bg-[#B91C1C] flex items-center justify-center">
            <Heart
              className="w-5 h-5 text-white"
              strokeWidth={1.5}
            />
          </div>

          <div className="font-heading font-bold text-lg">
            GeneCare
            <span className="text-[#B91C1C]">.AI</span>
          </div>
        </Link>

        <div className="bg-white border border-[#E5E1D8] rounded-md p-8">
          <h1 className="font-heading text-2xl font-medium">Welcome Back</h1>
          <p className="text-sm text-[#6B726C] mt-1">Sign in to your account</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="overline block mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
              />
            </div>

            <div>
              <label className="overline block mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
              />
            </div>

            {error && (
              <div className="text-sm text-[#C85A40]">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2.5 rounded-md bg-[#B91C1C] text-white hover:bg-[#991B1B] disabled:opacity-60 transition-colors"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="text-sm text-[#6B726C] text-center mt-6">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-[#B91C1C] font-medium hover:underline"
            >
              Create One
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
