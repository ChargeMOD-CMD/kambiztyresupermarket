import { a as __toESM } from "../_runtime.mjs";
import { g as updateOrderStatus, i as deleteOrder, s as getOrders } from "./shopStore-eN_ZWT97.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { $ as Calendar, N as MapPin, W as Eye, ct as CircleX, f as Trash2, w as Search } from "../_libs/lucide-react.mjs";
import { d as getSession, l as formatPrice } from "./adminStore-nj7GgGe2.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as AdminLayout } from "./AdminLayout-DSkqI4j6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-BxMt7lYI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminOrders() {
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [search, setSearch] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("All");
	const [dateFilter, setDateFilter] = (0, import_react.useState)("");
	const [selectedOrder, setSelectedOrder] = (0, import_react.useState)(null);
	const session = getSession();
	const canManage = session?.role === "owner" || session?.role === "admin";
	const loadOrders = () => setOrders(getOrders());
	(0, import_react.useEffect)(() => {
		loadOrders();
		const handleStorage = (e) => {
			if (e.key === "kambiz_orders") loadOrders();
		};
		window.addEventListener("storage", handleStorage);
		return () => window.removeEventListener("storage", handleStorage);
	}, []);
	const filteredOrders = orders.filter((o) => {
		const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.shippingAddress.fullName.toLowerCase().includes(search.toLowerCase());
		const matchStatus = statusFilter === "All" || o.orderStatus === statusFilter;
		let matchDate = true;
		if (dateFilter) {
			const orderDate = new Date(o.orderDate);
			const selectedDate = new Date(dateFilter);
			matchDate = orderDate.toDateString() === selectedDate.toDateString();
		}
		return matchSearch && matchStatus && matchDate;
	});
	const handleStatusUpdate = (orderId, status) => {
		updateOrderStatus(orderId, status);
		loadOrders();
		if (selectedOrder && selectedOrder.id === orderId) setSelectedOrder({
			...selectedOrder,
			orderStatus: status
		});
		toast.success(`Order ${orderId} marked as ${status}`);
		window.dispatchEvent(new CustomEvent("kambiz_notification", { detail: {
			type: "status_update",
			orderId,
			status,
			customerId: selectedOrder?.customerId
		} }));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6 h-full relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold font-display",
				children: "Order Management"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground mt-1",
				children: "Manage and fulfill customer orders."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-wrap",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-full sm:w-40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							value: dateFilter,
							onChange: (e) => setDateFilter(e.target.value),
							className: `admin-input h-10 w-full bg-surface/50 text-sm ${!dateFilter ? "text-transparent" : ""}`
						}), !dateFilter && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground text-sm",
							children: "Filter by Date"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: statusFilter,
						onChange: (e) => setStatusFilter(e.target.value),
						className: "admin-input h-10 w-full sm:w-40 bg-surface/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "All",
								children: "All Statuses"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Pending",
								children: "Pending"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Processing",
								children: "Processing"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Shipped",
								children: "Shipped"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Delivered",
								children: "Delivered"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Cancelled",
								children: "Cancelled"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-full sm:w-72",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "Search by Order ID or Name...",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							className: "admin-input pl-9 h-10 w-full"
						})]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col lg:flex-row gap-6 flex-1 min-h-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `flex-1 overflow-y-auto rounded-2xl glass border border-border/50 ${selectedOrder ? "hidden lg:block lg:w-1/2 xl:w-2/3" : "w-full"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left text-sm whitespace-nowrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-white/5 border-b border-border/50 sticky top-0 z-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-semibold text-muted-foreground",
								children: "Order ID"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-semibold text-muted-foreground",
								children: "Customer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-semibold text-muted-foreground",
								children: "Date"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-semibold text-muted-foreground",
								children: "Total"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-semibold text-muted-foreground",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-semibold text-muted-foreground text-right",
								children: "Action"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-border/50",
						children: filteredOrders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 6,
							className: "px-6 py-12 text-center text-muted-foreground",
							children: "No orders found matching your search."
						}) }) : filteredOrders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: `hover:bg-white/5 transition-colors ${selectedOrder?.id === order.id ? "bg-primary/5" : ""}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 font-medium",
									children: order.id
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium",
										children: order.shippingAddress.fullName
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 text-muted-foreground",
									children: new Date(order.orderDate).toLocaleDateString()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 font-bold text-primary",
									children: formatPrice(order.totalAmount)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full ${order.orderStatus === "Delivered" ? "bg-emerald-500/20 text-emerald-400" : order.orderStatus === "Cancelled" ? "bg-red-500/20 text-red-400" : order.orderStatus === "Pending" ? "bg-orange-500/20 text-orange-400" : "bg-blue-500/20 text-blue-400"}`,
										children: order.orderStatus
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-end items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => setSelectedOrder(order),
											className: "p-2 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors inline-flex items-center gap-2 text-xs font-semibold",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" }), " View"]
										}), canManage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => {
												if (confirm("Are you sure you want to delete this order?")) {
													deleteOrder(order.id);
													toast.success(`Order ${order.id} deleted`);
													if (selectedOrder?.id === order.id) setSelectedOrder(null);
													loadOrders();
												}
											},
											className: "p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition-colors inline-flex items-center gap-2 text-xs font-semibold",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), " Delete"]
										})]
									})
								})
							]
						}, order.id))
					})]
				})
			}), selectedOrder && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:w-1/2 xl:w-1/3 flex flex-col rounded-2xl glass border border-border/50 overflow-y-auto h-full sticky top-0 relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 border-b border-border/50 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur z-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-bold text-lg",
						children: "Order Details"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setSelectedOrder(null),
						className: "lg:hidden p-2 bg-white/5 rounded-lg text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-5 w-5" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl font-bold",
								children: selectedOrder.id
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-sm text-muted-foreground mt-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4" }),
									" ",
									new Date(selectedOrder.orderDate).toLocaleString()
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `px-3 py-1 text-xs uppercase tracking-wider font-bold rounded-full ${selectedOrder.orderStatus === "Delivered" ? "bg-emerald-500/20 text-emerald-400" : selectedOrder.orderStatus === "Cancelled" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"}`,
								children: selectedOrder.orderStatus
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white/5 p-4 rounded-xl border border-border/50 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-xs font-bold text-muted-foreground uppercase",
								children: "Update Status"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									"Pending",
									"Processing",
									"Packed",
									"Shipped",
									"Delivered",
									"Cancelled"
								].map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleStatusUpdate(selectedOrder.id, status),
									disabled: selectedOrder.orderStatus === status,
									className: `px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${selectedOrder.orderStatus === status ? "bg-primary text-background" : "bg-background/50 hover:bg-white/10"}`,
									children: status
								}, status))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-4 p-4 rounded-xl glass border border-border/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5 text-primary" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-semibold text-sm",
									children: selectedOrder.shippingAddress.fullName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mt-1",
									children: selectedOrder.shippingAddress.mobile
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground mt-1 leading-relaxed",
									children: [
										selectedOrder.shippingAddress.addressLine,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										selectedOrder.shippingAddress.city,
										", ",
										selectedOrder.shippingAddress.district,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										selectedOrder.shippingAddress.state,
										" -",
										" ",
										selectedOrder.shippingAddress.pincode
									]
								})
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-sm font-bold mb-3",
							children: "Items Ordered"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: selectedOrder.items.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-4 p-3 rounded-xl bg-white/5 border border-border/50",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: item.product.image,
										className: "h-12 w-12 rounded-lg object-cover bg-black/50",
										alt: item.product.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-semibold text-sm line-clamp-1",
												children: item.product.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-muted-foreground mt-0.5",
												children: [
													item.product.brand,
													" | Size: ",
													item.product.size
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-muted-foreground mt-0.5",
												children: [
													"Qty: ",
													item.quantity,
													" × ",
													formatPrice(item.product.price)
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold text-sm text-primary shrink-0",
										children: formatPrice(item.product.price * item.quantity)
									})
								]
							}, idx))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-sm font-bold mb-3",
							children: "Payment Summary"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 rounded-xl glass border border-border/50 text-sm space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Method"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: selectedOrder.paymentMethod
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Status"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-emerald-400",
										children: selectedOrder.paymentStatus
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px bg-border my-2" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Subtotal"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: formatPrice(selectedOrder.subtotal)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Shipping"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: formatPrice(selectedOrder.shipping)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "GST (18%)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: formatPrice(selectedOrder.gst)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px bg-border my-2" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-lg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold",
										children: "Total"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-primary",
										children: formatPrice(selectedOrder.totalAmount)
									})]
								})
							]
						})] })
					]
				})]
			})]
		})]
	}) });
}
//#endregion
export { AdminOrders as component };
