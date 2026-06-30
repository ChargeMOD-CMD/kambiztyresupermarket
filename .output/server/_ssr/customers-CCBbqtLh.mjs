import { a as __toESM } from "../_runtime.mjs";
import { h as updateCustomer, o as getCustomers, r as deleteCustomer, s as getOrders } from "./shopStore-eN_ZWT97.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { A as Pencil, N as MapPin, P as Mail, W as Eye, f as Trash2, k as Phone, n as X, w as Search } from "../_libs/lucide-react.mjs";
import { d as getSession } from "./adminStore-nj7GgGe2.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as AdminLayout } from "./AdminLayout-DSkqI4j6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customers-CCBbqtLh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminCustomers() {
	const [customers, setCustomers] = (0, import_react.useState)([]);
	const [search, setSearch] = (0, import_react.useState)("");
	const [activityFilter, setActivityFilter] = (0, import_react.useState)("All");
	const [editingCustomer, setEditingCustomer] = (0, import_react.useState)(null);
	const session = getSession();
	const canManage = session?.role === "owner" || session?.role === "admin";
	const loadCustomers = () => {
		setCustomers(getCustomers());
	};
	(0, import_react.useEffect)(() => {
		loadCustomers();
		const handleStorage = (e) => {
			if (e.key === "kambiz_customers") loadCustomers();
		};
		window.addEventListener("storage", handleStorage);
		return () => window.removeEventListener("storage", handleStorage);
	}, []);
	const filtered = customers.filter((c) => {
		const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()) || c.mobile.includes(search);
		let matchActivity = true;
		if (activityFilter !== "All") {
			const hasOrders = getOrders().some((o) => o.customerId === c.id);
			if (activityFilter === "Active") matchActivity = hasOrders;
			if (activityFilter === "Inactive") matchActivity = !hasOrders;
		}
		return matchSearch && matchActivity;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold font-display",
				children: "Customers"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground mt-1",
				children: "Manage registered users and their details."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row gap-3 w-full sm:w-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: activityFilter,
					onChange: (e) => setActivityFilter(e.target.value),
					className: "admin-input h-10 w-full sm:w-48 bg-surface/50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "All",
							children: "All Customers"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "Active",
							children: "Active (Ordered)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "Inactive",
							children: "Inactive (No Orders)"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full sm:w-72",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "Search by Name, Email or Phone...",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						className: "admin-input pl-9 h-10 w-full"
					})]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto rounded-2xl glass border border-border/50",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-left text-sm whitespace-nowrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-white/5 border-b border-border/50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-6 py-4 font-semibold text-muted-foreground",
							children: "Customer"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-6 py-4 font-semibold text-muted-foreground",
							children: "Contact"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-6 py-4 font-semibold text-muted-foreground",
							children: "Location"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-6 py-4 font-semibold text-muted-foreground text-right",
							children: "Action"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
					className: "divide-y divide-border/50",
					children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 4,
						className: "px-6 py-12 text-center text-muted-foreground",
						children: "No customers found matching your search."
					}) }) : filtered.map((customer) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "hover:bg-white/5 transition-colors",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-8 w-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center",
										children: customer.name[0].toUpperCase()
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: customer.name
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3.5 w-3.5" }),
											" ",
											customer.email
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3.5 w-3.5" }),
											" ",
											customer.mobile
										]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-col gap-1",
									children: customer.addresses[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }),
											" ",
											customer.addresses[0].city,
											",",
											" ",
											customer.addresses[0].state
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground ml-5",
										children: customer.addresses[0].pincode
									})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "No address saved"
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4 text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-end items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "p-2 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors inline-flex items-center gap-2 text-xs font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" }), " View Details"]
									}), canManage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setEditingCustomer(customer),
										className: "p-2 rounded-lg bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 transition-colors",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											if (confirm("Are you sure you want to delete this customer?")) {
												deleteCustomer(customer.id);
												toast.success("Customer deleted");
											}
										},
										className: "p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition-colors",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})] })]
								})
							})
						]
					}, customer.id))
				})]
			})
		})]
	}), editingCustomer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-card glass-strong w-full max-w-md rounded-3xl border border-border shadow-2xl p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-center mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xl font-bold",
					children: "Edit Customer"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setEditingCustomer(null),
					className: "p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5 text-muted-foreground" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm font-medium text-muted-foreground",
						children: "Full Name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: editingCustomer.name,
						onChange: (e) => setEditingCustomer({
							...editingCustomer,
							name: e.target.value
						}),
						className: "admin-input mt-1"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm font-medium text-muted-foreground",
						children: "Email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "email",
						value: editingCustomer.email,
						onChange: (e) => setEditingCustomer({
							...editingCustomer,
							email: e.target.value
						}),
						className: "admin-input mt-1"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm font-medium text-muted-foreground",
						children: "Mobile"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "tel",
						value: editingCustomer.mobile,
						onChange: (e) => setEditingCustomer({
							...editingCustomer,
							mobile: e.target.value
						}),
						className: "admin-input mt-1"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							updateCustomer(editingCustomer.id, {
								name: editingCustomer.name,
								email: editingCustomer.email,
								mobile: editingCustomer.mobile
							});
							setEditingCustomer(null);
							toast.success("Customer details updated");
						},
						className: "btn-hero w-full mt-6",
						children: "Save Changes"
					})
				]
			})]
		})
	})] });
}
//#endregion
export { AdminCustomers as component };
