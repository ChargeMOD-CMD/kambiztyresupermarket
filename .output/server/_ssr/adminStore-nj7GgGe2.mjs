//#region node_modules/.nitro/vite/services/ssr/assets/adminStore-nj7GgGe2.js
var tyre_product_default = "/assets/tyre-product-RU_tY_D5.jpg";
var service_truck_default = "/assets/service-truck-CUtIAbrf.jpg";
var service_alignment_default = "/assets/service-alignment-hsBtdQzi.jpg";
var ALL_PERMISSIONS = [
	"dashboard",
	"products.view",
	"products.add",
	"products.edit",
	"products.delete",
	"users.view",
	"users.add",
	"users.delete"
];
var PERMISSION_LABELS = {
	dashboard: "View Dashboard",
	"products.view": "View Products",
	"products.add": "Add Products",
	"products.edit": "Edit Products",
	"products.delete": "Delete Products",
	"users.view": "View Users",
	"users.add": "Add Users",
	"users.delete": "Delete Users"
};
var KEYS = {
	products: "kambiz_products",
	users: "kambiz_users",
	session: "kambiz_session",
	seeded: "kambiz_seeded"
};
function hashPassword(plain) {
	return btoa(plain + ":kambiz_salt_2024");
}
function checkPassword(plain, hash) {
	return hashPassword(plain) === hash;
}
function formatPrice(amount) {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0
	}).format(amount);
}
var DEFAULT_PRODUCTS = [
	{
		id: "default-1",
		name: "Passenger Car Tyres",
		brand: "Kambiz Select",
		category: "Car",
		size: "13\" – 19\"",
		loadIndex: "91 W",
		season: "All-Season",
		price: 3499,
		originalPrice: 4999,
		discount: 30,
		tag: "Everyday Performance",
		spec: "13\" – 19\" • Tubeless",
		description: "Premium passenger car tyres for everyday performance with superior grip and comfort.",
		image: tyre_product_default,
		gallery: [tyre_product_default],
		inStock: true,
		stockCount: 150,
		sku: "KMBZ-PC-100",
		modelNumber: "KS-100",
		warranty: "3 Years Manufacturer Warranty",
		vehicleCompatibility: [
			"Hatchbacks",
			"Sedans",
			"Compact SUVs"
		],
		technicalSpecs: {
			"Speed Rating": "W (Up to 270 km/h)",
			"Tread Depth": "8 mm",
			Type: "Tubeless Radial"
		},
		rating: 4.5,
		reviewsCount: 128,
		featured: false,
		createdAt: "2024-01-01T00:00:00Z"
	},
	{
		id: "default-2",
		name: "SUV & 4x4 Tyres",
		brand: "Kambiz Pro",
		category: "SUV",
		size: "265/65 R17",
		loadIndex: "112 H",
		season: "All-Terrain",
		price: 6999,
		originalPrice: 9500,
		discount: 26,
		tag: "Adventure Ready",
		spec: "All-Terrain • Highway",
		description: "Built for adventure — superior off-road traction and on-highway stability.",
		image: service_alignment_default,
		gallery: [service_alignment_default],
		inStock: true,
		stockCount: 45,
		sku: "KMBZ-SUV-200",
		modelNumber: "KP-200",
		warranty: "5 Years Manufacturer Warranty",
		vehicleCompatibility: [
			"Toyota Fortuner",
			"Ford Endeavour",
			"Mahindra Thar"
		],
		technicalSpecs: {
			"Speed Rating": "H (Up to 210 km/h)",
			"Ply Rating": "8 PR",
			Type: "Tubeless All-Terrain"
		},
		rating: 4.8,
		reviewsCount: 84,
		featured: true,
		createdAt: "2024-01-02T00:00:00Z"
	},
	{
		id: "default-3",
		name: "Commercial & Truck",
		brand: "Kambiz Heavy",
		category: "Truck",
		size: "315/80 R22.5",
		loadIndex: "154 M",
		season: "All-Season",
		price: 18500,
		originalPrice: 24e3,
		discount: 22,
		tag: "Built to Endure",
		spec: "Heavy Load • Long Haul",
		description: "Heavy-duty commercial tyres engineered for maximum load capacity and durability.",
		image: service_truck_default,
		gallery: [service_truck_default],
		inStock: true,
		stockCount: 20,
		sku: "KMBZ-TRK-300",
		modelNumber: "KH-300",
		warranty: "1 Year Replacement Warranty",
		vehicleCompatibility: [
			"Heavy Duty Trucks",
			"Buses",
			"Trailers"
		],
		technicalSpecs: {
			"Speed Rating": "M (Up to 130 km/h)",
			"Load Capacity": "3750 kg per tyre",
			Type: "Tube Type"
		},
		rating: 4.2,
		reviewsCount: 36,
		featured: false,
		createdAt: "2024-01-03T00:00:00Z"
	}
];
function getProducts() {
	try {
		const raw = localStorage.getItem(KEYS.products);
		if (!raw) return DEFAULT_PRODUCTS;
		return JSON.parse(raw);
	} catch {
		return DEFAULT_PRODUCTS;
	}
}
function saveProducts(products) {
	localStorage.setItem(KEYS.products, JSON.stringify(products));
	window.dispatchEvent(new StorageEvent("storage", { key: KEYS.products }));
}
function addProduct(product) {
	const current = getProducts();
	const newProduct = {
		...product,
		id: `prod-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	saveProducts([...current, newProduct]);
	return newProduct;
}
function updateProduct(id, updates) {
	saveProducts(getProducts().map((p) => p.id === id ? {
		...p,
		...updates
	} : p));
}
function deleteProduct(id) {
	saveProducts(getProducts().filter((p) => p.id !== id));
}
var OWNER = {
	id: "owner-1",
	name: "Kambiz Admin",
	email: "admin@kambiz.com",
	passwordHash: hashPassword("zibamk@nimda#"),
	role: "owner",
	permissions: ALL_PERMISSIONS,
	createdAt: "2024-01-01T00:00:00Z"
};
function getUsers() {
	try {
		const raw = localStorage.getItem(KEYS.users);
		if (!raw) return [OWNER];
		return [OWNER, ...JSON.parse(raw).filter((u) => u.id !== OWNER.id)];
	} catch {
		return [OWNER];
	}
}
function saveUsers(users) {
	const withoutOwner = users.filter((u) => u.id !== OWNER.id);
	localStorage.setItem(KEYS.users, JSON.stringify(withoutOwner));
}
function addUser(user) {
	const current = getUsers();
	const newUser = {
		...user,
		id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	saveUsers([...current, newUser]);
	return newUser;
}
function deleteUser(id) {
	saveUsers(getUsers().filter((u) => u.id !== id && u.id !== OWNER.id));
}
function getSession() {
	try {
		const raw = localStorage.getItem(KEYS.session);
		if (!raw) return null;
		return JSON.parse(raw);
	} catch {
		return null;
	}
}
function saveSession(session) {
	localStorage.setItem(KEYS.session, JSON.stringify(session));
}
function clearSession() {
	localStorage.removeItem(KEYS.session);
}
function loginUser(email, password) {
	const user = getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
	if (!user) return null;
	if (!checkPassword(password, user.passwordHash)) return null;
	const session = {
		userId: user.id,
		email: user.email,
		name: user.name,
		role: user.role,
		permissions: user.permissions,
		loginAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	saveSession(session);
	return session;
}
function seedIfEmpty() {
	if (localStorage.getItem(KEYS.seeded)) return;
	if (!localStorage.getItem(KEYS.products)) saveProducts(DEFAULT_PRODUCTS);
	localStorage.setItem(KEYS.seeded, "1");
}
//#endregion
export { addUser as a, deleteUser as c, getSession as d, getUsers as f, updateProduct as g, seedIfEmpty as h, addProduct as i, formatPrice as l, loginUser as m, DEFAULT_PRODUCTS as n, clearSession as o, hashPassword as p, PERMISSION_LABELS as r, deleteProduct as s, ALL_PERMISSIONS as t, getProducts as u };
