import { Product } from "./adminStore";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  mobile: string;
  passwordHash: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  fullName: string;
  mobile: string;
  addressLine: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  customerId: string;
  items: CartItem[];
  shippingAddress: Address;
  paymentMethod: "UPI" | "Card" | "NetBanking" | "Wallet" | "COD";
  paymentStatus: "Pending" | "Completed" | "Failed";
  orderStatus:
    "Pending" | "Processing" | "Packed" | "Shipped" | "Delivered" | "Cancelled" | "Returned";
  subtotal: number;
  discount: number;
  gst: number;
  shipping: number;
  totalAmount: number;
  orderDate: string;
  deliveryDate?: string;
}

const KEYS = {
  cart: "kambiz_cart",
  customers: "kambiz_customers",
  shopSession: "kambiz_shop_session",
  orders: "kambiz_orders",
};

// ── Cart Management ──

export function getCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(KEYS.cart);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem(KEYS.cart, JSON.stringify(cart));
  window.dispatchEvent(new StorageEvent("storage", { key: KEYS.cart }));
}

export function addToCart(product: Product, quantity = 1) {
  const cart = getCart();
  const existing = cart.find((i) => i.product.id === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
  saveCart(cart);
}

export function removeFromCart(productId: string) {
  saveCart(getCart().filter((i) => i.product.id !== productId));
}

export function updateCartQuantity(productId: string, quantity: number) {
  if (quantity <= 0) return removeFromCart(productId);
  const cart = getCart();
  const item = cart.find((i) => i.product.id === productId);
  if (item) item.quantity = quantity;
  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}

// ── Customer Auth ──

export function getShopSession(): Customer | null {
  try {
    const raw = localStorage.getItem(KEYS.shopSession);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setShopSession(customer: Customer | null) {
  if (customer) {
    localStorage.setItem(KEYS.shopSession, JSON.stringify(customer));
  } else {
    localStorage.removeItem(KEYS.shopSession);
  }
  window.dispatchEvent(new StorageEvent("storage", { key: KEYS.shopSession }));
}

// Simple mock user
export function createMockCustomer() {
  const mock: Customer = {
    id: "cust-1",
    name: "John Doe",
    email: "john@example.com",
    mobile: "9876543210",
    passwordHash: "hash",
    addresses: [
      {
        id: "addr-1",
        fullName: "John Doe",
        mobile: "9876543210",
        addressLine: "123 Main St, Near Plaza",
        city: "Wayanad",
        district: "Wayanad",
        state: "Kerala",
        pincode: "670721",
        country: "India",
        isDefault: true,
      },
    ],
  };
  const customers = getCustomers();
  if (!customers.find((c) => c.id === mock.id)) {
    saveCustomers([...customers, mock]);
  }
  return mock;
}

export function registerCustomer(data: Omit<Customer, "id" | "addresses">): Customer {
  const customers = getCustomers();
  const existing = customers.find((c) => c.email.toLowerCase() === data.email.toLowerCase());
  if (existing) {
    throw new Error("Email already registered");
  }

  const newCustomer: Customer = {
    ...data,
    id: `cust-${Date.now().toString().slice(-6)}`,
    addresses: [],
  };

  saveCustomers([...customers, newCustomer]);
  setShopSession(newCustomer);
  return newCustomer;
}

export function loginCustomer(email: string, passwordHash: string): Customer {
  const customers = getCustomers();
  const customer = customers.find(
    (c) => c.email.toLowerCase() === email.toLowerCase() && c.passwordHash === passwordHash,
  );
  if (!customer) {
    throw new Error("Invalid email or password");
  }
  setShopSession(customer);
  return customer;
}

export function getCustomers(): Customer[] {
  try {
    const raw = localStorage.getItem(KEYS.customers);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomers(customers: Customer[]) {
  localStorage.setItem(KEYS.customers, JSON.stringify(customers));
  window.dispatchEvent(new StorageEvent("storage", { key: KEYS.customers }));
}

export function updateCustomer(customerId: string, data: Partial<Customer>) {
  const customers = getCustomers();
  const index = customers.findIndex((c) => c.id === customerId);
  if (index !== -1) {
    customers[index] = { ...customers[index], ...data };
    saveCustomers(customers);
  }
}

export function deleteCustomer(customerId: string) {
  const customers = getCustomers();
  saveCustomers(customers.filter((c) => c.id !== customerId));
}

// ── Orders ──

export function getOrders(): Order[] {
  try {
    const raw = localStorage.getItem(KEYS.orders);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveOrders(orders: Order[]) {
  localStorage.setItem(KEYS.orders, JSON.stringify(orders));
  window.dispatchEvent(new StorageEvent("storage", { key: KEYS.orders }));
}

export function placeOrder(order: Omit<Order, "id" | "orderDate" | "orderStatus">): Order {
  const orders = getOrders();
  const newOrder: Order = {
    ...order,
    id: `ORD-${Date.now().toString().slice(-6)}`,
    orderDate: new Date().toISOString(),
    orderStatus: "Pending",
  };
  saveOrders([newOrder, ...orders]);
  clearCart();
  return newOrder;
}

export function updateOrderStatus(orderId: string, status: Order["orderStatus"]) {
  const orders = getOrders();
  const index = orders.findIndex((o) => o.id === orderId);
  if (index !== -1) {
    orders[index].orderStatus = status;
    saveOrders(orders);
  }
}

export function deleteOrder(orderId: string) {
  const orders = getOrders();
  saveOrders(orders.filter((o) => o.id !== orderId));
}
