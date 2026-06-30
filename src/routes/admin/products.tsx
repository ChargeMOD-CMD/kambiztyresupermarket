import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdminAuth } from "@/lib/adminAuth";
import { getProducts, deleteProduct, type Product } from "@/lib/adminStore";
import { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Package,
  ShieldAlert,
  CheckCircle,
  XCircle,
  LayoutGrid,
  List,
} from "lucide-react";
import { motion } from "framer-motion";

interface ProductSearch {
  brand?: string;
}

export const Route = createFileRoute("/admin/products")({
  validateSearch: (search: Record<string, unknown>): ProductSearch => {
    return {
      brand: typeof search.brand === "string" ? search.brand : undefined,
    };
  },
  component: AdminProducts,
});

const CATEGORY_COLORS: Record<string, string> = {
  Car: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  SUV: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Truck: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  Bike: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  Commercial: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
};

function AccessDenied() {
  return (
    <AdminLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
          <ShieldAlert className="h-8 w-8 text-destructive" />
        </div>
        <h2 className="text-xl font-bold">Access Denied</h2>
        <p className="text-muted-foreground max-w-sm">
          You don't have permission to view products. Contact the owner to grant access.
        </p>
      </div>
    </AdminLayout>
  );
}

function AdminProducts() {
  const { hasPermission } = useAdminAuth();
  const searchParams = Route.useSearch();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState(searchParams.brand ?? "");
  const [catFilter, setCatFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  useEffect(() => {
    setSearch(searchParams.brand ?? "");
  }, [searchParams.brand]);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  if (!hasPermission("products.view")) return <AccessDenied />;

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setProducts(getProducts());
    setDeleteId(null);
  };

  const filtered = products.filter((p) => {
    const matchCat = catFilter === "All" || p.category === catFilter;
    const matchSearch =
      search.trim() === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());

    let matchStock = true;
    if (stockFilter === "In Stock") matchStock = p.inStock;
    if (stockFilter === "Out of Stock") matchStock = !p.inStock;
    if (stockFilter === "Featured") matchStock = p.featured;

    return matchCat && matchSearch && matchStock;
  });

  const categories = ["All", "Car", "Bike"];

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {products.length} product{products.length !== 1 ? "s" : ""} total
          </p>
        </div>
        {hasPermission("products.add") && (
          <Link
            to="/admin/products/add"
            id="products-add-btn"
            className="btn-hero text-sm py-2.5 px-5"
          >
            <Plus className="h-4 w-4" /> Add Product
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="mb-5 flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            id="products-search"
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-input pl-9 h-10 w-full"
          />
        </div>
        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
          className="admin-input h-10 w-full sm:w-48 bg-surface/50"
        >
          <option value="All">All Products</option>
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
          <option value="Featured">Featured Only</option>
        </select>
        {/* Category filter */}
        <div className="flex gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCatFilter(cat)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-all ${
                catFilter === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* View Toggle */}
        <div className="flex bg-surface/50 rounded-xl p-1 border border-border shrink-0 ml-auto sm:ml-0">
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            title="List View"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            title="Grid View"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl ring-1 ring-border overflow-hidden"
      >
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
            <Package className="h-10 w-10 text-muted-foreground/40" />
            <div className="text-sm text-muted-foreground">
              {search || catFilter !== "All" ? "No matching products" : "No products yet"}
            </div>
            {hasPermission("products.add") && (
              <Link to="/admin/products/add" className="text-xs text-primary hover:underline mt-1">
                Add your first product →
              </Link>
            )}
          </div>
        ) : viewMode === "list" ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3 text-left font-medium">Product</th>
                  <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">Category</th>
                  <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Size</th>
                  <th className="px-4 py-3 text-left font-medium">Price</th>
                  <th className="px-4 py-3 text-left font-medium hidden lg:table-cell">Stock</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-surface/50 transition-colors">
                    {/* Product */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-surface">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium truncate max-w-[140px] sm:max-w-xs">
                            {product.name}
                          </div>
                          <div className="text-xs text-muted-foreground">{product.brand}</div>
                        </div>
                      </div>
                    </td>
                    {/* Category */}
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${
                          CATEGORY_COLORS[product.category] ??
                          "bg-secondary text-foreground border-border"
                        }`}
                      >
                        {product.category}
                      </span>
                    </td>
                    {/* Size */}
                    <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">
                      {product.size}
                    </td>
                    {/* Price */}
                    <td className="px-4 py-3 font-semibold text-primary">{product.price}</td>
                    {/* Stock */}
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {product.inStock ? (
                        <span className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
                          <CheckCircle className="h-3.5 w-3.5" /> In Stock
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-muted-foreground text-xs">
                          <XCircle className="h-3.5 w-3.5" /> Out of Stock
                        </span>
                      )}
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {hasPermission("products.edit") && (
                          <Link
                            to="/admin/products/edit/$id"
                            params={{ id: product.id }}
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>
                        )}
                        {hasPermission("products.delete") && (
                          <button
                            onClick={() => setDeleteId(product.id)}
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((product) => (
              <div key={product.id} className="group relative flex flex-col rounded-2xl border border-border bg-surface/20 p-3 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                 {/* Product Image & Stock */}
                 <div className="relative aspect-square overflow-hidden rounded-xl bg-surface mb-3">
                   <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                   {product.inStock ? (
                      <span className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400 backdrop-blur-md">
                        <CheckCircle className="h-3 w-3" /> In Stock
                      </span>
                    ) : (
                      <span className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/40 border border-border px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-md">
                        <XCircle className="h-3 w-3" /> Out of Stock
                      </span>
                    )}
                 </div>
                 {/* Category & Price */}
                 <div className="flex items-center justify-between mb-2">
                    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold ${CATEGORY_COLORS[product.category] ?? "bg-secondary text-foreground border-border"}`}>
                      {product.category}
                    </span>
                    <span className="font-bold text-primary">{product.price}</span>
                 </div>
                 {/* Info */}
                 <div className="font-semibold text-sm truncate">{product.name}</div>
                 <div className="text-xs text-muted-foreground truncate">{product.brand} • {product.size}</div>
                 
                 {/* Actions overlay */}
                 <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 rounded-2xl">
                    {hasPermission("products.edit") && (
                      <Link
                        to="/admin/products/edit/$id"
                        params={{ id: product.id }}
                        className="rounded-xl bg-primary text-primary-foreground p-3 hover:scale-105 transition-transform shadow-glow"
                        title="Edit"
                      >
                        <Pencil className="h-5 w-5" />
                      </Link>
                    )}
                    {hasPermission("products.delete") && (
                      <button
                        onClick={() => setDeleteId(product.id)}
                        className="rounded-xl bg-destructive text-destructive-foreground p-3 hover:scale-105 transition-transform shadow-lg"
                        title="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                 </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass rounded-3xl p-7 max-w-sm w-full ring-1 ring-border shadow-2xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 mb-4">
              <Trash2 className="h-6 w-6 text-destructive" />
            </div>
            <h3 className="text-lg font-bold mb-1">Delete Product?</h3>
            <p className="text-sm text-muted-foreground mb-6">
              This action cannot be undone. The product will be removed from the store.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 rounded-xl border border-border bg-secondary py-2 text-sm font-medium hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                id="confirm-delete-btn"
                onClick={() => handleDelete(deleteId)}
                className="flex-1 rounded-xl bg-destructive py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/80 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
}
