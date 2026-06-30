import { a as __toESM } from "../_runtime.mjs";
import { g as updateOrderStatus, h as updateCustomer, p as setShopSession, s as getOrders } from "./shopStore-eN_ZWT97.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useShop } from "./useShop-Bs_GNeI8.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as LogOut, N as MapPin, j as Package, s as User, st as House } from "../_libs/lucide-react.mjs";
import { l as formatPrice } from "./adminStore-nj7GgGe2.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-DkaAif_v.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AccountPage() {
	const { session } = useShop();
	const [activeTab, setActiveTab] = (0, import_react.useState)("orders");
	const [isAddingAddress, setIsAddingAddress] = (0, import_react.useState)(false);
	const [newAddress, setNewAddress] = (0, import_react.useState)({
		fullName: "",
		mobile: "",
		addressLine: "",
		city: "",
		district: "",
		state: "",
		pincode: "",
		country: "India",
		isDefault: false
	});
	const orders = getOrders().filter((o) => o.customerId === session?.id);
	const handleAddAddress = (e) => {
		e.preventDefault();
		if (!session) return;
		const addressWithId = {
			...newAddress,
			id: `addr-${Date.now()}`
		};
		let updatedAddresses = [...session.addresses || []];
		if (newAddress.isDefault) updatedAddresses = updatedAddresses.map((a) => ({
			...a,
			isDefault: false
		}));
		else if (updatedAddresses.length === 0) addressWithId.isDefault = true;
		updatedAddresses.push(addressWithId);
		updateCustomer(session.id, { addresses: updatedAddresses });
		setShopSession({
			...session,
			addresses: updatedAddresses
		});
		toast.success("Address added successfully");
		setIsAddingAddress(false);
		setNewAddress({
			fullName: "",
			mobile: "",
			addressLine: "",
			city: "",
			district: "",
			state: "",
			pincode: "",
			country: "India",
			isDefault: false
		});
	};
	const handleLogout = () => {
		setShopSession(null);
		toast.success("Logged out successfully");
	};
	const handleCancelOrder = (orderId) => {
		if (confirm("Are you sure you want to cancel this order?")) {
			updateOrderStatus(orderId, "Cancelled");
			toast.success("Order Cancelled");
			window.dispatchEvent(new StorageEvent("storage", { key: "kambiz_orders" }));
		}
	};
	if (!session) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen pt-32 pb-20 flex items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md p-8 rounded-3xl glass border border-border/50",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold text-center mb-6",
					children: "Customer Login"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-center mb-6",
					children: "Sign in to view your orders, saved addresses, and profile information."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => window.dispatchEvent(new CustomEvent("kambiz_require_login")),
					className: "w-full btn-hero",
					children: "Sign In / Register"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen pt-28 pb-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row items-center justify-between gap-4 mb-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-bold",
					children: "My Account"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-muted-foreground",
					children: ["Welcome back, ", session.name]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-2 px-4 py-2 rounded-xl glass border border-border/50 hover:bg-white/5 text-sm transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "h-4 w-4" }), " Home"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleLogout,
						className: "flex items-center gap-2 px-4 py-2 rounded-xl glass border border-border/50 hover:bg-white/5 text-sm text-red-400 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Sign Out"]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-4 gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-1 flex flex-col gap-2",
					children: [
						{
							id: "orders",
							label: "My Orders",
							icon: Package
						},
						{
							id: "profile",
							label: "Profile Information",
							icon: User
						},
						{
							id: "addresses",
							label: "Saved Addresses",
							icon: MapPin
						}
					].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveTab(tab.id),
						className: `flex items-center gap-3 px-5 py-4 rounded-2xl text-left transition-colors border ${activeTab === tab.id ? "bg-primary/10 border-primary text-primary" : "glass border-border/50 hover:bg-white/5"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(tab.icon, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: tab.label
						})]
					}, tab.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-3",
					children: [
						activeTab === "orders" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center justify-between",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-bold",
									children: "Order History"
								})
							}), orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-12 rounded-3xl glass border border-border/50 text-center flex flex-col items-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-12 w-12 text-muted-foreground mb-4" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-lg font-semibold",
										children: "No Orders Yet"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground mt-2",
										children: "You haven't placed any orders. Start exploring our premium tyres."
									})
								]
							}) : orders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-6 rounded-3xl glass border border-border/50 flex flex-col gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-lg",
												children: order.id
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full ${order.orderStatus === "Delivered" ? "bg-emerald-500/20 text-emerald-400" : order.orderStatus === "Cancelled" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"}`,
												children: order.orderStatus
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm text-muted-foreground mt-1",
											children: ["Placed on ", new Date(order.orderDate).toLocaleDateString()]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-left sm:text-right",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-bold text-xl text-primary",
												children: formatPrice(order.totalAmount)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-muted-foreground",
												children: [order.items.length, " Items"]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-col gap-3",
										children: order.items.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: item.product.image,
												className: "h-12 w-12 rounded-lg object-cover bg-white/5",
												alt: item.product.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-semibold text-sm line-clamp-1",
												children: item.product.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-muted-foreground",
												children: ["Qty: ", item.quantity]
											})] })]
										}, idx))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-end gap-3 pt-4 border-t border-border/50",
										children: [
											order.orderStatus !== "Cancelled" && order.orderStatus !== "Delivered" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => handleCancelOrder(order.id),
												className: "px-4 py-2 text-xs font-semibold rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors",
												children: "Cancel Order"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "px-4 py-2 text-xs font-semibold rounded-xl glass border border-border/50 hover:bg-white/5 transition-colors",
												children: "Download Invoice"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "px-4 py-2 text-xs font-semibold rounded-xl bg-primary text-background hover:bg-primary/90 transition-colors",
												children: "Track Order"
											})
										]
									})
								]
							}, order.id))]
						}),
						activeTab === "profile" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-6 sm:p-8 rounded-3xl glass border border-border/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-bold mb-6",
									children: "Profile Information"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-sm font-medium text-muted-foreground",
												children: "Full Name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												className: "admin-input",
												defaultValue: session.name
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-sm font-medium text-muted-foreground",
												children: "Email Address"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "email",
												className: "admin-input",
												defaultValue: session.email,
												readOnly: true
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-sm font-medium text-muted-foreground",
												children: "Mobile Number"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "tel",
												className: "admin-input",
												defaultValue: session.mobile
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn-hero mt-8",
									children: "Save Changes"
								})
							]
						}),
						activeTab === "addresses" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-xl font-bold",
										children: "Saved Addresses"
									}), !isAddingAddress && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setIsAddingAddress(true),
										className: "btn-hero py-2 px-4 text-sm",
										children: "Add New Address"
									})]
								}),
								isAddingAddress && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: handleAddAddress,
									className: "p-6 rounded-2xl glass border border-border/50 space-y-4 animate-in fade-in zoom-in-95 duration-200",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-bold text-lg mb-4",
											children: "Add New Address"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid sm:grid-cols-2 gap-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-xs font-medium text-muted-foreground",
													children: "Full Name"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													required: true,
													value: newAddress.fullName,
													onChange: (e) => setNewAddress({
														...newAddress,
														fullName: e.target.value
													}),
													className: "admin-input mt-1"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-xs font-medium text-muted-foreground",
													children: "Mobile"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "tel",
													required: true,
													value: newAddress.mobile,
													onChange: (e) => setNewAddress({
														...newAddress,
														mobile: e.target.value
													}),
													className: "admin-input mt-1"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "sm:col-span-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "text-xs font-medium text-muted-foreground",
														children: "Address Line"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														required: true,
														value: newAddress.addressLine,
														onChange: (e) => setNewAddress({
															...newAddress,
															addressLine: e.target.value
														}),
														className: "admin-input mt-1"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-xs font-medium text-muted-foreground",
													children: "City"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													required: true,
													value: newAddress.city,
													onChange: (e) => setNewAddress({
														...newAddress,
														city: e.target.value
													}),
													className: "admin-input mt-1"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-xs font-medium text-muted-foreground",
													children: "District"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													required: true,
													value: newAddress.district,
													onChange: (e) => setNewAddress({
														...newAddress,
														district: e.target.value
													}),
													className: "admin-input mt-1"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-xs font-medium text-muted-foreground",
													children: "State"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													required: true,
													value: newAddress.state,
													onChange: (e) => setNewAddress({
														...newAddress,
														state: e.target.value
													}),
													className: "admin-input mt-1"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-xs font-medium text-muted-foreground",
													children: "Pincode"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													required: true,
													value: newAddress.pincode,
													onChange: (e) => setNewAddress({
														...newAddress,
														pincode: e.target.value
													}),
													className: "admin-input mt-1"
												})] })
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 mt-4 pt-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												id: "defaultAddress",
												checked: newAddress.isDefault,
												onChange: (e) => setNewAddress({
													...newAddress,
													isDefault: e.target.checked
												}),
												className: "rounded border-border/50 bg-white/5"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "defaultAddress",
												className: "text-sm cursor-pointer",
												children: "Set as default address"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-end gap-3 pt-4 border-t border-border/50",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setIsAddingAddress(false),
												className: "px-4 py-2 rounded-xl text-sm font-semibold hover:bg-white/5 transition-colors",
												children: "Cancel"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "submit",
												className: "px-4 py-2 rounded-xl bg-primary text-background text-sm font-semibold hover:bg-primary/90 transition-colors",
												children: "Save Address"
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid sm:grid-cols-2 gap-4",
									children: session.addresses?.map((addr) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-5 rounded-2xl glass border border-border/50 flex flex-col gap-2 relative overflow-hidden",
										children: [
											addr.isDefault && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "absolute top-0 right-0 bg-primary text-background text-[10px] font-bold px-3 py-1 rounded-bl-xl",
												children: "DEFAULT"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-bold",
												children: addr.fullName
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-muted-foreground",
												children: addr.mobile
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-sm text-muted-foreground mt-2",
												children: [
													addr.addressLine,
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
													addr.city,
													", ",
													addr.district,
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
													addr.state,
													" - ",
													addr.pincode
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-3 mt-4 pt-4 border-t border-border/50",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													className: "text-xs font-semibold text-primary hover:underline",
													children: "Edit"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													className: "text-xs font-semibold text-red-400 hover:underline",
													children: "Remove"
												})]
											})
										]
									}, addr.id))
								})
							]
						})
					]
				})]
			})]
		})
	});
}
//#endregion
export { AccountPage as component };
