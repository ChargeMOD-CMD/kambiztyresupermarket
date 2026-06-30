import { a as __toESM } from "../_runtime.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { I as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { G as EyeOff, W as Eye, b as ShieldCheck, dt as CircleAlert, ot as LoaderCircle, q as Disc } from "../_libs/lucide-react.mjs";
import { n as useAdminAuth } from "./adminAuth-n-e8bb6l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-ChVVTPGW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var login_bg_default = "/assets/login-bg-C5MksQXx.png";
function AdminLogin() {
	const { session, login } = useAdminAuth();
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPw, setShowPw] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (session) navigate({ to: "/admin/dashboard" });
	}, [session, navigate]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		const result = await login(email, password);
		setLoading(false);
		if (!result.ok) setError(result.error ?? "Login failed.");
		else navigate({ to: "/admin/dashboard" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-screen items-center justify-center overflow-hidden px-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 z-0 overflow-hidden bg-zinc-950",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "absolute inset-0 h-full w-[120%] max-w-none bg-cover bg-center opacity-70",
						style: { backgroundImage: `url(${login_bg_default})` },
						animate: { x: [
							"0%",
							"-10%",
							"0%"
						] },
						transition: {
							duration: 30,
							repeat: Infinity,
							ease: "linear"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 mix-blend-color-dodge" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/40 backdrop-blur-[1px]" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 -z-10 pointer-events-none overflow-hidden",
				children: [...Array(6)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "absolute rounded-full bg-primary/20 blur-xl",
					style: {
						width: Math.random() * 200 + 100,
						height: Math.random() * 200 + 100,
						top: `${Math.random() * 100}%`,
						left: `${Math.random() * 100}%`
					},
					animate: {
						y: [
							0,
							-40,
							0
						],
						x: [
							0,
							30,
							0
						],
						scale: [
							1,
							1.2,
							1
						],
						opacity: [
							.3,
							.6,
							.3
						]
					},
					transition: {
						duration: Math.random() * 10 + 10,
						repeat: Infinity,
						ease: "easeInOut"
					}
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .6,
					ease: "easeOut"
				},
				className: "w-full max-w-md relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-60 pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 text-center relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 ring-1 ring-primary/30 shadow-glow relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disc, { className: "absolute h-16 w-16 text-primary/20 animate-spin-slow" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "relative z-10 h-8 w-8 text-primary drop-shadow-[0_0_8px_rgba(255,102,0,0.8)]" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-4xl font-bold tracking-tight text-white drop-shadow-md",
								children: "Admin Portal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-primary/80 font-medium tracking-wide uppercase",
								children: "Kambiz Tyre Supermarket"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "glass rounded-3xl p-8 shadow-xl ring-1 ring-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSubmit,
							className: "space-y-5",
							id: "admin-login-form",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "admin-email",
										className: "block text-sm font-medium",
										children: "Email address"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "admin-email",
										type: "email",
										autoComplete: "email",
										required: true,
										value: email,
										onChange: (e) => setEmail(e.target.value),
										className: "admin-input",
										placeholder: "Enter User ID"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "admin-password",
										className: "block text-sm font-medium",
										children: "Password"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "admin-password",
											type: showPw ? "text" : "password",
											autoComplete: "current-password",
											required: true,
											value: password,
											onChange: (e) => setPassword(e.target.value),
											className: "admin-input pr-12",
											placeholder: "••••••••"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setShowPw(!showPw),
											className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
											"aria-label": "Toggle password visibility",
											children: showPw ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
										})]
									})]
								}),
								error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 rounded-xl bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 flex-shrink-0" }), error]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									id: "admin-login-submit",
									type: "submit",
									disabled: loading,
									className: "btn-hero w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed",
									children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" }), loading ? "Verifying…" : "Sign In"]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-center text-xs text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/",
							className: "underline-offset-2 hover:underline",
							children: "← Back to website"
						})
					})
				]
			})
		]
	});
}
//#endregion
export { AdminLogin as component };
