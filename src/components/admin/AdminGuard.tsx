import { useAdminAuth } from "@/lib/adminAuth";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

/** Redirects unauthenticated visitors to /admin/login. Renders children otherwise. */
export default function AdminGuard({ children }: { children: ReactNode }) {
  const { session, isLoading } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !session) {
      navigate({ to: "/admin/login" });
    }
  }, [session, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!session) return null;
  return <>{children}</>;
}
