import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import {
  type Session,
  type Permission,
  getSession,
  clearSession,
  loginUser as storeLogin,
} from "./adminStore";

// ── Context ───────────────────────────────────────────────────────────────

interface AdminAuthCtx {
  session: Session | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  hasPermission: (perm: Permission) => boolean;
  isOwner: () => boolean;
}

const AdminAuthContext = createContext<AdminAuthCtx | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const stored = getSession();
    setSession(stored);
    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string,
  ): Promise<{ ok: boolean; error?: string }> => {
    // Small artificial delay for UX feel
    await new Promise((r) => setTimeout(r, 600));
    const sess = storeLogin(email, password);
    if (!sess) {
      return { ok: false, error: "Invalid email or password." };
    }
    setSession(sess);
    return { ok: true };
  };

  const logout = () => {
    clearSession();
    setSession(null);
  };

  const hasPermission = (perm: Permission): boolean => {
    if (!session) return false;
    return session.permissions.includes(perm);
  };

  const isOwner = (): boolean => session?.role === "owner";

  return (
    <AdminAuthContext.Provider
      value={{ session, isLoading, login, logout, hasPermission, isOwner }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────

export function useAdminAuth(): AdminAuthCtx {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error("useAdminAuth must be used inside <AdminAuthProvider>");
  }
  return ctx;
}
