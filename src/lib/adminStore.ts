// ── Kambiz Admin Store ────────────────────────────────────────────────────
// All persistence via localStorage. No backend required.

import tyreImg from "@/assets/tyre-product.jpg";
import truckImg from "@/assets/service-truck.jpg";
import alignImg from "@/assets/service-alignment.jpg";

// ── Types ────────────────────────────────────────────────────────────────

export type Permission =
  | "dashboard"
  | "products.view"
  | "products.add"
  | "products.edit"
  | "products.delete"
  | "users.view"
  | "users.add"
  | "users.delete";

export const ALL_PERMISSIONS: Permission[] = [
  "dashboard",
  "products.view",
  "products.add",
  "products.edit",
  "products.delete",
  "users.view",
  "users.add",
  "users.delete",
];

export const PERMISSION_LABELS: Record<Permission, string> = {
  dashboard: "View Dashboard",
  "products.view": "View Products",
  "products.add": "Add Products",
  "products.edit": "Edit Products",
  "products.delete": "Delete Products",
  "users.view": "View Users",
  "users.add": "Add Users",
  "users.delete": "Delete Users",
};

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // simple base64 "hash" for client-only security
  role: "owner" | "admin";
  permissions: Permission[];
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: "Car" | "Bike";
  size: string;
  loadIndex: string;
  season: string;
  price: number; // changed to number for cart math
  originalPrice: number; // changed to number (MRP)
  discount: number; // e.g., 15 for 15%
  tag: string;
  spec: string;
  description: string;
  image: string; // Main image
  gallery: string[]; // Additional images for PDP
  inStock: boolean;
  stockCount: number; // Inventory count
  sku: string;
  modelNumber: string;
  warranty: string;
  vehicleCompatibility: string[];
  vehicleBrands: string; // e.g. "Toyota, Honda"
  vehicleNames: string; // e.g. "Fortuner, City"
  fuelType?: string; // e.g. "Petrol, Diesel, Electric"
  technicalSpecs: Record<string, string>;
  rating: number;
  reviewsCount: number;
  featured: boolean;
  createdAt: string;
}

export interface Session {
  userId: string;
  email: string;
  name: string;
  role: "owner" | "admin";
  permissions: Permission[];
  loginAt: string;
}

// ── Storage Keys ─────────────────────────────────────────────────────────

const KEYS = {
  products: "kambiz_products",
  users: "kambiz_users",
  session: "kambiz_session",
  seeded: "kambiz_seeded",
} as const;

// ── Simple obfuscation (not real security — client only) ─────────────────

export function hashPassword(plain: string): string {
  return btoa(plain + ":kambiz_salt_2024");
}

export function checkPassword(plain: string, hash: string): boolean {
  return hashPassword(plain) === hash;
}

// ── Default seed products (shown before any admin additions) ─────────────

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function getImageDataUrl(src: string): string {
  // For default products we use the imported asset paths directly
  return src;
}

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "default-1",
    name: "Standard Car Tyres",
    brand: "MRF",
    category: "Car",
    size: '13" – 19"',
    loadIndex: "91 W",
    season: "All-Season",
    price: 3499,
    originalPrice: 4999,
    discount: 30,
    tag: "Everyday Performance",
    spec: '13" – 19" • Tubeless',
    description:
      "Premium passenger car tyres for everyday performance with superior grip and comfort.",
    image: tyreImg,
    gallery: [tyreImg],
    inStock: true,
    stockCount: 150,
    sku: "KMBZ-PC-100",
    modelNumber: "KS-100",
    warranty: "3 Years Manufacturer Warranty",
    vehicleCompatibility: ["Hatchbacks", "Sedans", "Compact SUVs"],
    vehicleBrands: "Honda, Hyundai, Maruti Suzuki",
    vehicleNames: "City, i20, Swift",
    fuelType: "Petrol, Diesel",
    technicalSpecs: {
      "Speed Rating": "W (Up to 270 km/h)",
      "Tread Depth": "8 mm",
      Type: "Tubeless Radial",
    },
    rating: 4.5,
    reviewsCount: 128,
    featured: false,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "default-2",
    name: "SUV & 4x4 Tyres",
    brand: "Apollo",
    category: "Car",
    size: "265/65 R17",
    loadIndex: "112 H",
    season: "All-Terrain",
    price: 6999,
    originalPrice: 9500,
    discount: 26,
    tag: "Adventure Ready",
    spec: "All-Terrain • Highway",
    description: "Built for adventure — superior off-road traction and on-highway stability.",
    image: alignImg,
    gallery: [alignImg],
    inStock: true,
    stockCount: 45,
    sku: "KMBZ-SUV-200",
    modelNumber: "KP-200",
    warranty: "5 Years Manufacturer Warranty",
    vehicleCompatibility: ["Toyota Fortuner", "Ford Endeavour", "Mahindra Thar"],
    vehicleBrands: "Toyota, Ford, Mahindra",
    vehicleNames: "Fortuner, Endeavour, Thar",
    fuelType: "Diesel",
    technicalSpecs: {
      "Speed Rating": "H (Up to 210 km/h)",
      "Ply Rating": "8 PR",
      Type: "Tubeless All-Terrain",
    },
    rating: 4.8,
    reviewsCount: 84,
    featured: true,
    createdAt: "2024-01-02T00:00:00Z",
  },
  {
    id: "default-3",
    name: "Performance Bike Tyres",
    brand: "Michelin",
    category: "Bike",
    size: "140/70 R17",
    loadIndex: "66 H",
    season: "All-Season",
    price: 18500,
    originalPrice: 24000,
    discount: 22,
    tag: "Built to Endure",
    spec: "Sport • High Grip",
    description: "High-performance motorcycle tyres engineered for maximum cornering grip and durability.",
    image: truckImg,
    gallery: [truckImg],
    inStock: true,
    stockCount: 20,
    sku: "KMBZ-BIKE-300",
    modelNumber: "KH-300",
    warranty: "1 Year Replacement Warranty",
    vehicleCompatibility: ["Sports Bikes", "Cruisers"],
    vehicleBrands: "Yamaha, Royal Enfield, KTM",
    vehicleNames: "R15, Classic 350, Duke 390",
    fuelType: "Petrol",
    technicalSpecs: {
      "Speed Rating": "M (Up to 130 km/h)",
      "Load Capacity": "3750 kg per tyre",
      Type: "Tube Type",
    },
    rating: 4.2,
    reviewsCount: 36,
    featured: false,
    createdAt: "2024-01-03T00:00:00Z",
  },
];

