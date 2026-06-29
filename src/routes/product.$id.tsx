import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { getProducts, formatPrice } from "@/lib/adminStore";
import { addToCart } from "@/lib/shopStore";
import { useShop } from "@/lib/useShop";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Zap,
  Shield,
  Truck,
  Check,
  Star,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

export const Route = createFileRoute("/product/$id")({
  component: ProductDetailsPage,
});

function ProductDetailsPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { session } = useShop();
  const products = useMemo(() => getProducts(), []);
  const product = products.find((p) => p.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-16 px-4 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Product not found</h1>
        <p className="text-muted-foreground mt-4">The tyre you're looking for doesn't exist.</p>
        <button onClick={() => navigate({ to: "/" })} className="btn-hero mt-8">
          Return to Store
        </button>
      </div>
    );
  }

  const gallery = product.gallery?.length ? product.gallery : [product.image];

  const handleAddToCart = () => {
    if (!session) {
      window.dispatchEvent(new CustomEvent("kambiz_require_login"));
      return;
    }
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!session) {
      window.dispatchEvent(new CustomEvent("kambiz_require_login"));
      return;
    }
    addToCart(product, quantity);
    navigate({ to: "/checkout" });
  };

  return (
    <main className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-muted-foreground mb-8">
          <button onClick={() => navigate({ to: "/" })} className="hover:text-primary">
            Home
          </button>
          <ChevronRight className="h-4 w-4 mx-2 opacity-50" />
          <button className="hover:text-primary">{product.category}</button>
          <ChevronRight className="h-4 w-4 mx-2 opacity-50" />
          <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Gallery Section */}
          <div className="flex flex-col-reverse lg:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto pb-2 lg:pb-0 hide-scrollbar lg:w-24 shrink-0">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative aspect-square w-20 lg:w-full rounded-xl overflow-hidden glass border-2 transition-all ${
                    activeImage === idx
                      ? "border-primary"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image with Zoom effect */}
            <div className="relative aspect-square w-full rounded-3xl glass overflow-hidden flex-1 group">
              <img
                src={gallery[activeImage]}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-crosshair"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.discount > 0 && (
                  <span className="rounded-full bg-red-500/20 border border-red-500/30 px-3 py-1 text-xs font-bold text-red-400 backdrop-blur-md">
                    {product.discount}% OFF
                  </span>
                )}
                <span className="rounded-full bg-background/50 border border-border px-3 py-1 text-xs font-bold text-foreground backdrop-blur-md">
                  {product.brand}
                </span>
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col">
            <h1 className="text-3xl sm:text-4xl font-bold">{product.name}</h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.floor(product.rating || 5)
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
                <span className="ml-1 text-sm font-semibold">{product.rating || "5.0"}</span>
              </div>
              <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                {product.reviewsCount || "120"} Reviews
              </span>
              <span className="text-sm text-emerald-400 font-medium">Verified by Kambiz</span>
            </div>

            <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
              {product.description}
            </p>

            {/* Price block */}
            <div className="mt-8 p-6 rounded-3xl glass-strong border border-border/50">
              <div className="flex items-end gap-4">
                <span className="text-4xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > 0 && (
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground uppercase tracking-wide">
                      M.R.P.
                    </span>
                    <span className="text-xl line-through text-muted-foreground">
                      {formatPrice(product.originalPrice)}
                    </span>
                  </div>
                )}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Inclusive of all taxes. Free fitment at Kambiz branches.
              </p>

              {/* Quantity & Actions */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <div className="flex items-center rounded-2xl glass border border-border/50 h-14 px-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-background/50 text-foreground transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-background/50 text-foreground transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-14 rounded-2xl glass border border-primary/30 text-primary font-bold flex items-center justify-center gap-2 hover:bg-primary/10 transition-colors"
                >
                  {added ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
                  {added ? "Added to Cart" : "Add to Cart"}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 h-14 rounded-2xl bg-primary text-background font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-glow"
                >
                  <Zap className="h-5 w-5" /> Buy Now
                </button>
              </div>
            </div>

            {/* Features list */}
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-2xl glass">
                <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{product.warranty || "Warranty Included"}</p>
                  <p className="text-xs text-muted-foreground">Manufacturer Guarantee</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl glass">
                <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Truck className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Fast Delivery</p>
                  <p className="text-xs text-muted-foreground">Ships within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-6">Technical Specifications</h3>
              <div className="rounded-2xl glass border border-border/50 overflow-hidden">
                <div className="grid grid-cols-2 p-4 border-b border-border/50">
                  <span className="text-muted-foreground text-sm">SKU</span>
                  <span className="font-medium text-sm text-right">{product.sku || "N/A"}</span>
                </div>
                <div className="grid grid-cols-2 p-4 border-b border-border/50 bg-white/5">
                  <span className="text-muted-foreground text-sm">Size</span>
                  <span className="font-medium text-sm text-right">{product.size}</span>
                </div>
                <div className="grid grid-cols-2 p-4 border-b border-border/50">
                  <span className="text-muted-foreground text-sm">Load Index</span>
                  <span className="font-medium text-sm text-right">{product.loadIndex}</span>
                </div>
                {product.technicalSpecs &&
                  Object.entries(product.technicalSpecs).map(([key, val], idx) => (
                    <div
                      key={key}
                      className={`grid grid-cols-2 p-4 border-b border-border/50 ${idx % 2 === 1 ? "" : "bg-white/5"}`}
                    >
                      <span className="text-muted-foreground text-sm">{key}</span>
                      <span className="font-medium text-sm text-right">{val}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Compatibility */}
            {product.vehicleCompatibility && product.vehicleCompatibility.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-6">Vehicle Compatibility</h3>
                <div className="flex flex-wrap gap-2">
                  {product.vehicleCompatibility.map((vehicle) => (
                    <span
                      key={vehicle}
                      className="px-4 py-2 rounded-xl glass border border-border/50 text-sm"
                    >
                      {vehicle}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
