import { motion } from "framer-motion";
import { Disc, Gauge, Wrench, RefreshCw, Truck, Settings2 } from "lucide-react";

const services = [
  {
    icon: Disc,
    title: "Tyre Sales",
    desc: "Premium multi-brand tyres for cars, SUVs, two-wheelers and commercial vehicles.",
  },
  {
    icon: Gauge,
    title: "Wheel Alignment",
    desc: "Computerised 3D alignment for crisp steering and extended tyre life.",
  },
  {
    icon: Settings2,
    title: "Wheel Balancing",
    desc: "Dynamic balancing eliminates vibrations and uneven wear.",
  },
  {
    icon: Wrench,
    title: "Puncture Repair",
    desc: "Fast, durable tubeless and tube puncture fixes — done right the first time.",
  },
  {
    icon: RefreshCw,
    title: "Tyre Rethreading",
    desc: "Cost-effective rethreading that breathes new life into truck and bus tyres.",
  },
  {
    icon: Truck,
    title: "Truck Tyre Services",
    desc: "Heavy-duty solutions for fleets and commercial operators across Wayanad.",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-pad relative">
      <div
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at center top, oklch(0.72 0.2 45 / 0.08), transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="tag-pill">What We Do</span>
          <h2 className="mt-5 text-4xl sm:text-5xl font-bold text-gradient">
            A complete tyre & automotive workshop.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Every service performed by trained technicians with calibrated equipment — so your
            vehicle leaves better than it arrived.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="group relative overflow-hidden rounded-3xl p-7 glass card-tilt"
            >
              <div className="absolute -top-20 -right-20 h-44 w-44 rounded-full bg-primary/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30">
                  <s.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-6 text-xs uppercase tracking-[0.2em] text-primary/80 group-hover:text-primary transition-colors">
                  Learn more →
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
