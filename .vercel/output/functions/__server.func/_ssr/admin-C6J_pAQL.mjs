import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { I as useNavigate, f as Outlet, l as useLocation } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useAdminAuth, t as AdminAuthProvider } from "./adminAuth-n-e8bb6l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-C6J_pAQL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Redirects unauthenticated visitors to /admin/login. Renders children otherwise. */
function AdminGuard({ children }) {
	const { session, isLoading } = useAdminAuth();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!isLoading && !session) navigate({ to: "/admin/login" });
	}, [
		session,
		isLoading,
		navigate
	]);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" })
	});
	if (!session) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function AdminRoot() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminAuthProvider, { children: useLocation().pathname === "/admin/login" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminGuard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) });
}
//#endregion
export { AdminRoot as component };
