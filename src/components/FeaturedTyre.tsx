import { motion } from "framer-motion";
import { getProducts, DEFAULT_PRODUCTS, type Product, formatPrice } from "@/lib/adminStore";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ShoppingCart,
  Star,
  Shield,
  Zap,
  Wind,
  CheckCircle2,
  Tag,
  Check,
  ExternalLink,
} from "lucide-react";
import { addToCart } from "@/lib/shopStore";
import { useShop } from "@/lib/useShop";
import { useState } from "react";
import heroBg from "@/assets/hero-bg-new.png";
import tyreHero from "@/assets/tyre-featured-black.png";
import gaugeImg from "@/assets/tyre-pressure-gauge.png";
import inflatorImg from "@/assets/tyre-inflator.png";
import rimImg from "@/assets/alloy-rim.png";
import shineImg from "@/assets/tyre-shine.png";
import valveImg from "@/assets/valve-caps.png";

/* ── Featured tyre spec data ───────────────────────────── */
const tyreSpecs = [
  { label: "Size", value: "205 / 55 R16" },
  { label: "Load Index", value: "91 W" },
  { label: "Season", value: "All-Season" },
  { label: "Wet Grip", value: "A ★★★★★" },
  { label: "Noise", value: "68 dB" },
  { label: "EU Label", value: "A / A / 68dB" },
];

const highlights = [
  { icon: Shield, text: "5-Year Structural Warranty" },
  { icon: Zap, text: "Performance Wet-Braking Tech" },
  { icon: Wind, text: "Low Rolling Resistance" },
  { icon: CheckCircle2, text: "Free Fitment Included" },
];

/* ── Related accessories fallback ───────────────────────── */
const HARDCODED_RELATED = [
  {
    id: "pressure-gauge",
    name: "Digital Tyre Pressure Gauge",
    price: "₹ 799",
    originalPrice: "₹ 1,299",
    rating: 4.8,
    reviews: 142,
    badge: "Bestseller",
    image: gaugeImg,
    desc: "Precision ±1% accuracy. Backlit LCD display. Fits all Schrader valves.",
  },
  {
    id: "inflator",
    name: "Cordless Tyre Inflator Pump",
    price: "₹ 2,499",
    originalPrice: "₹ 3,999",
    rating: 4.7,
    reviews: 89,
    badge: "New Arrival",
    image: inflatorImg,
    desc: "Portable & rechargeable. Auto-shutoff at preset pressure. LED torch.",
  },
  {
    id: "alloy-rim",
    name: "5-Spoke Alloy Wheel Rim",
    price: "₹ 8,500",
    originalPrice: "₹ 11,000",
    rating: 4.9,
    reviews: 213,
    badge: "Top Rated",
    image: rimImg,
    desc: 'Flow-formed 17" alloy. OEM spec fitment. Hyper silver finish.',
  },
  {
    id: "tyre-shine",
    name: "Tyre Shine & Protectant Spray",
    price: "₹ 349",
    originalPrice: "₹ 549",
    rating: 4.6,
    reviews: 77,
    badge: "Value Pick",
    image: shineImg,
    desc: "UV protection formula. Non-greasy long-lasting finish. 500 ml.",
  },
  {
    id: "valve-caps",
    name: "Metal Valve Stem Caps (4-Pack)",
    price: "₹ 149",
    originalPrice: "₹ 249",
    rating: 4.5,
    reviews: 310,
    badge: "Combo Deal",
    image: valveImg,
    desc: "CNC machined aluminium. Anti-dust seal. Universal thread fit.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < Math.floor(rating) ? "fill-primary text-primary" : "text-muted-foreground/40"}`}
        />
      ))}
    </div>
  );
}

const tagColors: Record<string, string> = {
  Bestseller: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "New Arrival": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Top Rated": "bg-primary/20 text-primary border-primary/30",
  "Value Pick": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Combo Deal": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
};

