import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";

const branches = [
  {
    name: "Panamaram Branch",
    address: "Panamaram, Wayanad, Kerala, India",
    phone: "+91 99464 79998",
    hours: "Mon – Sat • 9:00 AM – 8:00 PM",
  },
  {
    name: "Arinjerummal Branch",
    address: "Arinjerummal, Wayanad, Kerala, India",
    phone: "+91 99464 79998",
    hours: "Mon – Sat • 9:00 AM – 8:00 PM",
  },
];

export default function Branches() {
  return (
    <section id="branches" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="tag-pill">Visit Us</span>
          <h2 className="mt-5 text-4xl sm:text-5xl font-bold text-gradient">
            Two branches across Wayanad.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Drop by either location for instant fitment, expert advice, and a coffee while you wait.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-2 gap-6">
          {branches.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative overflow-hidden rounded-3xl glass p-8 card-tilt"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-primary">
                    Branch 0{i + 1}
                  </div>
                  <h3 className="mt-2 text-2xl font-semibold">{b.name}</h3>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 border border-primary/30 shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
              </div>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary shrink-0" /> {b.address}
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary shrink-0" /> {b.phone}
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary shrink-0" /> {b.hours}
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(b.name + " Wayanad")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-hero text-sm"
                >
                  Get Directions
                </a>
                <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="btn-ghost-glow text-sm">
                  Call Branch
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
