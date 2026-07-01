import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getProducts, DEFAULT_PRODUCTS, type Product } from "@/lib/adminStore";
import { ShoppingCart, Eye } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { formatPrice } from "@/lib/adminStore";
import { Star } from "lucide-react";

function ProductCard({ p, i }: { p: Product; i: number }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 0.6 }}
      className="group relative overflow-hidden rounded-3xl glass card-tilt"
    >
      {/* In-stock badge */}
      {p.inStock && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-1 text-[10px] font-bold text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          In Stock
        </div>
      )}

      {/* Price overlay */}
      {p.price > 0 && (
        <div className="absolute top-4 left-4 z-10">
          <div className="rounded-full bg-primary/20 border border-primary/30 px-2.5 py-1 text-xs font-bold text-primary">
            {formatPrice(p.price)}
          </div>
        </div>
      )}

      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
        />
        {/* Fixed dark scrim — always dark so text is always readable */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, oklch(0.08 0.01 260 / 0.97) 0%, oklch(0.08 0.01 260 / 0.55) 45%, transparent 75%)" }} />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="text-xs uppercase tracking-[0.2em] text-primary">{p.tag}</div>
        <h3 className="mt-2 text-2xl font-semibold text-white">{p.name}</h3>
        <div className="mt-1 text-sm" style={{ color: "oklch(0.78 0.01 280)" }}>{p.spec}</div>
        {/* Prices */}
        {p.price > 0 && (
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary">{formatPrice(p.price)}</span>
            {p.originalPrice > 0 && (
              <span className="text-xs line-through text-muted-foreground">
                {formatPrice(p.originalPrice)}
              </span>
            )}
          </div>
        )}
        {isHomePage ? (
          <Link
            to="/products"
            className="mt-4 btn-hero text-sm w-full inline-flex justify-center items-center gap-1.5"
            id={`product-view-all-${p.id}`}
          >
            <Eye className="h-4 w-4" /> View Products
          </Link>
        ) : (
          <Link
            to="/product/$id"
            params={{ id: p.id }}
            className="mt-4 btn-hero text-sm w-full inline-flex justify-center items-center gap-1.5"
            id={`product-open-${p.id}`}
          >
            <Eye className="h-4 w-4" /> Buy Now
          </Link>
        )}
      </div>
    </motion.article>
  );
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const location = useLocation();
  const isProductsPage = location.pathname === "/products";

  // Filter states
  const [tempFilterCategory, setTempFilterCategory] = useState<string>("All");
  const [tempFilterBrand, setTempFilterBrand] = useState<string>("All");
  const [tempFilterName, setTempFilterName] = useState<string>("All");
  const [tempFilterFuel, setTempFilterFuel] = useState<string>("All");

  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [filterBrand, setFilterBrand] = useState<string>("All");
  const [filterName, setFilterName] = useState<string>("All");
  const [filterFuel, setFilterFuel] = useState<string>("All");

  const load = () => {
    try {
      setProducts(getProducts());
    } catch {
      setProducts(DEFAULT_PRODUCTS);
    }
  };

  useEffect(() => {
    load();

    // React to products changed by admin panel (same tab or other tabs)
    const onStorage = (e: StorageEvent) => {
      if (e.key === "kambiz_products" || e.key === null) load();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleFilterSubmit = () => {
    setFilterCategory(tempFilterCategory);
    setFilterBrand(tempFilterBrand);
    setFilterName(tempFilterName);
    setFilterFuel(tempFilterFuel);
  };

  // Compute unique dropdown options
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category))).sort()];
  
  const uniqueBrands = new Set<string>();
  const uniqueNames = new Set<string>();
  const uniqueFuels = new Set<string>();
  products.forEach(p => {
    if (p.vehicleBrands) {
      p.vehicleBrands.split(',').forEach(s => {
        const trimmed = s.trim();
        if (trimmed) uniqueBrands.add(trimmed);
      });
    }
    if (p.vehicleNames) {
      p.vehicleNames.split(',').forEach(s => {
        const trimmed = s.trim();
        if (trimmed) uniqueNames.add(trimmed);
      });
    }
    if (p.fuelType) {
      p.fuelType.split(',').forEach(s => {
        const trimmed = s.trim();
        if (trimmed) uniqueFuels.add(trimmed);
      });
    }
  });
  const brands = ["All", ...Array.from(uniqueBrands).sort()];
  const names = ["All", ...Array.from(uniqueNames).sort()];
  const fuels = ["All", ...Array.from(uniqueFuels).sort()];

  // Filter products
  const filteredProducts = products.filter(p => {
    if (filterCategory !== "All" && p.category !== filterCategory) return false;
    
    if (filterBrand !== "All") {
      if (!p.vehicleBrands) return false;
      const bList = p.vehicleBrands.split(',').map(s => s.trim().toLowerCase());
      if (!bList.includes(filterBrand.toLowerCase())) return false;
    }
    
    if (filterName !== "All") {
      if (!p.vehicleNames) return false;
      const nList = p.vehicleNames.split(',').map(s => s.trim().toLowerCase());
      if (!nList.includes(filterName.toLowerCase())) return false;
    }
    
    if (filterFuel !== "All") {
      if (!p.fuelType) return false;
      const fList = p.fuelType.split(',').map(s => s.trim().toLowerCase());
      if (!fList.includes(filterFuel.toLowerCase())) return false;
    }
    
    return true;
  });

  return (
    <section id="products" className="section-pad relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="tag-pill">The Range</span>
            <h2 className="mt-5 text-4xl sm:text-5xl font-bold text-gradient">
              Every tyre. Every vehicle. Every road.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            A curated multi-brand selection — from daily commuters to commercial fleets — paired
            with expert fitment included with every purchase.
          </p>
        </div>

        {/* Filter Bar */}
        {isProductsPage && (
          <div className="mt-10 mb-8 p-5 rounded-3xl glass border border-border/50 shadow-sm flex flex-col md:flex-row gap-4 items-end relative z-20">
            <div className="flex-1 w-full space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-1">Category of Vehicles</label>
              <select 
                className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                value={tempFilterCategory}
                onChange={(e) => setTempFilterCategory(e.target.value)}
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex-1 w-full space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-1">Selected Vehicles Name Brands</label>
              <select 
                className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                value={tempFilterBrand}
                onChange={(e) => setTempFilterBrand(e.target.value)}
              >
                {brands.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div className="flex-1 w-full space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-1">Selected Vehicles Name</label>
              <select 
                className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                value={tempFilterName}
                onChange={(e) => setTempFilterName(e.target.value)}
              >
                {names.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div className="flex-1 w-full space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-1">Fuel Type</label>
              <select 
                className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                value={tempFilterFuel}
                onChange={(e) => setTempFilterFuel(e.target.value)}
              >
                {fuels.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <button 
              onClick={handleFilterSubmit}
              className="w-full md:w-auto h-[46px] px-8 rounded-xl bg-primary text-background font-bold hover:bg-primary/90 transition-colors shadow-glow whitespace-nowrap"
            >
              Submit
            </button>
          </div>
        )}

        {/* Featured Products Section */}
        {filteredProducts.filter((p) => p.featured).length > 0 && (
          <div className="mt-14 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Star className="h-5 w-5 text-primary fill-primary" />
              </div>
              <h3 className="text-2xl font-bold">Featured Highlights</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {filteredProducts
                .filter((p) => p.featured)
                .map((p, i) => (
                  <ProductCard key={p.id} p={p} i={i} />
                ))}
            </div>
          </div>
        )}

        {/* All Products Grid (Products Page Only) */}
        {isProductsPage && (
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {filteredProducts
              .filter((p) => !p.featured)
              .map((p, i) => (
                <ProductCard key={p.id} p={p} i={i} />
              ))}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="mt-14 py-20 text-center rounded-3xl glass border border-border/50">
            <h3 className="text-2xl font-bold mb-2">Not Available</h3>
            <p className="text-muted-foreground">We couldn't find any tyres matching your selected options.</p>
            {(filterCategory !== "All" || filterBrand !== "All" || filterName !== "All" || filterFuel !== "All") && (
              <button 
                onClick={() => {
                  setTempFilterCategory("All");
                  setTempFilterBrand("All");
                  setTempFilterName("All");
                  setTempFilterFuel("All");
                  setFilterCategory("All");
                  setFilterBrand("All");
                  setFilterName("All");
                  setFilterFuel("All");
                }}
                className="mt-6 btn-ghost-glow"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
