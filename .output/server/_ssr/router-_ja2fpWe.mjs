import { a as __toESM } from "../_runtime.mjs";
import { d as registerCustomer, l as loginCustomer } from "./shopStore-eN_ZWT97.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, k as redirect, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as Lock, P as Mail, k as Phone, n as X, ot as LoaderCircle, s as User } from "../_libs/lucide-react.mjs";
import { h as seedIfEmpty } from "./adminStore-nj7GgGe2.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$20 } from "./product._id-BjNH_25A.mjs";
import { t as Route$21 } from "./products_.edit._id-u-VZ04U9.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-_ja2fpWe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthModal() {
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [mode, setMode] = (0, import_react.useState)("login");
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [mobile, setMobile] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const handleOpen = () => {
			setIsOpen(true);
			setMode("login");
		};
		window.addEventListener("kambiz_require_login", handleOpen);
		return () => window.removeEventListener("kambiz_require_login", handleOpen);
	}, []);
	if (!isOpen) return null;
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 600));
			const mockHash = btoa(password + "salt");
			if (mode === "login") {
				loginCustomer(email, mockHash);
				toast.success("Welcome back!");
			} else {
				registerCustomer({
					name,
					email,
					mobile,
					passwordHash: mockHash
				});
				toast.success("Account created successfully!");
			}
			setIsOpen(false);
			resetForm();
		} catch (err) {
			toast.error(err.message || "Authentication failed");
		} finally {
			setIsLoading(false);
		}
	};
	const resetForm = () => {
		setName("");
		setEmail("");
		setMobile("");
		setPassword("");
	};
	const closeModal = () => {
		setIsOpen(false);
		resetForm();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-card glass-strong w-full max-w-md rounded-3xl border border-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 border-b border-border flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xl font-bold font-display",
					children: mode === "login" ? "Sign In" : "Create Account"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: closeModal,
					className: "h-8 w-8 rounded-full bg-surface flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex bg-surface p-1 rounded-xl mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setMode("login"),
							className: `flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${mode === "login" ? "bg-primary text-background shadow-glow" : "text-muted-foreground hover:text-foreground"}`,
							children: "Sign In"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setMode("register"),
							className: `flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${mode === "register" ? "bg-primary text-background shadow-glow" : "text-muted-foreground hover:text-foreground"}`,
							children: "Register"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "space-y-4",
						children: [
							mode === "register" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									placeholder: "Full Name",
									value: name,
									onChange: (e) => setName(e.target.value),
									className: "admin-input pl-10"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "tel",
									required: true,
									placeholder: "Mobile Number",
									value: mobile,
									onChange: (e) => setMobile(e.target.value),
									className: "admin-input pl-10"
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									required: true,
									placeholder: "Email Address",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									className: "admin-input pl-10"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									required: true,
									placeholder: "Password",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									className: "admin-input pl-10"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: isLoading,
								className: "btn-hero w-full h-12 mt-4 text-sm disabled:opacity-50 flex items-center justify-center gap-2",
								children: [isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), mode === "login" ? "Sign In" : "Create Account"]
							})
						]
					}),
					mode === "login" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-xs text-muted-foreground mt-6 cursor-pointer hover:text-primary transition-colors",
						children: "Forgot your password?"
					})
				]
			})]
		})
	});
}
var styles_default = "/assets/styles-Bxrp0cFr.css";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-destructive",
					children: "Error"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground break-words",
					children: error.message
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex justify-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => reset(),
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$19 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "KAMBIZ Tyre Supermarket" },
			{
				name: "description",
				content: "Premium tyre supermarket in Wayanad, Kerala."
			},
			{
				name: "author",
				content: "KAMBIZ"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$19.useRouteContext();
	(0, import_react.useEffect)(() => {
		const handleNotification = (e) => {
			const { type, orderId, status } = e.detail;
			if (type === "status_update") toast.info(`Notification Sent: Order ${orderId} is now ${status}`);
		};
		window.addEventListener("kambiz_notification", handleNotification);
		return () => window.removeEventListener("kambiz_notification", handleNotification);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthModal, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme: "dark",
				position: "bottom-right",
				toastOptions: { style: {
					background: "hsl(var(--card))",
					border: "1px solid hsl(var(--border))",
					color: "hsl(var(--foreground))"
				} }
			})
		]
	});
}
var $$splitComponentImporter$18 = () => import("./services-CaA0S7aT.mjs");
var Route$18 = createFileRoute("/services")({
	head: () => ({ meta: [{ title: "Our Services — Kambiz Tyre Supermarket" }, {
		name: "description",
		content: "Tyre sales, wheel alignment, balancing, puncture repair, rethreading and truck tyre services in Wayanad, Kerala."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./products-DOlOAJjC.mjs");
var Route$17 = createFileRoute("/products")({
	head: () => ({ meta: [{ title: "Products — Kambiz Tyre Supermarket" }, {
		name: "description",
		content: "Premium tyres for cars, SUVs, trucks and bikes. Multi-brand selection with free fitment in Wayanad, Kerala."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./order-success-C7MCxW2T.mjs");
var Route$16 = createFileRoute("/order-success")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./contact-D4wqlgSM.mjs");
var Route$15 = createFileRoute("/contact")({
	head: () => ({ meta: [{ title: "Contact Us — Kambiz Tyre Supermarket" }, {
		name: "description",
		content: "Get in touch with Kambiz Tyre Supermarket. Call, visit or send us a message for tyre quotes and appointments in Wayanad."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./checkout-C2KNNOrf.mjs");
var Route$14 = createFileRoute("/checkout")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./cart-Ckx-7VNg.mjs");
var Route$13 = createFileRoute("/cart")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./branches-dUJjH_PK.mjs");
var Route$12 = createFileRoute("/branches")({
	head: () => ({ meta: [{ title: "Our Branches — Kambiz Tyre Supermarket" }, {
		name: "description",
		content: "Find Kambiz Tyre Supermarket at Panamaram and Arinjerummal, Wayanad, Kerala. Get directions, opening hours and contact details."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./admin-C6J_pAQL.mjs");
var Route$11 = createFileRoute("/admin")({
	beforeLoad: () => {
		if (typeof window !== "undefined") seedIfEmpty();
	},
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./account-DkaAif_v.mjs");
var Route$10 = createFileRoute("/account")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./about-Y4UeF4aR.mjs");
var Route$9 = createFileRoute("/about")({
	head: () => ({ meta: [{ title: "About Us — Kambiz Tyre Supermarket" }, {
		name: "description",
		content: "Two decades of keeping Kerala moving. Learn about Kambiz Tyre Supermarket's history, values and team in Wayanad."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./routes-_0PbtLzR.mjs");
var Route$8 = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "Kambiz Tyre Supermarket — Kerala's Premium Tyre Destination" },
			{
				name: "description",
				content: "Premium tyres, wheel alignment, balancing, puncture repair and truck tyre services in Wayanad, Kerala. Two branches at Panamaram and Arinjerummal."
			},
			{
				property: "og:title",
				content: "Kambiz Tyre Supermarket — Premium Tyres & Service in Wayanad"
			},
			{
				property: "og:description",
				content: "World-class tyres and precision automotive care across two branches in Wayanad, Kerala."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "/"
			}
		],
		links: [
			{
				rel: "canonical",
				href: "/"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: ""
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
			}
		]
	}),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./admin-DICXuC2o.mjs");
var Route$7 = createFileRoute("/admin/")({
	beforeLoad: () => {
		throw redirect({ to: "/admin/dashboard" });
	},
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./users-BA_ja6N-.mjs");
var Route$6 = createFileRoute("/admin/users")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./products-CsGSOOaf.mjs");
var Route$5 = createFileRoute("/admin/products")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./orders-BxMt7lYI.mjs");
var Route$4 = createFileRoute("/admin/orders")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./login-ChVVTPGW.mjs");
var Route$3 = createFileRoute("/admin/login")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./dashboard-Db8ZfzeO.mjs");
var Route$2 = createFileRoute("/admin/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./customers-CCBbqtLh.mjs");
var Route$1 = createFileRoute("/admin/customers")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./products_.add-B2tRfv8S.mjs");
var Route = createFileRoute("/admin/products_/add")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var ServicesRoute = Route$18.update({
	id: "/services",
	path: "/services",
	getParentRoute: () => Route$19
});
var ProductsRoute = Route$17.update({
	id: "/products",
	path: "/products",
	getParentRoute: () => Route$19
});
var OrderSuccessRoute = Route$16.update({
	id: "/order-success",
	path: "/order-success",
	getParentRoute: () => Route$19
});
var ContactRoute = Route$15.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$19
});
var CheckoutRoute = Route$14.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$19
});
var CartRoute = Route$13.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => Route$19
});
var BranchesRoute = Route$12.update({
	id: "/branches",
	path: "/branches",
	getParentRoute: () => Route$19
});
var AdminRoute = Route$11.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$19
});
var AccountRoute = Route$10.update({
	id: "/account",
	path: "/account",
	getParentRoute: () => Route$19
});
var AboutRoute = Route$9.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$19
});
var IndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$19
});
var AdminIndexRoute = Route$7.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var ProductIdRoute = Route$20.update({
	id: "/product/$id",
	path: "/product/$id",
	getParentRoute: () => Route$19
});
var AdminUsersRoute = Route$6.update({
	id: "/users",
	path: "/users",
	getParentRoute: () => AdminRoute
});
var AdminProductsRoute = Route$5.update({
	id: "/products",
	path: "/products",
	getParentRoute: () => AdminRoute
});
var AdminOrdersRoute = Route$4.update({
	id: "/orders",
	path: "/orders",
	getParentRoute: () => AdminRoute
});
var AdminLoginRoute = Route$3.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => AdminRoute
});
var AdminDashboardRoute = Route$2.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AdminRoute
});
var AdminRouteChildren = {
	AdminCustomersRoute: Route$1.update({
		id: "/customers",
		path: "/customers",
		getParentRoute: () => AdminRoute
	}),
	AdminDashboardRoute,
	AdminLoginRoute,
	AdminOrdersRoute,
	AdminProductsRoute,
	AdminUsersRoute,
	AdminIndexRoute,
	AdminProductsAddRoute: Route.update({
		id: "/products_/add",
		path: "/products/add",
		getParentRoute: () => AdminRoute
	}),
	AdminProductsEditIdRoute: Route$21.update({
		id: "/products_/edit/$id",
		path: "/products/edit/$id",
		getParentRoute: () => AdminRoute
	})
};
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	AccountRoute,
	AdminRoute: AdminRoute._addFileChildren(AdminRouteChildren),
	BranchesRoute,
	CartRoute,
	CheckoutRoute,
	ContactRoute,
	OrderSuccessRoute,
	ProductsRoute,
	ServicesRoute,
	ProductIdRoute
};
var routeTree = Route$19._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
