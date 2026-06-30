import { a as __toESM } from "../_runtime.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Pencil, O as Plus, ct as CircleX, f as Trash2, j as Package, lt as CircleCheckBig, w as Search, x as ShieldAlert } from "../_libs/lucide-react.mjs";
import { s as deleteProduct, u as getProducts } from "./adminStore-nj7GgGe2.mjs";
import { n as useAdminAuth } from "./adminAuth-n-e8bb6l.mjs";
import { t as AdminLayout } from "./AdminLayout-DSkqI4j6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-CsGSOOaf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATEGORY_COLORS = {
	Car: "bg-blue-500/15 text-blue-400 border-blue-500/30",
	SUV: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
	Truck: "bg-orange-500/15 text-orange-400 border-orange-500/30",
	Bike: "bg-purple-500/15 text-purple-400 border-purple-500/30",
	Commercial: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30"
};
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
				children: "You don't have permission to view products. Contact the owner to grant access."
			})
		]
	}) });
}
function AdminProducts() {
	const { hasPermission } = useAdminAuth();
	const [products, setProducts] = (0, import_react.useState)([]);
	const [search, setSearch] = (0, import_react.useState)("");
	const [catFilter, setCatFilter] = (0, import_react.useState)("All");
	const [stockFilter, setStockFilter] = (0, import_react.useState)("All");
	const [deleteId, setDeleteId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setProducts(getProducts());
	}, []);
	if (!hasPermission("products.view")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccessDenied, {});
	const handleDelete = (id) => {
		deleteProduct(id);
		setProducts(getProducts());
		setDeleteId(null);
	};
	const filtered = products.filter((p) => {
		const matchCat = catFilter === "All" || p.category === catFilter;
		const matchSearch = search.trim() === "" || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
		let matchStock = true;
		if (stockFilter === "In Stock") matchStock = p.inStock;
		if (stockFilter === "Out of Stock") matchStock = !p.inStock;
		if (stockFilter === "Featured") matchStock = p.featured;
		return matchCat && matchSearch && matchStock;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex flex-wrap items-center justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-bold",
				children: "Products"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: [
					products.length,
					" product",
					products.length !== 1 ? "s" : "",
					" total"
				]
			})] }), hasPermission("products.add") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/admin/products/add",
				id: "products-add-btn",
				className: "btn-hero text-sm py-2.5 px-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add Product"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 flex flex-col sm:flex-row gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1 min-w-[180px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "products-search",
						type: "text",
						placeholder: "Search products…",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						className: "admin-input pl-9 h-10 w-full"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: stockFilter,
					onChange: (e) => setStockFilter(e.target.value),
					className: "admin-input h-10 w-full sm:w-48 bg-surface/50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "All",
							children: "All Products"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "In Stock",
							children: "In Stock"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "Out of Stock",
							children: "Out of Stock"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "Featured",
							children: "Featured Only"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1.5 flex-wrap",
					children: [
						"All",
						"Car",
						"SUV",
						"Truck",
						"Bike",
						"Commercial"
					].map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setCatFilter(cat),
						className: `rounded-full px-3 py-1.5 text-xs font-medium border transition-all ${catFilter === cat ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"}`,
						children: cat
					}, cat))
				})
			]
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
			children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center py-20 gap-3 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-10 w-10 text-muted-foreground/40" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm text-muted-foreground",
						children: search || catFilter !== "All" ? "No matching products" : "No products yet"
					}),
					hasPermission("products.add") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/products/add",
						className: "text-xs text-primary hover:underline mt-1",
						children: "Add your first product →"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border text-xs uppercase tracking-wider text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 text-left font-medium",
								children: "Product"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 text-left font-medium hidden sm:table-cell",
								children: "Category"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 text-left font-medium hidden md:table-cell",
								children: "Size"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 text-left font-medium",
								children: "Price"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 text-left font-medium hidden lg:table-cell",
								children: "Stock"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 text-right font-medium",
								children: "Actions"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-border",
						children: filtered.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "hover:bg-surface/50 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-surface",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: product.image,
												alt: product.name,
												className: "h-full w-full object-cover"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-medium truncate max-w-[140px] sm:max-w-xs",
												children: product.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-muted-foreground",
												children: product.brand
											})]
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 hidden sm:table-cell",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${CATEGORY_COLORS[product.category] ?? "bg-secondary text-foreground border-border"}`,
										children: product.category
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 hidden md:table-cell text-muted-foreground",
									children: product.size
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 font-semibold text-primary",
									children: product.price
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 hidden lg:table-cell",
									children: product.inStock ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1 text-emerald-400 text-xs font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-3.5 w-3.5" }), " In Stock"]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1 text-muted-foreground text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-3.5 w-3.5" }), " Out of Stock"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-end gap-1",
										children: [hasPermission("products.edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/admin/products/edit/$id",
											params: { id: product.id },
											className: "rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors",
											title: "Edit",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
										}), hasPermission("products.delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setDeleteId(product.id),
											className: "rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors",
											title: "Delete",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
										})]
									})
								})
							]
						}, product.id))
					})]
				})
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-6 w-6 text-destructive" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-bold mb-1",
						children: "Delete Product?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mb-6",
						children: "This action cannot be undone. The product will be removed from the store."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setDeleteId(null),
							className: "flex-1 rounded-xl border border-border bg-secondary py-2 text-sm font-medium hover:bg-muted transition-colors",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							id: "confirm-delete-btn",
							onClick: () => handleDelete(deleteId),
							className: "flex-1 rounded-xl bg-destructive py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/80 transition-colors",
							children: "Delete"
						})]
					})
				]
			})
		})
	] });
}
//#endregion
export { AdminProducts as component };
