import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Phone, Shield, Star, Zap } from "lucide-react";
import heroBg from "@/assets/hero-bg-new.png";
import realTyre from "@/assets/tyre-hero-black.png";
import { useTheme } from "@/hooks/useTheme";

/* ── Floating badge data ──────────────────────────── */
const floatingBadges = [
  {
    id: "badge-rating",
    icon: Star,
    title: "4.9 Rating",
    sub: "318 Reviews",
    style: { top: "12%", right: "4%" },
    delay: 0.5,
    iconColor: "text-yellow-400",
    iconBg: "bg-yellow-400/15",
  },
  {
    id: "badge-warranty",
    icon: Shield,
    title: "5-Year Warranty",
    sub: "All Products",
    style: { bottom: "28%", right: "2%" },
    delay: 0.75,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-400/15",
  },
  {
    id: "badge-fitment",
    icon: Zap,
    title: "Free Fitment",
    sub: "Every Purchase",
    style: { bottom: "12%", left: "6%" },
    delay: 1.0,
    iconColor: "text-primary",
    iconBg: "bg-primary/15",
  },
];

export default function Hero() {
  const { isDark } = useTheme();
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-28">
      {/* ── Animated Background ──────────────────────────── */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1080}
          className="h-full w-full object-cover animate-hero-zoom"
          style={{ transformOrigin: "center center" }}
        />
        {/* Base overlay — lighter in day mode so background image is more visible */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{ background: isDark ? "oklch(0.10 0.01 260 / 0.45)" : "oklch(0.10 0.01 260 / 0.15)" }}
        />
        {/* Bottom fade to page background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
        {/* Top hero color glow */}
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        {/* Extra dark vignette on right half so tyre always pops via screen blend */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 80% at 75% 50%, oklch(0.08 0.01 260 / 0.6), transparent 70%)",
          }}
        />
      </div>

      {/* ── Floating particles ──────────────────────── */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary/60 animate-float"
            style={{
              top: `${(i * 53) % 100}%`,
              left: `${(i * 37) % 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${6 + (i % 5)}s`,
            }}
          />
        ))}
      </div>

      {/* ── Main grid ─────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-10 items-center">
        {/* Left – copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="tag-pill">
            <Sparkles className="h-3 w-3" /> Kerala's Premium Tyre Destination
          </span>
          <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02]" style={{ textShadow: "0 2px 20px oklch(0 0 0 / 0.3)" }}>
            <span className="text-gradient">Engineered</span>
            <br />
            for the <span className="text-gradient-primary">Road Ahead.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: "var(--color-foreground)", opacity: 0.85 }}>
            World‑class tyres, precision wheel alignment, and trusted automotive care — delivered
            with the craft and obsession of a luxury performance brand.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#services" className="btn-hero" id="hero-explore-btn">
              Explore Services <ArrowRight className="h-4 w-4" />
            </a>
            <a href="tel:+919946479998" className="btn-ghost-glow" id="hero-call-btn">
              <Phone className="h-4 w-4" /> +91 99464 79998
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
            {[
              { k: "20+", v: "Years of Trust" },
              { k: "2", v: "Branches in Wayanad" },
              { k: "10K+", v: "Happy Drivers" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-3xl font-bold text-gradient-primary">{s.k}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right – tyre image, no background panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative h-[460px] sm:h-[560px] lg:h-[660px] flex items-center justify-center"
        >
          {/* Ambient glow behind tyre — replaces dark panel, works in both modes */}
          <div
            className="absolute inset-0 -z-10 rounded-full blur-[100px] opacity-40 m-8"
            style={{
              background:
                "radial-gradient(circle, oklch(0.72 0.2 45 / 0.9), oklch(0.55 0.18 30 / 0.5) 50%, transparent 75%)",
            }}
          />
          {/* Secondary cool glow for depth */}
          <div
            className="absolute inset-16 -z-10 rounded-full blur-[60px] opacity-25"
            style={{
              background:
                "radial-gradient(circle, oklch(0.60 0.22 250 / 0.7), transparent 70%)",
            }}
          />

          {/* Slow spin rings */}
          <div
            className="absolute inset-12 rounded-full border border-primary/20 animate-spin-slow"
            style={{ animationDuration: "25s" }}
          />
          <div
            className="absolute inset-20 rounded-full border border-primary/10 animate-spin-slow"
            style={{ animationDuration: "40s", animationDirection: "reverse" }}
          />

          {/* Tyre image — pure black bg + screen blend = background disappears completely */}
          <motion.img
            src={realTyre}
            alt="Kambiz AllGrip Pro Tyre 205/55 R16 with alloy rim"
            className="relative z-10 w-[90%] max-w-[480px] object-contain"
            style={{
              mixBlendMode: "screen",
              filter: "brightness(2.2) contrast(1.1) saturate(1.2) drop-shadow(0 0 80px oklch(0.72 0.2 45 / 0.5))",
            }}
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating info badges */}
          {floatingBadges.map(({ id, icon: Icon, title, sub, style, delay, iconColor, iconBg }) => (
            <motion.div
              key={id}
              id={id}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay, duration: 0.5, ease: "backOut" }}
              className="absolute z-20 rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-lg"
              style={{
                ...style,
                background: "oklch(0.13 0.01 280 / 0.85)",
                backdropFilter: "blur(16px)",
                border: "1px solid oklch(1 0 0 / 0.12)",
              }}
            >
              <div className={`rounded-lg p-1.5 ${iconBg}`}>
                <Icon className={`h-4 w-4 ${iconColor}`} />
              </div>
              <div>
                <div className="text-xs font-bold leading-tight text-white">{title}</div>
                <div className="text-[10px] leading-tight" style={{ color: "oklch(0.75 0.02 280)" }}>{sub}</div>
              </div>
            </motion.div>
          ))}

          {/* Tyre spec chip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 rounded-full px-5 py-2 flex items-center gap-3 whitespace-nowrap"
            style={{
              background: "oklch(0.13 0.01 280 / 0.88)",
              backdropFilter: "blur(16px)",
              border: "1px solid oklch(1 0 0 / 0.12)",
            }}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wide text-white">
              205 / 55 R16 &nbsp;·&nbsp; Wet Grip A &nbsp;·&nbsp; Free Fitment
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/70">
        <div className="text-[10px] uppercase tracking-[0.3em]">Scroll</div>
        <div className="h-10 w-px bg-gradient-to-b from-primary to-transparent animate-pulse" />
      </div>
    </section>
  );
}
