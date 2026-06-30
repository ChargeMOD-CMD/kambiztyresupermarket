import { a as __toESM } from "../_runtime.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { G as EyeOff, W as Eye, c as UserPlus, f as Trash2, h as Square, it as SquareCheckBig, n as X, o as Users, ot as LoaderCircle, w as Search, x as ShieldAlert, y as Shield } from "../_libs/lucide-react.mjs";
import { a as addUser, c as deleteUser, f as getUsers, p as hashPassword, r as PERMISSION_LABELS, t as ALL_PERMISSIONS } from "./adminStore-nj7GgGe2.mjs";
import { n as useAdminAuth } from "./adminAuth-n-e8bb6l.mjs";
import { t as AdminLayout } from "./AdminLayout-DSkqI4j6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/users-BA_ja6N-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AccessDenied() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-8 w-8 text-destructive" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold",
				children: "Access Denied"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground max-w-sm",
				children: "You don't have permission to manage users."
			})
		]
	}) });
}
var EMPTY_USER = {
	name: "",
	email: "",
	password: "",
	permissions: ["dashboard", "products.view"]
};
function AdminUsers() {
	const { hasPermission, session } = useAdminAuth();
	const [users, setUsers] = (0, import_react.useState)([]);
	const [search, setSearch] = (0, import_react.useState)("");
	const [roleFilter, setRoleFilter] = (0, import_react.useState)("All");
	const [showAdd, setShowAdd] = (0, import_react.useState)(false);
	const [deleteId, setDeleteId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(EMPTY_USER);
	const [showPw, setShowPw] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [formError, setFormError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		setUsers(getUsers());
	}, []);
	if (!hasPermission("users.view")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccessDenied, {});
	const refresh = () => setUsers(getUsers());
	const togglePermission = (perm) => {
		setForm((f) => ({
			...f,
			permissions: f.permissions.includes(perm) ? f.permissions.filter((p) => p !== perm) : [...f.permissions, perm]
		}));
	};
	const selectAll = () => setForm((f) => ({
		...f,
		permissions: [...ALL_PERMISSIONS]
	}));
	const clearAll = () => setForm((f) => ({
		...f,
		permissions: []
	}));
	const handleAdd = async (e) => {
		e.preventDefault();
		setFormError("");
		if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
			setFormError("All fields are required.");
			return;
		}
		if (users.some((u) => u.email.toLowerCase() === form.email.toLowerCase())) {
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
			permissions: form.permissions
		});
		setSaving(false);
		refresh();
		setShowAdd(false);
		setForm(EMPTY_USER);
	};
	const handleDelete = (id) => {
		deleteUser(id);
		refresh();
		setDeleteId(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex flex-wrap items-center justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-bold",
				children: "Team Members"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: [
					users.length,
					" user",
					users.length !== 1 ? "s" : "",
					" · Only the owner can add members"
				]
			})] }), hasPermission("users.add") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				id: "users-add-btn",
				onClick: () => setShowAdd(true),
				className: "btn-hero text-sm py-2.5 px-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4" }), " Add User"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 flex flex-col sm:flex-row gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex-1 min-w-[180px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					placeholder: "Search by Name or Email...",
					value: search,
					onChange: (e) => setSearch(e.target.value),
					className: "admin-input pl-9 h-10 w-full"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: roleFilter,
				onChange: (e) => setRoleFilter(e.target.value),
				className: "admin-input h-10 w-full sm:w-48 bg-surface/50",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "All",
						children: "All Roles"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "owner",
						children: "Owner"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "admin",
						children: "Admin"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "operator",
						children: "Operator"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				opacity: 0,
				y: 16
			},
			animate: {
				opacity: 1,
				y: 0
			},
			className: "glass rounded-2xl ring-1 ring-border overflow-hidden",
			children: users.filter((u) => {
				const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
				const matchRole = roleFilter === "All" || u.role === roleFilter;
				return matchSearch && matchRole;
			}).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center py-16 gap-3 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-10 w-10 text-muted-foreground/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm text-muted-foreground",
					children: "No users found."
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "divide-y divide-border",
				children: users.filter((u) => {
					const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
					const matchRole = roleFilter === "All" || u.role === roleFilter;
					return matchSearch && matchRole;
				}).map((user) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-4 p-5 hover:bg-surface/50 transition-colors",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-sm font-bold",
							children: user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 flex-wrap",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-sm",
											children: user.name
										}),
										user.role === "owner" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 rounded-full bg-primary/15 border border-primary/25 px-2 py-0.5 text-[10px] font-bold text-primary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-2.5 w-2.5" }), " Owner"]
										}),
										session?.userId === user.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-muted-foreground",
											children: "(you)"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: user.email
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 flex flex-wrap gap-1.5",
									children: user.permissions.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-flex items-center rounded-full bg-secondary border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground",
										children: PERMISSION_LABELS[p]
									}, p))
								})
							]
						}),
						hasPermission("users.delete") && user.role !== "owner" && session?.userId !== user.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setDeleteId(user.id),
							className: "flex-shrink-0 rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors",
							title: "Delete user",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						})
					]
				}, user.id))
			})
		}),
		showAdd && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 overflow-y-auto py-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					scale: .9,
					opacity: 0
				},
				animate: {
					scale: 1,
					opacity: 1
				},
				className: "glass rounded-3xl p-7 w-full max-w-lg ring-1 ring-border shadow-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-5 w-5 text-blue-400" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold",
							children: "Add Team Member"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Set their access permissions"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setShowAdd(false);
							setForm(EMPTY_USER);
							setFormError("");
						},
						className: "text-muted-foreground hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleAdd,
					id: "add-user-form",
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-medium text-muted-foreground uppercase tracking-wider",
								htmlFor: "user-name",
								children: "Full Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "user-name",
								required: true,
								className: "admin-input",
								placeholder: "e.g. John Mathew",
								value: form.name,
								onChange: (e) => setForm((f) => ({
									...f,
									name: e.target.value
								}))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-medium text-muted-foreground uppercase tracking-wider",
								htmlFor: "user-email",
								children: "Email Address"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "user-email",
								type: "email",
								required: true,
								className: "admin-input",
								placeholder: "user@kambiz.com",
								value: form.email,
								onChange: (e) => setForm((f) => ({
									...f,
									email: e.target.value
								}))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-medium text-muted-foreground uppercase tracking-wider",
								htmlFor: "user-password",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "user-password",
									type: showPw ? "text" : "password",
									required: true,
									className: "admin-input pr-10",
									placeholder: "Minimum 8 characters",
									value: form.password,
									onChange: (e) => setForm((f) => ({
										...f,
										password: e.target.value
									}))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowPw(!showPw),
									className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground",
									children: showPw ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-medium text-muted-foreground uppercase tracking-wider",
									children: "Permissions"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: selectAll,
											className: "text-[10px] text-primary hover:underline",
											children: "All"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground text-[10px]",
											children: "·"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: clearAll,
											className: "text-[10px] text-muted-foreground hover:underline",
											children: "None"
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-2",
								children: ALL_PERMISSIONS.map((perm) => {
									const checked = form.permissions.includes(perm);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => togglePermission(perm),
										className: `flex items-center gap-2 rounded-xl border p-2.5 text-left text-xs font-medium transition-all ${checked ? "bg-primary/10 border-primary/30 text-primary" : "border-border text-muted-foreground hover:border-primary/20"}`,
										children: [checked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareCheckBig, { className: "h-3.5 w-3.5 flex-shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "h-3.5 w-3.5 flex-shrink-0" }), PERMISSION_LABELS[perm]]
									}, perm);
								})
							})]
						}),
						formError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-xl bg-destructive/10 border border-destructive/30 px-4 py-2.5 text-sm text-destructive",
							children: formError
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setShowAdd(false);
									setForm(EMPTY_USER);
									setFormError("");
								},
								className: "flex-1 rounded-xl border border-border bg-secondary py-2.5 text-sm font-medium hover:bg-muted transition-colors",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								id: "add-user-submit",
								type: "submit",
								disabled: saving,
								className: "flex-1 btn-hero justify-center disabled:opacity-60",
								children: saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Adding…"] }) : "Add Member"
							})]
						})
					]
				})]
			})
		}),
		deleteId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					scale: .9,
					opacity: 0
				},
				animate: {
					scale: 1,
					opacity: 1
				},
				className: "glass rounded-3xl p-7 max-w-sm w-full ring-1 ring-border shadow-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-8 w-8 text-destructive mb-3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-bold mb-1",
						children: "Remove User?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mb-6",
						children: "This user will lose all admin access immediately."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setDeleteId(null),
							className: "flex-1 rounded-xl border border-border bg-secondary py-2 text-sm font-medium",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							id: "confirm-delete-user-btn",
							onClick: () => handleDelete(deleteId),
							className: "flex-1 rounded-xl bg-destructive py-2 text-sm font-medium text-destructive-foreground",
							children: "Remove"
						})]
					})
				]
			})
		})
	] });
}
//#endregion
export { AdminUsers as component };
