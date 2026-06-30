import { o as __toESM } from "../_runtime.mjs";
import { a as getCart, c as getShopSession } from "./shopStore-eN_ZWT97.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useShop-Bs_GNeI8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useShop() {
	const [cart, setCart] = (0, import_react.useState)(() => getCart());
	const [session, setSession] = (0, import_react.useState)(() => getShopSession());
	(0, import_react.useEffect)(() => {
		setCart(getCart());
		setSession(getShopSession());
		const handleStorage = (e) => {
			if (e.key === "kambiz_cart") setCart(getCart());
			if (e.key === "kambiz_shop_session") setSession(getShopSession());
		};
		window.addEventListener("storage", handleStorage);
		return () => window.removeEventListener("storage", handleStorage);
	}, []);
	return {
		cart,
		session,
		cartItemsCount: cart.reduce((total, item) => total + item.quantity, 0),
		cartSubtotal: cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
	};
}
//#endregion
export { useShop as t };
