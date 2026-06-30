import { Link, useLocation } from "@tanstack/react-router";
import { useAdminAuth } from "@/lib/adminAuth";
import { useTheme } from "@/hooks/useTheme";
import {
  LayoutDashboard,
  Package,
  Users,
  LogOut,
  ExternalLink,
  ChevronRight,
  Shield,
  Menu,
  X,
  ShoppingCart,
  UserCheck,
  Sun,
  Moon,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { 
    label: "Inventory", 
    icon: Package, 
    children: [
      { to: "/admin/products", label: "Products" },
      { to: "/admin/brands", label: "Brands" },
    ] 
  },
  { to: "/admin/customers", label: "Customers", icon: UserCheck },
  { to: "/admin/users", label: "Team Admin", icon: Users },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { session, logout } = useAdminAuth();
  const { toggle, isDark } = useTheme();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inventoryExpanded, setInventoryExpanded] = useState(
    location.pathname.startsWith("/admin/products") || location.pathname.startsWith("/admin/brands")
  );

  const initials =
    session?.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) ?? "A";

  return (
    <div className="flex min-h-screen bg-background font-sans">
      {/* ── Mobile overlay ────────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ────────────────────────────────────────── */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-border bg-card transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-border px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight">Kambiz Admin</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">
              Control Panel
            </div>
          </div>
          <button
            className="ml-auto lg:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
          {navItems.map((item) => {
            if (item.children) {
              const activeChild = item.children.some(child => location.pathname.startsWith(child.to));
              return (
                <div key={item.label} className="space-y-1">
                  <button
                    onClick={() => setInventoryExpanded(!inventoryExpanded)}
                    className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                      activeChild && !inventoryExpanded
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    {item.label}
                    <ChevronDown className={`ml-auto h-3.5 w-3.5 opacity-70 transition-transform ${inventoryExpanded ? "rotate-180" : ""}`} />
                  </button>
                  {inventoryExpanded && (
                    <div className="pl-9 pr-2 space-y-1 py-1">
                      {item.children.map(child => {
                        const childActive = location.pathname.startsWith(child.to);
                        return (
                          <Link
                            key={child.to}
                            to={child.to}
                            onClick={() => setSidebarOpen(false)}
                            className={`block rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 ${
                              childActive
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                            }`}
                          >
                            {child.label}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const active = location.pathname.startsWith(item.to!);
            return (
              <Link
                key={item.to}
                to={item.to!}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                  active
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {item.label}
                {active && <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-70" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="border-t border-border p-3 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-150"
          >
            <ExternalLink className="h-4 w-4" />
            View Website
          </a>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-150"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </button>
        </div>

        {/* User info */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary text-sm font-bold">
              {initials}
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">{session?.name}</div>
              <div className="truncate text-[11px] text-muted-foreground capitalize">
                {session?.role}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main area ──────────────────────────────────────── */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-card/80 backdrop-blur px-4 sm:px-6">
          <button
            className="text-muted-foreground hover:text-foreground lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <div className="text-sm font-semibold capitalize">
              {navItems.find((n) => !n.children && location.pathname.startsWith(n.to!))?.label ?? 
               navItems.find((n) => n.children?.some(c => location.pathname.startsWith(c.to)))?.children?.find(c => location.pathname.startsWith(c.to))?.label ?? 
               "Admin Panel"}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <div className="hidden sm:block text-xs text-muted-foreground">{session?.email}</div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold">
              {initials}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