// ── Products CRUD ─────────────────────────────────────────────────────────

export function getProducts(): Product[] {
  try {
    const raw = localStorage.getItem(KEYS.products);
    if (!raw) return DEFAULT_PRODUCTS;
    const stored: Product[] = JSON.parse(raw);
    // Merge: default products first, then admin-added ones
    return stored;
  } catch {
    return DEFAULT_PRODUCTS;
  }
}

export function saveProducts(products: Product[]): void {
  localStorage.setItem(KEYS.products, JSON.stringify(products));
  // Dispatch storage event so Products.tsx can react without page reload
  window.dispatchEvent(new StorageEvent("storage", { key: KEYS.products }));
}

export function addProduct(product: Omit<Product, "id" | "createdAt">): Product {
  const current = getProducts();
  const newProduct: Product = {
    ...product,
    id: `prod-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
  };
  const updated = [...current, newProduct];
  saveProducts(updated);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): void {
  const current = getProducts();
  const updated = current.map((p) => (p.id === id ? { ...p, ...updates } : p));
  saveProducts(updated);
}

export function deleteProduct(id: string): void {
  const current = getProducts();
  saveProducts(current.filter((p) => p.id !== id));
}

// ── Users CRUD ────────────────────────────────────────────────────────────

const OWNER: AdminUser = {
  id: "owner-1",
  name: "Kambiz Admin",
  email: "admin@kambiz.com",
  passwordHash: hashPassword("zibamk@nimda#"),
  role: "owner",
  permissions: ALL_PERMISSIONS,
  createdAt: "2024-01-01T00:00:00Z",
};

export function getUsers(): AdminUser[] {
  try {
    const raw = localStorage.getItem(KEYS.users);
    if (!raw) return [OWNER];
    const stored: AdminUser[] = JSON.parse(raw);
    // Always include owner, dedup by id
    const withOwner = [OWNER, ...stored.filter((u) => u.id !== OWNER.id)];
    return withOwner;
  } catch {
    return [OWNER];
  }
}

export function saveUsers(users: AdminUser[]): void {
  // Never save the owner to localStorage — always rebuilt from constant
  const withoutOwner = users.filter((u) => u.id !== OWNER.id);
  localStorage.setItem(KEYS.users, JSON.stringify(withoutOwner));
}

export function addUser(user: Omit<AdminUser, "id" | "createdAt">): AdminUser {
  const current = getUsers();
  const newUser: AdminUser = {
    ...user,
    id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
  };
  saveUsers([...current, newUser]);
  return newUser;
}

export function deleteUser(id: string): void {
  const current = getUsers();
  saveUsers(current.filter((u) => u.id !== id && u.id !== OWNER.id));
}

// ── Auth Session ──────────────────────────────────────────────────────────

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(KEYS.session);
    if (!raw) return null;
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function saveSession(session: Session): void {
  localStorage.setItem(KEYS.session, JSON.stringify(session));
}

export function clearSession(): void {
  localStorage.removeItem(KEYS.session);
}

export function loginUser(email: string, password: string): Session | null {
  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return null;
  if (!checkPassword(password, user.passwordHash)) return null;

  const session: Session = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    permissions: user.permissions,
    loginAt: new Date().toISOString(),
  };
  saveSession(session);
  return session;
}

// ── Seed initial data ─────────────────────────────────────────────────────

export function seedIfEmpty(): void {
  if (localStorage.getItem(KEYS.seeded)) return;
  // Only seed the products if none exist yet
  if (!localStorage.getItem(KEYS.products)) {
    saveProducts(DEFAULT_PRODUCTS);
  }
  localStorage.setItem(KEYS.seeded, "1");
}
