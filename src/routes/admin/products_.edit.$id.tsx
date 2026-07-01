import { createFileRoute, useNavigate } from "@tanstack/react-router";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdminAuth } from "@/lib/adminAuth";
import { getProducts, updateProduct, type Product } from "@/lib/adminStore";
import { useState, useRef, useEffect } from "react";
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
  Plus,
} from "lucide-react";

export const Route = createFileRoute("/admin/products_/edit/$id")({
  component: EditProduct,
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

const CAR_BRANDS = ["Maruti Suzuki", "Hyundai", "Tata", "Mahindra", "Kia", "Toyota", "Honda", "MG", "Volkswagen", "Skoda", "Renault", "Nissan"];
const BIKE_BRANDS = ["Hero", "Honda Bike", "TVS", "Bajaj", "Royal Enfield", "Yamaha", "Suzuki Bike", "KTM", "Ather", "Ola"];
const CAR_NAMES = ["Swift", "Baleno", "WagonR", "Alto", "Dzire", "Creta", "Venue", "i20", "Nexon", "Punch", "Harrier", "Scorpio", "Thar", "XUV700", "Seltos", "Sonet", "Innova", "Fortuner", "City", "Amaze", "Slavia", "Kushaq", "Taigun", "Virtus"];
const BIKE_NAMES = ["Splendor", "Activa", "CB Shine", "Jupiter", "Apache", "Pulsar", "Classic 350", "Bullet 350", "MT-15", "R15", "Access", "Burgman", "Duke 390", "Ather 450X", "Ola S1"];
const FUEL_TYPES = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"];

type Partial_Product = Omit<Product, "id" | "createdAt">;

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

function VehicleFilterField({ 
  label, 
  options,
  value,
  onChange,
  hint 
}: { 
  label: string; 
  options: {group: string, items: string[]}[]; 
  value: string; 
  onChange: (v: string) => void;
  hint: string;
}) {
  const selected = value ? value.split(',').map(s => s.trim()).filter(Boolean) : [];
  
  const handleToggle = (item: string) => {
    if (selected.includes(item)) {
      onChange(selected.filter(x => x !== item).join(', '));
    } else {
      onChange([...selected, item].join(', '));
    }
  };

  const handleAdd = (item: string) => {
    if (!selected.includes(item)) {
      onChange([...selected, item].join(', '));
    }
  }

  return (
    <Field label={label} hint={hint}>
      <div className="space-y-3">
        <div className="max-h-52 overflow-y-auto space-y-4 border border-border rounded-xl p-3 bg-surface/20">
          {options.map(opt => (
            <div key={opt.group} className="space-y-1.5">
              <div className="text-[11px] font-bold text-muted-foreground uppercase">{opt.group}</div>
              <div className="grid grid-cols-2 gap-1.5">
                {opt.items.map(item => (
                  <label key={item} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-surface/50 p-1 rounded-md transition-colors">
                    <input 
                      type="checkbox" 
                      checked={selected.includes(item)} 
                      onChange={() => handleToggle(item)}
                      className="rounded border-border text-primary focus:ring-primary h-3.5 w-3.5"
                    />
                    <span className="truncate" title={item}>{item}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input 
            className="admin-input flex-1 h-9 text-sm" 
            placeholder="Add custom..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAdd(e.currentTarget.value.trim());
                e.currentTarget.value = '';
              }
            }}
          />
          <button 
            type="button"
            className="h-9 w-9 flex items-center justify-center rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors shrink-0"
            onClick={(e) => {
              const input = e.currentTarget.previousElementSibling as HTMLInputElement;
              if (input.value.trim()) {
                handleAdd(input.value.trim());
                input.value = "";
              }
            }}
            title="Add another vehicle"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {selected.map(item => (
              <span key={item} className="inline-flex items-center gap-1 bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-md">
                {item}
                <X className="h-3 w-3 cursor-pointer hover:text-destructive" onClick={() => handleToggle(item)} />
              </span>
            ))}
          </div>
        )}
      </div>
    </Field>
  );
}

function EditProduct() {
  const { hasPermission } = useAdminAuth();
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial_Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const product = getProducts().find((p) => p.id === id);
    if (!product) {
      setNotFound(true);
      return;
    }
    const { id: _id, createdAt: _c, ...rest } = product;
    setForm(rest);
  }, [id]);

  if (!hasPermission("products.edit")) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
          <ShieldAlert className="h-8 w-8 text-destructive" />
          <h2 className="text-xl font-bold">Access Denied</h2>
        </div>
      </AdminLayout>
    );
  }

  if (notFound) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
          <h2 className="text-xl font-bold">Product Not Found</h2>
          <button
            onClick={() => navigate({ to: "/admin/products" })}
            className="btn-ghost-glow text-sm"
          >
            ← Back to Products
          </button>
        </div>
      </AdminLayout>
    );
  }

  if (!form) return null;

  const set = (key: keyof Partial_Product, val: any) =>
    setForm((f) => (f ? { ...f, [key]: val } : f));

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
    updateProduct(id, form);
    setSaving(false);
    setSaved(true);
    await new Promise((r) => setTimeout(r, 1200));
    navigate({ to: "/admin/products" });
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => navigate({ to: "/admin/products" })}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border hover:bg-secondary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="font-display text-2xl font-bold">Edit Product</h1>
          <p className="text-sm text-muted-foreground">Changes save to home page immediately.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} id="edit-product-form">
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-5">
            <FormSection title="Basic Information" icon={Package}>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Product Name" id="edit-name">
                  <input
                    id="edit-name"
                    required
                    className="admin-input"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                  />
                </Field>
                <Field label="Tyre Brand Name" id="edit-brand">
                  <input
                    id="edit-brand"
                    required
                    className="admin-input"
                    placeholder="e.g. MRF, Apollo, Bridgestone"
                    value={form.brand || ""}
                    onChange={(e) => set("brand", e.target.value)}
                  />
                </Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Category" id="edit-category">
                  <select
                    id="edit-category"
                    className="admin-input"
                    value={form.category}
                    onChange={(e) => set("category", e.target.value as any)}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Badge / Tag" id="edit-tag">
                  <select
                    id="edit-tag"
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
              <Field label="Short Spec Line" id="edit-spec">
                <input
                  id="edit-spec"
                  required
                  className="admin-input"
                  value={form.spec}
                  onChange={(e) => set("spec", e.target.value)}
                />
              </Field>
              <Field label="Description" id="edit-desc">
                <textarea
                  id="edit-desc"
                  rows={3}
                  className="admin-input resize-none"
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                />
              </Field>
            </FormSection>

            <FormSection title="Technical Specifications" icon={Ruler}>
              <div className="grid sm:grid-cols-3 gap-4">
                <Field label="Tyre Size" id="edit-size">
                  <input
                    id="edit-size"
                    required
                    className="admin-input"
                    value={form.size}
                    onChange={(e) => set("size", e.target.value)}
                  />
                </Field>
                <Field label="Load Index" id="edit-load">
                  <input
                    id="edit-load"
                    className="admin-input"
                    value={form.loadIndex}
                    onChange={(e) => set("loadIndex", e.target.value)}
                  />
                </Field>
                <Field label="Season" id="edit-season">
                  <select
                    id="edit-season"
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
              <div className="grid lg:grid-cols-3 gap-6">
                <VehicleFilterField 
                  label="Selected Vehicles Name Brands" 
                  hint="Check boxes or type to add custom"
                  options={[
                    { group: "Cars", items: CAR_BRANDS },
                    { group: "Bikes", items: BIKE_BRANDS }
                  ]}
                  value={form.vehicleBrands || ""}
                  onChange={(val) => set("vehicleBrands", val)}
                />
                <VehicleFilterField 
                  label="Selected Vehicles Name" 
                  hint="Check boxes or type to add custom"
                  options={[
                    { group: "Cars", items: CAR_NAMES },
                    { group: "Bikes", items: BIKE_NAMES }
                  ]}
                  value={form.vehicleNames || ""}
                  onChange={(val) => set("vehicleNames", val)}
                />
                <VehicleFilterField 
                  label="Fuel Type" 
                  hint="Check boxes or type to add custom"
                  options={[
                    { group: "Fuel Options", items: FUEL_TYPES }
                  ]}
                  value={form.fuelType || ""}
                  onChange={(val) => set("fuelType", val)}
                />
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

          <div className="space-y-5">
            <FormSection title="Product Image" icon={ImagePlus}>
              <div
                className="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 transition-colors cursor-pointer min-h-[200px]"
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
                    <p className="text-sm text-muted-foreground">Click to upload</p>
                  </>
                )}
                <input
                  ref={fileRef}
                  id="edit-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
                />
              </div>
            </FormSection>

            <FormSection title="Visibility" icon={Tag}>
              <label className="flex items-center justify-between gap-3 cursor-pointer">
                <div>
                  <div className="text-sm font-medium">In Stock</div>
                  <div className="text-xs text-muted-foreground">Show as available</div>
                </div>
                <div
                  onClick={() => set("inStock", !form.inStock)}
                  className={`relative h-6 w-11 rounded-full transition-colors cursor-pointer ${form.inStock ? "bg-primary" : "bg-secondary"}`}
                >
                  <div
                    className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${form.inStock ? "translate-x-5" : "translate-x-0"}`}
                  />
                </div>
              </label>
              <label className="flex items-center justify-between gap-3 cursor-pointer pt-2 border-t border-border">
                <div>
                  <div className="text-sm font-medium">Featured</div>
                  <div className="text-xs text-muted-foreground">Highlight on home page</div>
                </div>
                <div
                  onClick={() => set("featured", !form.featured)}
                  className={`relative h-6 w-11 rounded-full transition-colors cursor-pointer ${form.featured ? "bg-primary" : "bg-secondary"}`}
                >
                  <div
                    className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${form.featured ? "translate-x-5" : "translate-x-0"}`}
                  />
                </div>
              </label>
            </FormSection>

            <button
              id="edit-product-submit"
              type="submit"
              disabled={saving || saved}
              className="btn-hero w-full justify-center disabled:opacity-60"
            >
              {saved ? (
                <>
                  <CheckCircle className="h-4 w-4" /> Updated!
                </>
              ) : saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Saving…
                </>
              ) : (
                "Update Product"
              )}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
