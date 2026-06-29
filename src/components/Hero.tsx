import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Phone, Shield, Star, Zap } from "lucide-react";
import heroBg from "@/assets/hero-bg-new.png";
import realTyre from "@/assets/tyre-hero-black.png";

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
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-background/70" />
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
        {/* Top hero color glow */}
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        {/* Orange vignette edge */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 60% at 60% 40%, oklch(0.72 0.2 45 / 0.08), transparent 70%)",
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
          <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02]">
            <span className="text-gradient">Engineered</span>
            <br />
            for the <span className="text-gradient-primary">Road Ahead.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
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

        {/* Right – real tyre image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative h-[460px] sm:h-[560px] lg:h-[660px] flex items-center justify-center"
        >
          {/* Outer glow ring */}
          <div
            className="absolute inset-0 -z-10 rounded-full blur-[80px] opacity-35 m-16"
            style={{
              background:
                "radial-gradient(circle, oklch(0.72 0.2 45 / 0.7), oklch(0.55 0.18 30 / 0.4) 50%, transparent 75%)",
            }}
          />

          {/* Floor reflection gradient */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-24 blur-2xl opacity-40 rounded-full"
            style={{
              background: "radial-gradient(ellipse, oklch(0.72 0.2 45 / 0.6), transparent 70%)",
            }}
          />

          {/* Slow spin ring */}
          <div
            className="absolute inset-12 rounded-full border border-primary/10 animate-spin-slow"
            style={{ animationDuration: "25s" }}
          />
          <div
            className="absolute inset-20 rounded-full border border-primary/6 animate-spin-slow"
            style={{ animationDuration: "40s", animationDirection: "reverse" }}
          />

          {/* The real tyre image – blend mode removes the black background */}
          <motion.img
            src={realTyre}
            alt="Kambiz AllGrip Pro Tyre 205/55 R16 with alloy rim"
            className="absolute z-10 h-full w-full object-contain"
            style={{
              mixBlendMode: "screen",
              filter: "brightness(2.8) contrast(1.15) saturate(1.1)",
            }}
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating info badges – z-20 keeps them above tyre layer */}
          {floatingBadges.map(({ id, icon: Icon, title, sub, style, delay, iconColor, iconBg }) => (
            <motion.div
              key={id}
              id={id}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay, duration: 0.5, ease: "backOut" }}
              className="absolute z-20 glass rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-lg"
              style={style}
            >
              <div className={`rounded-lg p-1.5 ${iconBg}`}>
                <Icon className={`h-4 w-4 ${iconColor}`} />
              </div>
              <div>
                <div className="text-xs font-bold leading-tight">{title}</div>
                <div className="text-[10px] text-muted-foreground leading-tight">{sub}</div>
              </div>
            </motion.div>
          ))}

          {/* Tyre spec chip – z-20 ensures always readable */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 glass rounded-full px-5 py-2 flex items-center gap-3 whitespace-nowrap"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wide">
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
