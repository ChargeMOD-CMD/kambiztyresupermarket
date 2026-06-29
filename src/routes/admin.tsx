import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { AdminAuthProvider } from "@/lib/adminAuth";
import AdminGuard from "@/components/admin/AdminGuard";
import { seedIfEmpty } from "@/lib/adminStore";

export const Route = createFileRoute("/admin")({
  beforeLoad: () => {
    // Seed default products on first visit
    if (typeof window !== "undefined") {
      seedIfEmpty();
    }
  },
  component: AdminRoot,
});

function AdminRoot() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/admin/login";

  return (
    <AdminAuthProvider>
      {isLoginPage ? (
        <Outlet />
      ) : (
        <AdminGuard>
          <Outlet />
        </AdminGuard>
      )}
    </AdminAuthProvider>
  );
}
