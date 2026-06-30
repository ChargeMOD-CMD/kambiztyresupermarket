import { createFileRoute, Link } from "@tanstack/react-router";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdminAuth } from "@/lib/adminAuth";
import { getProducts } from "@/lib/adminStore";
import { ShieldAlert, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/admin/brands")({
  component: AdminBrands,
});

function AccessDenied() {
  return (
    <AdminLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
          <ShieldAlert className="h-8 w-8 text-destructive" />
        </div>
        <h2 className="text-xl font-bold">Access Denied</h2>
        <p className="text-muted-foreground max-w-sm">
          You don't have permission to view brands. Contact the owner to grant access.
        </p>
      </div>
    </AdminLayout>
  );
}

function AdminBrands() {
  const { hasPermission } = useAdminAuth();
  
  if (!hasPermission("products.view")) return <AccessDenied />;

  const products = getProducts();
  
  // Group products by brand
  const brandsMap = new Map<string, { name: string, image: string, count: number }>();
  
  products.forEach(p => {
    const brand = p.brand;
    if (!brandsMap.has(brand)) {
      brandsMap.set(brand, { name: brand, image: p.image, count: 1 });
    } else {
      const existing = brandsMap.get(brand)!;
      existing.count += 1;
      brandsMap.set(brand, existing);
    }
  });

  const brandsList = Array.from(brandsMap.values()).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold">Brands Gallery</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {brandsList.length} unique brand{brandsList.length !== 1 ? "s" : ""} found in your inventory
        </p>
      </div>

      {brandsList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-center glass rounded-2xl ring-1 ring-border">
          <ImageIcon className="h-10 w-10 text-muted-foreground/40" />
          <div className="text-sm text-muted-foreground">
            No brands found. Add products to populate this gallery.
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {brandsList.map((brand) => (
            <Link
              key={brand.name}
              to="/admin/products"
              search={{ brand: brand.name }}
              className="group relative flex flex-col rounded-3xl border border-border bg-surface/30 overflow-hidden transition-all hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-white/5 relative">
                <img 
                  src={brand.image} 
                  alt={brand.name} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <h3 className="font-bold text-white text-xl drop-shadow-md">{brand.name}</h3>
                    <div className="text-white/80 text-xs font-medium mt-0.5">
                      {brand.count} Product{brand.count !== 1 ? "s" : ""}
                    </div>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/90 text-primary-foreground opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      )}
    </AdminLayout>
  );
}
