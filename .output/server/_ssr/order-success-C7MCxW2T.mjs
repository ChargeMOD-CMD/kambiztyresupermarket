import { a as __toESM } from "../_runtime.mjs";
import { s as getOrders } from "./shopStore-eN_ZWT97.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { I as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as MapPin, Q as Check, Y as Copy, g as Smartphone, j as Package, ut as CircleCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order-success-C7MCxW2T.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OrderSuccessPage() {
	const navigate = useNavigate();
	const orderId = new URLSearchParams(window.location.search).get("orderId");
	const [order, setOrder] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!orderId) {
			navigate({ to: "/" });
			return;
		}
		const found = getOrders().find((o) => o.id === orderId);
		if (!found) navigate({ to: "/" });
		else setOrder(found);
	}, [orderId, navigate]);
	const copyTracking = () => {
		if (orderId) {
			navigator.clipboard.writeText(orderId);
			setCopied(true);
			setTimeout(() => setCopied(false), 2e3);
		}
	};
	if (!order) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen pt-32 pb-20 bg-background/50 flex flex-col items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-2xl bg-card glass-strong rounded-3xl border border-border shadow-2xl p-8 sm:p-12 text-center animate-in fade-in slide-in-from-bottom-8 duration-500",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "h-24 w-24 rounded-full bg-emerald-500/20 mx-auto flex items-center justify-center mb-8 relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full border-4 border-emerald-500/30 animate-[spin_3s_linear_infinite]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-12 w-12 text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl sm:text-4xl font-bold mb-4",
					children: "Order Placed Successfully!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-lg mb-8 max-w-lg mx-auto",
					children: "Thank you for choosing Kambiz Tyre Supermarket. Your premium tyres are being prepared for dispatch."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-background/50 border border-primary/30 rounded-2xl p-6 mb-8 relative overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-0 right-0 p-4 opacity-5 pointer-events-none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-32 w-32" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-left flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-primary uppercase tracking-wider mb-1",
									children: "Tracking ID"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xl font-mono font-bold",
										children: orderId
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: copyTracking,
										className: "p-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors",
										children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" })
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full sm:w-px h-px sm:h-16 bg-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-left flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2",
									children: "Notifications Sent To"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "h-4 w-4 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["WhatsApp: ", order.shippingAddress.mobile] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-sm text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Delivery to ", order.shippingAddress.city] })]
									})]
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row items-center justify-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/account",
						className: "btn-hero w-full sm:w-auto min-w-[200px]",
						children: "Track Order Status"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "btn-ghost-glow w-full sm:w-auto min-w-[200px]",
						children: "Return to Home"
					})]
				})
			]
		})
	});
}
//#endregion
export { OrderSuccessPage as component };