export default function FeaturedTyre() {
  const navigate = useNavigate();
  const { session } = useShop();
  const [added, setAdded] = useState(false);

  const featuredProduct = getProducts().find((p) => p.featured) ||
    getProducts()[0] || { price: 4299, originalPrice: 6599 };

  const accessories = getProducts()
    .filter((p) => p.category === "Accessories")
    .slice(0, 5);
  // Map our Product type to the related item structure for fallback compatibility
  const displayRelated =
    accessories.length > 0
      ? accessories.map((p) => ({
          id: p.id,
          name: p.name,
          price: formatPrice(p.price),
          originalPrice: formatPrice(p.originalPrice),
          rating: p.rating || 5.0,
          reviews: p.reviewsCount || 0,
          badge: p.tag || "Top Rated",
          image: p.image,
          desc: p.description || p.spec,
        }))
      : HARDCODED_RELATED;

  const handleAddToCart = () => {
    if (!session) {
      window.dispatchEvent(new CustomEvent("kambiz_require_login"));
      return;
    }
    if (featuredProduct.id) {
      addToCart(featuredProduct as Product, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const handleBuyNow = () => {
    if (!session) {
      window.dispatchEvent(new CustomEvent("kambiz_require_login"));
      return;
    }
    if (featuredProduct.id) {
      addToCart(featuredProduct as Product, 1);
      navigate({ to: "/checkout" });
    }
  };

  return (
    <section className="py-24 relative z-10" id="featured-section">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-0 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full blur-[120px] opacity-20"
          style={{ background: "oklch(0.72 0.2 45)" }}
        />
        <div
          className="absolute right-0 bottom-1/4 h-80 w-80 translate-x-1/2 rounded-full blur-[100px] opacity-15"
          style={{ background: "oklch(0.60 0.22 250)" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="tag-pill">Featured Product</span>
          <h2 className="mt-5 text-4xl sm:text-5xl font-bold text-gradient">Tyre of the Season</h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Precision-engineered for Kerala's roads — grippy in the monsoon, silent on the highway,
            and built to outlast the rest.
          </p>
        </motion.div>

        {/* ── Main featured tyre card ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass rounded-3xl overflow-hidden mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left – product image */}
            <div className="relative flex items-center justify-center bg-background p-10 lg:p-14 min-h-[420px]">
              {/* Glow behind tyre */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, oklch(0.72 0.2 45 / 0.5), transparent 65%)",
                }}
              />
              {/* The real tyre image – blend mode removes the black background */}
              <motion.img
                src={tyreHero}
                alt="Kambiz Premium Tyre 205/55 R16"
                className="relative z-10 w-full max-w-sm"
                style={{
                  mixBlendMode: "screen",
                  filter: "brightness(2.8) contrast(1.15) saturate(1.1)",
                }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Badge overlay – z-30 keeps above tyre isolation layer */}
              <div className="absolute top-5 left-5 z-30 flex flex-col gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-lg">
                  <Tag className="h-3 w-3" /> 35% OFF
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-400">
                  ✦ In Stock
                </span>
              </div>
            </div>

            {/* Right – spec & CTA */}
            <div className="flex flex-col justify-center p-8 lg:p-12 gap-7">
              {/* Brand + name */}
              <div>
                <div className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">
                  Kambiz Premium Series
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold leading-tight">
                  AllGrip Pro
                  <br />
                  <span className="text-gradient-primary">Monsoon Edition</span>
                </h3>
                <div className="mt-3 flex items-center gap-3">
                  <StarRating rating={4.9} />
                  <span className="text-sm text-muted-foreground">
                    4.9 (318 verified purchases)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(featuredProduct.price)}
                </span>
                {featuredProduct.originalPrice > 0 && (
                  <span className="text-lg line-through text-muted-foreground">
                    {formatPrice(featuredProduct.originalPrice)}
                  </span>
                )}
              </div>

              {/* Spec grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {tyreSpecs.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-border bg-surface/60 px-3 py-2.5"
                  >
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {s.label}
                    </div>
                    <div className="mt-0.5 text-sm font-semibold">{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {highlights.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon className="h-4 w-4 flex-shrink-0 text-primary" />
                    {text}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-3">
                <Link
                  to="/product/$id"
                  params={{ id: featuredProduct.id || "1" }}
                  className="w-full h-14 rounded-2xl bg-surface border border-primary/20 flex items-center justify-center gap-2 text-foreground font-semibold hover:bg-surface-2 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" /> View Full Details
                </Link>
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 h-14 rounded-2xl glass border border-primary/30 text-primary font-bold flex items-center justify-center gap-2 hover:bg-primary/10 transition-colors"
                  >
                    {added ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
                    {added ? "Added" : "Add to Cart"}
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 h-14 rounded-2xl bg-primary text-background font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-glow"
                  >
                    <Zap className="h-5 w-5" /> Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Related Items ── */}
        <div>
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <span className="tag-pill">Complete the Set</span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gradient">Related Items</h2>
            </div>
            <p className="hidden sm:block text-muted-foreground max-w-xs text-sm text-right">
              Everything you need for a complete tyre experience — from fitment tools to maintenance
              essentials.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {displayRelated.map((item, i) => (
              <motion.article
                key={item.id}
                id={`related-${item.id}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.55 }}
                className="group relative glass rounded-2xl overflow-hidden card-tilt flex flex-col"
              >
                {/* Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tagColors[item.badge] || tagColors["Top Rated"]}`}
                  >
                    {item.badge}
                  </span>
                </div>

                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-gradient-to-b from-surface to-card flex items-center justify-center p-5">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(circle, oklch(0.72 0.2 45 / 0.6), transparent 65%)",
                    }}
                  />
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-32 w-auto object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col flex-1 gap-2 p-4">
                  <h3 className="text-sm font-semibold leading-snug line-clamp-2">{item.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="flex items-center gap-1.5 mt-1">
                    <StarRating rating={item.rating} />
                    <span className="text-[10px] text-muted-foreground">({item.reviews})</span>
                  </div>

                  <div className="mt-auto pt-3 flex items-end justify-between gap-2">
                    <div>
                      <div className="text-lg font-bold text-primary">{item.price}</div>
                      <div className="text-[11px] line-through text-muted-foreground">
                        {item.originalPrice}
                      </div>
                    </div>
                    <a
                      href="tel:+919946479998"
                      className="flex items-center justify-center gap-1 rounded-xl bg-primary/15 hover:bg-primary/25 border border-primary/25 hover:border-primary/50 text-primary text-xs font-semibold px-3 py-2 transition-all duration-200 hover:scale-105"
                      id={`related-buy-${item.id}`}
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      Buy
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
