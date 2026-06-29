import { Facebook, Instagram, Phone, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";

const footerLinks = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/branches", label: "Branches" },
  { to: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/50 mt-10">
      <svg
        className="absolute inset-x-0 -top-px w-full h-16 text-primary/20"
        preserveAspectRatio="none"
        viewBox="0 0 1440 80"
        fill="currentColor"
      >
        <path d="M0 40 Q360 0 720 40 T1440 40 V80 H0 Z" />
      </svg>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-20 pb-10">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5" id="footer-logo">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow shadow-glow">
                <span className="h-1.5 w-1.5 rounded-full bg-background" />
              </span>
              <div className="leading-tight">
                <div className="font-display text-base font-bold">KAMBIZ</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Tyre Supermarket
                </div>
              </div>
            </Link>
            <p className="mt-5 text-muted-foreground max-w-sm">
              Kerala's premium tyre and automotive destination — engineered service, trusted brands,
              honest prices.
            </p>
            <div className="mt-6 flex gap-3">
              {[Facebook, Instagram].map((Ic, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full glass hover:text-primary transition-colors"
                >
                  <Ic className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-semibold mb-4">Explore</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footerLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    id={`footer-link-${l.label.toLowerCase()}`}
                    className="hover:text-primary transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-semibold mb-4">Reach Us</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-primary mt-0.5" /> +91 99464 79998
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" /> Panamaram, Wayanad
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" /> Arinjerummal, Wayanad
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-border/50 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Kambiz Tyre Supermarket. All rights reserved.</div>
          <div>Crafted with precision in Kerala.</div>
        </div>
      </div>
    </footer>
  );
}
