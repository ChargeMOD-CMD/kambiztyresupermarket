import { createFileRoute } from "@tanstack/react-router";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdminAuth } from "@/lib/adminAuth";
import {
  getUsers,
  addUser,
  deleteUser,
  hashPassword,
  ALL_PERMISSIONS,
  PERMISSION_LABELS,
  type AdminUser,
  type Permission,
} from "@/lib/adminStore";
import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  ShieldAlert,
  Users,
  Eye,
  EyeOff,
  Shield,
  CheckSquare,
  Square,
  X,
  Loader2,
  UserPlus,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsers,
});

function AccessDenied() {
  return (
    <AdminLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
          <ShieldAlert className="h-8 w-8 text-destructive" />
        </div>
        <h2 className="text-xl font-bold">Access Denied</h2>
        <p className="text-muted-foreground max-w-sm">You don't have permission to manage users.</p>
      </div>
    </AdminLayout>
  );
}

const EMPTY_USER = {
  name: "",
  email: "",
  password: "",
  permissions: ["dashboard", "products.view"] as Permission[],
};

function AdminUsers() {
  const { hasPermission, session } = useAdminAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_USER);
  const [showPw, setShowPw] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    setUsers(getUsers());
  }, []);

  if (!hasPermission("users.view")) return <AccessDenied />;

  const refresh = () => setUsers(getUsers());

  const togglePermission = (perm: Permission) => {
    setForm((f) => ({
      ...f,
      permissions: f.permissions.includes(perm)
        ? f.permissions.filter((p) => p !== perm)
        : [...f.permissions, perm],
    }));
  };

  const selectAll = () => setForm((f) => ({ ...f, permissions: [...ALL_PERMISSIONS] }));
  const clearAll = () => setForm((f) => ({ ...f, permissions: [] }));

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setFormError("All fields are required.");
      return;
    }
    const exists = users.some((u) => u.email.toLowerCase() === form.email.toLowerCase());
    if (exists) {
      setFormError("A user with this email already exists.");
      return;
    }
    if (form.permissions.length === 0) {
      setFormError("Grant at least one permission.");
      return;
    }

    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    addUser({
      name: form.name,
      email: form.email,
      passwordHash: hashPassword(form.password),
      role: "admin",
      permissions: form.permissions,
    });
    setSaving(false);
    refresh();
    setShowAdd(false);
    setForm(EMPTY_USER);
  };

  const handleDelete = (id: string) => {
    deleteUser(id);
    refresh();
    setDeleteId(null);
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Team Members</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {users.length} user{users.length !== 1 ? "s" : ""} · Only the owner can add members
          </p>
        </div>
        {hasPermission("users.add") && (
          <button
            id="users-add-btn"
            onClick={() => setShowAdd(true)}
            className="btn-hero text-sm py-2.5 px-5"
          >
            <UserPlus className="h-4 w-4" /> Add User
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="mb-5 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by Name or Email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-input pl-9 h-10 w-full"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="admin-input h-10 w-full sm:w-48 bg-surface/50"
        >
          <option value="All">All Roles</option>
          <option value="owner">Owner</option>
          <option value="admin">Admin</option>
          <option value="operator">Operator</option>
        </select>
      </div>

      {/* Users list */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl ring-1 ring-border overflow-hidden"
      >
        {users.filter((u) => {
          const matchSearch =
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase());
          const matchRole = roleFilter === "All" || u.role === roleFilter;
          return matchSearch && matchRole;
        }).length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
            <Users className="h-10 w-10 text-muted-foreground/40" />
            <div className="text-sm text-muted-foreground">No users found.</div>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {users
              .filter((u) => {
                const matchSearch =
                  u.name.toLowerCase().includes(search.toLowerCase()) ||
                  u.email.toLowerCase().includes(search.toLowerCase());
                const matchRole = roleFilter === "All" || u.role === roleFilter;
                return matchSearch && matchRole;
              })
              .map((user) => (
                <div
                  key={user.id}
                  className="flex items-start gap-4 p-5 hover:bg-surface/50 transition-colors"
                >
                  {/* Avatar */}
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-sm font-bold">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm">{user.name}</span>
                      {user.role === "owner" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 border border-primary/25 px-2 py-0.5 text-[10px] font-bold text-primary">
                          <Shield className="h-2.5 w-2.5" /> Owner
                        </span>
                      )}
                      {session?.userId === user.id && (
                        <span className="text-[10px] text-muted-foreground">(you)</span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{user.email}</div>
                    {/* Permissions */}
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {user.permissions.map((p) => (
                        <span
                          key={p}
                          className="inline-flex items-center rounded-full bg-secondary border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                        >
                          {PERMISSION_LABELS[p]}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Delete */}
                  {hasPermission("users.delete") &&
                    user.role !== "owner" &&
                    session?.userId !== user.id && (
                      <button
                        onClick={() => setDeleteId(user.id)}
                        className="flex-shrink-0 rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                        title="Delete user"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                </div>
              ))}
          </div>
        )}
      </motion.div>

      {/* Add user dialog */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 overflow-y-auto py-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass rounded-3xl p-7 w-full max-w-lg ring-1 ring-border shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15">
                  <UserPlus className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold">Add Team Member</h3>
                  <p className="text-xs text-muted-foreground">Set their access permissions</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowAdd(false);
                  setForm(EMPTY_USER);
                  setFormError("");
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} id="add-user-form" className="space-y-4">
              {/* Name */}
              <div className="space-y-1">
                <label
                  className="text-xs font-medium text-muted-foreground uppercase tracking-wider"
                  htmlFor="user-name"
                >
                  Full Name
                </label>
                <input
                  id="user-name"
                  required
                  className="admin-input"
                  placeholder="e.g. John Mathew"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
              </div>
              {/* Email */}
              <div className="space-y-1">
                <label
                  className="text-xs font-medium text-muted-foreground uppercase tracking-wider"
                  htmlFor="user-email"
                >
                  Email Address
                </label>
                <input
                  id="user-email"
                  type="email"
                  required
                  className="admin-input"
                  placeholder="user@kambiz.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </div>
              {/* Password */}
              <div className="space-y-1">
                <label
                  className="text-xs font-medium text-muted-foreground uppercase tracking-wider"
                  htmlFor="user-password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="user-password"
                    type={showPw ? "text" : "password"}
                    required
                    className="admin-input pr-10"
                    placeholder="Minimum 8 characters"
                    value={form.password}
                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Permissions */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Permissions
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={selectAll}
                      className="text-[10px] text-primary hover:underline"
                    >
                      All
                    </button>
                    <span className="text-muted-foreground text-[10px]">·</span>
                    <button
                      type="button"
                      onClick={clearAll}
                      className="text-[10px] text-muted-foreground hover:underline"
                    >
                      None
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {ALL_PERMISSIONS.map((perm) => {
                    const checked = form.permissions.includes(perm);
                    return (
                      <button
                        key={perm}
                        type="button"
                        onClick={() => togglePermission(perm)}
                        className={`flex items-center gap-2 rounded-xl border p-2.5 text-left text-xs font-medium transition-all ${
                          checked
                            ? "bg-primary/10 border-primary/30 text-primary"
                            : "border-border text-muted-foreground hover:border-primary/20"
                        }`}
                      >
                        {checked ? (
                          <CheckSquare className="h-3.5 w-3.5 flex-shrink-0" />
                        ) : (
                          <Square className="h-3.5 w-3.5 flex-shrink-0" />
                        )}
                        {PERMISSION_LABELS[perm]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Error */}
              {formError && (
                <div className="rounded-xl bg-destructive/10 border border-destructive/30 px-4 py-2.5 text-sm text-destructive">
                  {formError}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAdd(false);
                    setForm(EMPTY_USER);
                    setFormError("");
                  }}
                  className="flex-1 rounded-xl border border-border bg-secondary py-2.5 text-sm font-medium hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  id="add-user-submit"
                  type="submit"
                  disabled={saving}
                  className="flex-1 btn-hero justify-center disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Adding…
                    </>
                  ) : (
                    "Add Member"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass rounded-3xl p-7 max-w-sm w-full ring-1 ring-border shadow-2xl"
          >
            <Trash2 className="h-8 w-8 text-destructive mb-3" />
            <h3 className="text-lg font-bold mb-1">Remove User?</h3>
            <p className="text-sm text-muted-foreground mb-6">
              This user will lose all admin access immediately.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 rounded-xl border border-border bg-secondary py-2 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                id="confirm-delete-user-btn"
                onClick={() => handleDelete(deleteId)}
                className="flex-1 rounded-xl bg-destructive py-2 text-sm font-medium text-destructive-foreground"
              >
                Remove
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
}
