//#region node_modules/.nitro/vite/services/ssr/assets/shopStore-eN_ZWT97.js
var KEYS = {
	cart: "kambiz_cart",
	customers: "kambiz_customers",
	shopSession: "kambiz_shop_session",
	orders: "kambiz_orders"
};
function getCart() {
	try {
		const raw = localStorage.getItem(KEYS.cart);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}
function saveCart(cart) {
	localStorage.setItem(KEYS.cart, JSON.stringify(cart));
	window.dispatchEvent(new StorageEvent("storage", { key: KEYS.cart }));
}
function addToCart(product, quantity = 1) {
	const cart = getCart();
	const existing = cart.find((i) => i.product.id === product.id);
	if (existing) existing.quantity += quantity;
	else cart.push({
		product,
		quantity
	});
	saveCart(cart);
}
function removeFromCart(productId) {
	saveCart(getCart().filter((i) => i.product.id !== productId));
}
function updateCartQuantity(productId, quantity) {
	if (quantity <= 0) return removeFromCart(productId);
	const cart = getCart();
	const item = cart.find((i) => i.product.id === productId);
	if (item) item.quantity = quantity;
	saveCart(cart);
}
function clearCart() {
	saveCart([]);
}
function getShopSession() {
	try {
		const raw = localStorage.getItem(KEYS.shopSession);
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}
function setShopSession(customer) {
	if (customer) localStorage.setItem(KEYS.shopSession, JSON.stringify(customer));
	else localStorage.removeItem(KEYS.shopSession);
	window.dispatchEvent(new StorageEvent("storage", { key: KEYS.shopSession }));
}
function createMockCustomer() {
	const mock = {
		id: "cust-1",
		name: "John Doe",
		email: "john@example.com",
		mobile: "9876543210",
		passwordHash: "hash",
		addresses: [{
			id: "addr-1",
			fullName: "John Doe",
			mobile: "9876543210",
			addressLine: "123 Main St, Near Plaza",
			city: "Wayanad",
			district: "Wayanad",
			state: "Kerala",
			pincode: "670721",
			country: "India",
			isDefault: true
		}]
	};
	const customers = getCustomers();
	if (!customers.find((c) => c.id === mock.id)) saveCustomers([...customers, mock]);
	return mock;
}
function registerCustomer(data) {
	const customers = getCustomers();
	if (customers.find((c) => c.email.toLowerCase() === data.email.toLowerCase())) throw new Error("Email already registered");
	const newCustomer = {
		...data,
		id: `cust-${Date.now().toString().slice(-6)}`,
		addresses: []
	};
	saveCustomers([...customers, newCustomer]);
	setShopSession(newCustomer);
	return newCustomer;
}
function loginCustomer(email, passwordHash) {
	const customer = getCustomers().find((c) => c.email.toLowerCase() === email.toLowerCase() && c.passwordHash === passwordHash);
	if (!customer) throw new Error("Invalid email or password");
	setShopSession(customer);
	return customer;
}
function getCustomers() {
	try {
		const raw = localStorage.getItem(KEYS.customers);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}
function saveCustomers(customers) {
	localStorage.setItem(KEYS.customers, JSON.stringify(customers));
	window.dispatchEvent(new StorageEvent("storage", { key: KEYS.customers }));
}
function updateCustomer(customerId, data) {
	const customers = getCustomers();
	const index = customers.findIndex((c) => c.id === customerId);
	if (index !== -1) {
		customers[index] = {
			...customers[index],
			...data
		};
		saveCustomers(customers);
	}
}
function deleteCustomer(customerId) {
	saveCustomers(getCustomers().filter((c) => c.id !== customerId));
}
function getOrders() {
	try {
		const raw = localStorage.getItem(KEYS.orders);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}
function saveOrders(orders) {
	localStorage.setItem(KEYS.orders, JSON.stringify(orders));
	window.dispatchEvent(new StorageEvent("storage", { key: KEYS.orders }));
}
function placeOrder(order) {
	const orders = getOrders();
	const newOrder = {
		...order,
		id: `ORD-${Date.now().toString().slice(-6)}`,
		orderDate: (/* @__PURE__ */ new Date()).toISOString(),
		orderStatus: "Pending"
	};
	saveOrders([newOrder, ...orders]);
	clearCart();
	return newOrder;
}
function updateOrderStatus(orderId, status) {
	const orders = getOrders();
	const index = orders.findIndex((o) => o.id === orderId);
	if (index !== -1) {
		orders[index].orderStatus = status;
		saveOrders(orders);
	}
}
function deleteOrder(orderId) {
	saveOrders(getOrders().filter((o) => o.id !== orderId));
}
//#endregion
export { getCart as a, getShopSession as c, registerCustomer as d, removeFromCart as f, updateOrderStatus as g, updateCustomer as h, deleteOrder as i, loginCustomer as l, updateCartQuantity as m, createMockCustomer as n, getCustomers as o, setShopSession as p, deleteCustomer as r, getOrders as s, addToCart as t, placeOrder as u };
