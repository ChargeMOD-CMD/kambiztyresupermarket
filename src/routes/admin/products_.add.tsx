import { createFileRoute, useNavigate } from "@tanstack/react-router";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdminAuth } from "@/lib/adminAuth";
import { addProduct, type Product } from "@/lib/adminStore";
import { useState, useRef } from "react";
import {
  ArrowLeft,
  Upload,
  X,
  CheckCircle,
  Loader2,
  ShieldAlert,
  ImagePlus,
  Tag,
  Package,
  Ruler,
  BadgeDollarSign,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/admin/products_/add")({
  component: AddProduct,
});

const CATEGORIES = ["Car", "Bike"] as const;
const SEASONS = ["All-Season", "Summer", "Winter", "All-Terrain"];
const TAGS = [
  "Everyday Performance",
  "Adventure Ready",
  "Built to Endure",
  "Monsoon Special",
  "Highway King",
  "Eco Drive",
  "Sport Max",
  "Budget Pick",
];

type Partial_Product = Omit<Product, "id" | "createdAt">;

const EMPTY: Partial_Product = {
  name: "",
  brand: "",
  category: "Car",
  size: "",
  loadIndex: "",
  season: "All-Season",
  price: 0,
  originalPrice: 0,
  discount: 0,
  tag: TAGS[0],
  spec: "",
  description: "",
  image: "",
  gallery: [],
  inStock: true,
  stockCount: 10,
  sku: "",
  modelNumber: "",
  warranty: "1 Year Warranty",
  vehicleCompatibility: [],
  vehicleBrands: "",
  vehicleNames: "",
  technicalSpecs: {},
  rating: 5.0,
  reviewsCount: 0,
  featured: false,
};

function FormSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: any;
  children: React.ReactNode;
}) {
  return (
    <div className="glass rounded-2xl ring-1 ring-border p-5 space-y-4">
      <div className="flex items-center gap-2 pb-1 border-b border-border">
        <Icon className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  children,
  id,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  id?: string;
  hint?: string;
}) {
  return (
    <div className="space-y-1">
      <label
        className="block text-xs font-medium text-muted-foreground uppercase tracking-wider"
        htmlFor={id}
      >
        {label}
      </label>
      {children}
      {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

function AddProduct() {
  const { hasPermission } = useAdminAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial_Product>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!hasPermission("products.add")) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
            <ShieldAlert className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="text-xl font-bold">Access Denied</h2>
          <p className="text-muted-foreground max-w-sm">
            You don't have permission to add products.
          </p>
        </div>
      </AdminLayout>
    );
  }

  const set = (key: keyof Partial_Product, val: any) => setForm((f) => ({ ...f, [key]: val }));

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => set("image", ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    addProduct(form);
    setSaving(false);
    setSaved(true);
    await new Promise((r) => setTimeout(r, 1200));
    navigate({ to: "/admin/products" });
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => navigate({ to: "/admin/products" })}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border hover:bg-secondary transition-colors"
          aria-label="Back"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="font-display text-2xl font-bold">Add Product</h1>
          <p className="text-sm text-muted-foreground">
            New product will appear on the home page immediately after saving.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} id="add-product-form">
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Left col – main fields */}
          <div className="lg:col-span-2 space-y-5">
            {/* Basic info */}
            <FormSection title="Basic Information" icon={Package}>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Product Name" id="prod-name">
                  <input
                    id="prod-name"
                    required
                    className="admin-input"
                    placeholder="e.g. Bridgestone Turanza"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                  />
                </Field>
                <Field label="Tyre Brand Name" id="prod-brand">
                  <input
                    id="prod-brand"
                    required
                    className="admin-input"
                    placeholder="e.g. MRF, Apollo, Bridgestone"
                    value={form.brand}
                    onChange={(e) => set("brand", e.target.value)}
                  />
                </Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Category" id="prod-category">
                  <select
                    id="prod-category"
                    className="admin-input"
                    value={form.category}
                    onChange={(e) => set("category", e.target.value as any)}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Badge / Tag" id="prod-tag">
                  <select
                    id="prod-tag"
                    className="admin-input"
                    value={form.tag}
                    onChange={(e) => set("tag", e.target.value)}
                  >
                    {TAGS.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field
                label="Short Spec Line"
                id="prod-spec"
                hint='Shown on the product card. e.g. "13\" – 19\" • Tubeless"'
              >
                <input
                  id="prod-spec"
                  required
                  className="admin-input"
                  placeholder="e.g. 205/55 R16 • Tubeless"
                  value={form.spec}
                  onChange={(e) => set("spec", e.target.value)}
                />
              </Field>
              <Field label="Description" id="prod-desc">
                <textarea
                  id="prod-desc"
                  rows={3}
                  className="admin-input resize-none"
                  placeholder="Full product description…"
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                />
              </Field>
            </FormSection>

            {/* Technical specs */}
            <FormSection title="Technical Specifications" icon={Ruler}>
              <div className="grid sm:grid-cols-3 gap-4">
                <Field label="Tyre Size" id="prod-size">
                  <input
                    id="prod-size"
                    required
                    className="admin-input"
                    placeholder="205/55 R16"
                    value={form.size}
                    onChange={(e) => set("size", e.target.value)}
                  />
                </Field>
                <Field label="Load Index" id="prod-load">
                  <input
                    id="prod-load"
                    className="admin-input"
                    placeholder="91 W"
                    value={form.loadIndex}
                    onChange={(e) => set("loadIndex", e.target.value)}
                  />
                </Field>
                <Field label="Season" id="prod-season">
                  <select
                    id="prod-season"
                    className="admin-input"
                    value={form.season}
                    onChange={(e) => set("season", e.target.value)}
                  >
                    {SEASONS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </FormSection>

            {/* Vehicle Fitment */}
            <FormSection title="Vehicle Fitment Filters" icon={Package}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Field label="Selected Vehicles Name Brands" id="prod-vbrands" hint="Comma separated (e.g. Toyota, Honda)">
                  <input
                    id="prod-vbrands"
                    className="admin-input"
                    placeholder="Toyota, Honda"
                    value={form.vehicleBrands}
                    onChange={(e) => set("vehicleBrands", e.target.value)}
                  />
                </Field>
                <Field label="Selected Vehicles Name" id="prod-vnames" hint="Comma separated (e.g. Fortuner, City)">
                  <input
                    id="prod-vnames"
                    className="admin-input"
                    placeholder="Fortuner, City"
                    value={form.vehicleNames}
                    onChange={(e) => set("vehicleNames", e.target.value)}
                  />
                </Field>
                <Field label="Fuel Type" id="prod-fuel" hint="Comma separated (e.g. Petrol, Diesel, Electric)">
                  <input
                    id="prod-fuel"
                    className="admin-input"
                    placeholder="Petrol, Diesel, Electric"
                    value={form.fuelType || ""}
                    onChange={(e) => set("fuelType", e.target.value)}
                  />
                </Field>
              </div>
            </FormSection>

            {/* Pricing */}
            <FormSection title="Pricing & Inventory" icon={BadgeDollarSign}>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Sale Price (₹)" id="prod-price">
                  <input
                    id="prod-price"
                    type="number"
                    required
                    className="admin-input"
                    placeholder="4299"
                    value={form.price || ""}
                    onChange={(e) => set("price", Number(e.target.value))}
                  />
                </Field>
                <Field label="Original Price (MRP) (₹)" id="prod-orig-price">
                  <input
                    id="prod-orig-price"
                    type="number"
                    className="admin-input"
                    placeholder="6599"
                    value={form.originalPrice || ""}
                    onChange={(e) => set("originalPrice", Number(e.target.value))}
                  />
                </Field>
                <Field label="Stock Count" id="prod-stock">
                  <input
                    id="prod-stock"
                    type="number"
                    required
                    className="admin-input"
                    placeholder="10"
                    value={form.stockCount || ""}
                    onChange={(e) => set("stockCount", Number(e.target.value))}
                  />
                </Field>
                <Field label="SKU" id="prod-sku">
                  <input
                    id="prod-sku"
                    type="text"
                    className="admin-input"
                    placeholder="KMBZ-CAR-001"
                    value={form.sku || ""}
                    onChange={(e) => set("sku", e.target.value)}
                  />
                </Field>
              </div>
            </FormSection>
          </div>

          {/* Right col – image + toggles */}
          <div className="space-y-5">
            {/* Image upload */}
            <FormSection title="Product Image" icon={ImagePlus}>
              <div
                className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors cursor-pointer min-h-[200px] ${
                  form.image
                    ? "border-primary/40 bg-primary/5"
                    : "border-border hover:border-primary/30"
                }`}
                onClick={() => fileRef.current?.click()}
              >
                {form.image ? (
                  <>
                    <img
                      src={form.image}
                      alt="Preview"
                      className="max-h-40 w-full object-contain rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        set("image", "");
                      }}
                      className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive/80 text-white hover:bg-destructive"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                    <p className="mt-2 text-xs text-muted-foreground">Click to change</p>
                  </>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-muted-foreground/50 mb-2" />
                    <p className="text-sm font-medium text-muted-foreground">
                      Click to upload image
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-1">
                      PNG, JPG, WebP up to 5MB
                    </p>
                  </>
                )}
                <input
                  ref={fileRef}
                  id="prod-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
                />
              </div>
            </FormSection>

            {/* Toggles */}
            <FormSection title="Visibility" icon={Tag}>
              <label
                className="flex items-center justify-between gap-3 cursor-pointer"
                htmlFor="prod-instock"
              >
                <div>
                  <div className="text-sm font-medium">In Stock</div>
                  <div className="text-xs text-muted-foreground">Show as available</div>
                </div>
                <div
                  id="prod-instock"
                  role="switch"
                  aria-checked={form.inStock}
                  onClick={() => set("inStock", !form.inStock)}
                  className={`relative h-6 w-11 rounded-full transition-colors cursor-pointer ${
                    form.inStock ? "bg-primary" : "bg-secondary"
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                      form.inStock ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </div>
              </label>

              <label
                className="flex items-center justify-between gap-3 cursor-pointer pt-2 border-t border-border"
                htmlFor="prod-featured"
              >
                <div>
                  <div className="text-sm font-medium">Featured</div>
                  <div className="text-xs text-muted-foreground">Highlight on home page</div>
                </div>
                <div
                  id="prod-featured"
                  role="switch"
                  aria-checked={form.featured}
                  onClick={() => set("featured", !form.featured)}
                  className={`relative h-6 w-11 rounded-full transition-colors cursor-pointer ${
                    form.featured ? "bg-primary" : "bg-secondary"
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                      form.featured ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </div>
              </label>
            </FormSection>

            {/* Submit */}
            <button
              id="add-product-submit"
              type="submit"
              disabled={saving || saved || !form.image}
              className="btn-hero w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saved ? (
                <>
                  <CheckCircle className="h-4 w-4" /> Saved!
                </>
              ) : saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Saving…
                </>
              ) : (
                "Save Product"
              )}
            </button>
            {!form.image && (
              <p className="text-xs text-center text-muted-foreground">
                Upload a product image to enable saving
              </p>
            )}
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
