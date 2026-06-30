import { a as __toESM } from "../_runtime.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { s as getOrders } from "./shopStore-eN_ZWT97.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as IndianRupee, O as Plus, _ as ShoppingCart, j as Package, nt as ArrowRight, o as Users } from "../_libs/lucide-react.mjs";
import { f as getUsers, l as formatPrice, u as getProducts } from "./adminStore-nj7GgGe2.mjs";
import { t as AdminLayout } from "./AdminLayout-DSkqI4j6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-Db8ZfzeO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var colorMap = {
	primary: {
		bg: "bg-primary/10",
		icon: "text-primary",
		ring: "ring-primary/20",
		value: "text-primary"
	},
	emerald: {
		bg: "bg-emerald-500/10",
		icon: "text-emerald-400",
		ring: "ring-emerald-500/20",
		value: "text-emerald-400"
	},
	blue: {
		bg: "bg-blue-500/10",
		icon: "text-blue-400",
		ring: "ring-blue-500/20",
		value: "text-blue-400"
	},
	purple: {
		bg: "bg-purple-500/10",
		icon: "text-purple-400",
		ring: "ring-purple-500/20",
		value: "text-purple-400"
	}
};
function StatCard({ label, value, icon: Icon, sub, color = "primary", delay = 0 }) {
	const c = colorMap[color];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: 20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			delay,
			duration: .4,
			ease: "easeOut"
		},
		className: "glass rounded-2xl p-5 ring-1 ring-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `mt-2 text-3xl font-bold font-display ${c.value}`,
					children: value
				}),
				sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-xs text-muted-foreground",
					children: sub
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `rounded-xl p-2.5 ring-1 ${c.bg} ${c.ring}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-5 w-5 ${c.icon}` })
			})]
		})
	});
}
function AdminDashboard() {
	const products = (0, import_react.useMemo)(() => getProducts(), []);
	const users = (0, import_react.useMemo)(() => getUsers(), []);
	const orders = (0, import_react.useMemo)(() => getOrders(), []);
	const [timeFilter, setTimeFilter] = (0, import_react.useState)("All Time");
	const filteredOrders = (0, import_react.useMemo)(() => {
		const now = /* @__PURE__ */ new Date();
		return orders.filter((o) => {
			if (timeFilter === "All Time") return true;
			const orderDate = new Date(o.orderDate);
			if (timeFilter === "Today") return orderDate.toDateString() === now.toDateString();
			if (timeFilter === "Last 7 Days") return orderDate >= /* @__PURE__ */ new Date(now.getTime() - 10080 * 60 * 1e3);
			if (timeFilter === "This Month") return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
			return true;
		});
	}, [orders, timeFilter]);
	const inStockCount = products.filter((p) => p.inStock).length;
	new Set(products.map((p) => p.category)).size;
	const totalRevenue = filteredOrders.reduce((sum, order) => sum + (order.orderStatus !== "Cancelled" ? order.totalAmount : 0), 0);
	const pendingOrdersCount = filteredOrders.filter((o) => o.orderStatus === "Pending").length;
	const recentProducts = [...products].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
	[...filteredOrders].slice(0, 5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-bold",
				children: "Dashboard"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Welcome back. Here's what's happening with your tyre store today."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: timeFilter,
				onChange: (e) => setTimeFilter(e.target.value),
				className: "admin-input h-10 w-full sm:w-48 bg-surface/50",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "All Time",
						children: "All Time"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "Today",
						children: "Today"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "Last 7 Days",
						children: "Last 7 Days"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "This Month",
						children: "This Month"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Total Revenue",
					value: formatPrice(totalRevenue),
					icon: IndianRupee,
					sub: timeFilter === "All Time" ? "Lifetime sales" : `Sales for ${timeFilter}`,
					color: "emerald",
					delay: 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Total Orders",
					value: filteredOrders.length,
					icon: ShoppingCart,
					sub: `${pendingOrdersCount} pending orders`,
					color: "blue",
					delay: .1
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Products",
					value: products.length,
					icon: Package,
					sub: `${inStockCount} in stock`,
					color: "primary",
					delay: .2
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Customers",
					value: users.length,
					icon: Users,
					sub: "Registered users",
					color: "purple",
					delay: .3
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid sm:grid-cols-2 gap-4 mb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: 16
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { delay: .4 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/products/add",
					id: "dashboard-add-product",
					className: "flex items-center justify-between rounded-2xl bg-primary/10 ring-1 ring-primary/20 p-5 hover:bg-primary/15 transition-colors group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-xl bg-primary/20 p-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-5 w-5 text-primary" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-semibold text-sm",
							children: "Add New Product"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground mt-0.5",
							children: "List a new tyre or accessory"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0 duration-200" })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: 16
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { delay: .5 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/users",
					id: "dashboard-manage-users",
					className: "flex items-center justify-between rounded-2xl bg-blue-500/10 ring-1 ring-blue-500/20 p-5 hover:bg-blue-500/15 transition-colors group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-xl bg-blue-500/20 p-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-5 w-5 text-blue-400" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-semibold text-sm",
							children: "Manage Users"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground mt-0.5",
							children: "Add team members & set permissions"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0 duration-200" })]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 16
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: { delay: .55 },
			className: "glass rounded-2xl ring-1 ring-border overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between p-5 border-b border-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-semibold text-sm",
					children: "Recent Products"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin/products",
					className: "text-xs text-primary hover:underline",
					children: "View all →"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "divide-y divide-border",
				children: recentProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-8 text-center text-sm text-muted-foreground",
					children: "No products yet. Add your first one!"
				}) : recentProducts.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-surface",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: product.image,
								alt: product.name,
								className: "h-full w-full object-cover"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate text-sm font-medium",
								children: product.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground",
								children: [
									product.brand,
									" · ",
									product.category
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right flex-shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-semibold text-primary",
								children: product.price
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `text-[10px] font-medium ${product.inStock ? "text-emerald-400" : "text-muted-foreground"}`,
								children: product.inStock ? "In Stock" : "Out of Stock"
							})]
						})
					]
				}, product.id))
			})]
		})
	] });
}
//#endregion
export { AdminDashboard as component };
