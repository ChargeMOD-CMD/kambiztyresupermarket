import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAdminAuth } from "@/lib/adminAuth";
import { useState, useEffect } from "react";
import { Eye, EyeOff, ShieldCheck, AlertCircle, Loader2, Disc } from "lucide-react";
import { motion } from "framer-motion";
import loginBg from "@/assets/login-bg.png";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const { session, login } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Already logged in → go to dashboard
  useEffect(() => {
    if (session) navigate({ to: "/admin/dashboard" });
  }, [session, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (!result.ok) {
      setError(result.error ?? "Login failed.");
    } else {
      navigate({ to: "/admin/dashboard" });
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* ── Highly Animated Background ── */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-zinc-950">
        {/* The background image with a sweeping pan animation using DOM backgroundImage */}
        <motion.div
          className="absolute inset-0 h-full w-[120%] max-w-none bg-cover bg-center opacity-70"
          style={{ backgroundImage: `url(${loginBg})` }}
          animate={{ x: ["0%", "-10%", "0%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        {/* Dynamic color dodge overlay for a premium neon feel */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 mix-blend-color-dodge" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      {/* Floating Ambient Particles for extra movement */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/20 blur-xl"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 30, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Decorative glowing orb behind the form */}
        <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-60 pointer-events-none" />

        {/* Logo Section */}
        <div className="mb-8 text-center relative">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 ring-1 ring-primary/30 shadow-glow relative">
            {/* Spinning inner disc resembling a tyre/wheel */}
            <Disc className="absolute h-16 w-16 text-primary/20 animate-spin-slow" />
            <ShieldCheck className="relative z-10 h-8 w-8 text-primary drop-shadow-[0_0_8px_rgba(255,102,0,0.8)]" />
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-white drop-shadow-md">
            Admin Portal
          </h1>
          <p className="mt-2 text-sm text-primary/80 font-medium tracking-wide uppercase">
            Kambiz Tyre Supermarket
          </p>
        </div>

        {/* Card */}
        <div className="glass rounded-3xl p-8 shadow-xl ring-1 ring-border">
          <form onSubmit={handleSubmit} className="space-y-5" id="admin-login-form">
            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="admin-email" className="block text-sm font-medium">
                Email address
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="admin-input"
                placeholder="Enter User ID"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="admin-password" className="block text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPw ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="admin-input pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              id="admin-login-submit"
              type="submit"
              disabled={loading}
              className="btn-hero w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ShieldCheck className="h-4 w-4" />
              )}
              {loading ? "Verifying…" : "Sign In"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <a href="/" className="underline-offset-2 hover:underline">
            ← Back to website
          </a>
        </p>
      </motion.div>
    </div>
  );
}
