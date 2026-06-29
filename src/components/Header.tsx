import { useEffect, useState } from "react";
import { Menu, X, Phone, ShoppingCart, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "@tanstack/react-router";
import { useShop } from "@/lib/useShop";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/branches", label: "Branches" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { cartItemsCount } = useShop();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 transition-all`}>
        <div
          className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 ${scrolled ? "glass-strong" : "glass"}`}
        >
          <Link to="/" className="flex items-center gap-2.5 group" id="header-logo">
            <span className="relative grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow shadow-glow">
              <span className="absolute inset-1 rounded-full border-2 border-background/30" />
              <span className="h-1.5 w-1.5 rounded-full bg-background" />
            </span>
            <div className="leading-tight">
              <div className="font-display text-base font-bold tracking-tight">KAMBIZ</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Tyre Supermarket
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => {
              const active = location.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  id={`nav-${l.label.toLowerCase()}`}
                  className={`px-4 py-2 text-sm transition-colors relative group ${
                    active
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all ${
                      active ? "w-6" : "w-0 group-hover:w-6"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/cart"
              className="relative grid place-items-center h-10 w-10 rounded-full glass hover:bg-white/5 transition-colors"
              id="header-cart-btn"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-background">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <Link
              to="/account"
              className="grid place-items-center h-10 w-10 rounded-full glass hover:bg-white/5 transition-colors"
              id="header-account-btn"
            >
              <User className="h-5 w-5" />
            </Link>
            <a
              href="tel:+919946479998"
              className="hidden sm:inline-flex btn-hero"
              id="header-call-btn"
            >
              <Phone className="h-4 w-4" /> Call Now
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden grid place-items-center h-10 w-10 rounded-full glass"
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden mt-2 glass-strong rounded-2xl p-4 flex flex-col gap-1"
            >
              {links.map((l) => {
                const active = location.pathname === l.to;
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    id={`mobile-nav-${l.label.toLowerCase()}`}
                    className={`px-4 py-3 rounded-xl text-sm transition-colors ${
                      active ? "bg-primary/15 text-primary font-medium" : "hover:bg-white/5"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
              <a href="tel:+919946479998" className="btn-hero mt-2" id="mobile-call-btn">
                <Phone className="h-4 w-4" /> +91 99464 79998
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
