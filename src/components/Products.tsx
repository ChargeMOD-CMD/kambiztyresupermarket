import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getProducts, DEFAULT_PRODUCTS, type Product } from "@/lib/adminStore";
import { ShoppingCart, Eye } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { formatPrice } from "@/lib/adminStore";
import { Star } from "lucide-react";

function ProductCard({ p, i }: { p: Product; i: number }) {
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
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="text-xs uppercase tracking-[0.2em] text-primary">{p.tag}</div>
        <h3 className="mt-2 text-2xl font-semibold">{p.name}</h3>
        <div className="mt-1 text-sm text-muted-foreground">{p.spec}</div>
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
        <Link
          to="/product/$id"
          params={{ id: p.id }}
          className="mt-4 btn-hero text-sm w-full inline-flex justify-center items-center gap-1.5"
          id={`product-open-${p.id}`}
        >
          <Eye className="h-4 w-4" /> Open
        </Link>
      </div>
    </motion.article>
  );
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

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

  return (
    <section id="products" className="section-pad relative">
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

        {/* Featured Products Section */}
        {products.filter((p) => p.featured).length > 0 && (
          <div className="mt-14 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Star className="h-5 w-5 text-primary fill-primary" />
              </div>
              <h3 className="text-2xl font-bold">Featured Highlights</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {products.filter((p) => p.featured).map((p, i) => (
                <ProductCard key={p.id} p={p} i={i} />
              ))}
            </div>
          </div>
        )}

        {/* Regular Products Grid */}
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {products.filter((p) => !p.featured).map((p, i) => (
            <ProductCard key={p.id} p={p} i={i} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="mt-14 text-center text-muted-foreground">No products available yet.</div>
        )}
      </div>
    </section>
  );
}
