import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as Header, t as Footer } from "./Footer-rkNcsPDt.mjs";
import { t as Products } from "./Products-CS4eoGWz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-DOlOAJjC.js
var import_jsx_runtime = require_jsx_runtime();
function ProductsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative overflow-x-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-28",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Products, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { ProductsPage as component };
