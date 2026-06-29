import { useState, useEffect } from "react";
import { X, Mail, Lock, User, Phone, Loader2 } from "lucide-react";
import { loginCustomer, registerCustomer } from "@/lib/shopStore";
import { toast } from "sonner";

export default function AuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setMode("login");
    };
    window.addEventListener("kambiz_require_login", handleOpen);
    return () => window.removeEventListener("kambiz_require_login", handleOpen);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Small simulated delay for UX
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Simple mock hash just for local demonstration
      const mockHash = btoa(password + "salt");

      if (mode === "login") {
        loginCustomer(email, mockHash);
        toast.success("Welcome back!");
      } else {
        registerCustomer({
          name,
          email,
          mobile,
          passwordHash: mockHash,
        });
        toast.success("Account created successfully!");
      }

      setIsOpen(false);
      resetForm();
    } catch (err: any) {
      toast.error(err.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setMobile("");
    setPassword("");
  };

  const closeModal = () => {
    setIsOpen(false);
    resetForm();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
      <div className="bg-card glass-strong w-full max-w-md rounded-3xl border border-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="text-xl font-bold font-display">
            {mode === "login" ? "Sign In" : "Create Account"}
          </h3>
          <button
            onClick={closeModal}
            className="h-8 w-8 rounded-full bg-surface flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-8">
          <div className="flex bg-surface p-1 rounded-xl mb-6">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${mode === "login" ? "bg-primary text-background shadow-glow" : "text-muted-foreground hover:text-foreground"}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${mode === "register" ? "bg-primary text-background shadow-glow" : "text-muted-foreground hover:text-foreground"}`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="admin-input pl-10"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="admin-input pl-10"
                  />
                </div>
              </>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="admin-input pl-10"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-input pl-10"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-hero w-full h-12 mt-4 text-sm disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          {mode === "login" && (
            <p className="text-center text-xs text-muted-foreground mt-6 cursor-pointer hover:text-primary transition-colors">
              Forgot your password?
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
