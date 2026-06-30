import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { d as getSession, m as loginUser, o as clearSession } from "./adminStore-nj7GgGe2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/adminAuth-n-e8bb6l.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AdminAuthContext = (0, import_react.createContext)(null);
function AdminAuthProvider({ children }) {
	const [session, setSession] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		setSession(getSession());
		setIsLoading(false);
	}, []);
	const login = async (email, password) => {
		await new Promise((r) => setTimeout(r, 600));
		const sess = loginUser(email, password);
		if (!sess) return {
			ok: false,
			error: "Invalid email or password."
		};
		setSession(sess);
		return { ok: true };
	};
	const logout = () => {
		clearSession();
		setSession(null);
	};
	const hasPermission = (perm) => {
		if (!session) return false;
		return session.permissions.includes(perm);
	};
	const isOwner = () => session?.role === "owner";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminAuthContext.Provider, {
		value: {
			session,
			isLoading,
			login,
			logout,
			hasPermission,
			isOwner
		},
		children
	});
}
function useAdminAuth() {
	const ctx = (0, import_react.useContext)(AdminAuthContext);
	if (!ctx) throw new Error("useAdminAuth must be used inside <AdminAuthProvider>");
	return ctx;
}
//#endregion
export { useAdminAuth as n, AdminAuthProvider as t };
