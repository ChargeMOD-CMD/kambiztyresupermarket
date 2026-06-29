import { motion } from "framer-motion";
import { Award, Wrench, ShieldCheck, Users } from "lucide-react";

const milestones = [
  {
    year: "2000s",
    title: "Founded in Wayanad",
    desc: "Started as a trusted neighborhood tyre dealer with a promise of honesty and quality.",
  },
  {
    year: "2012",
    title: "Service Expansion",
    desc: "Introduced precision wheel alignment, balancing and puncture care under one roof.",
  },
  {
    year: "2018",
    title: "Second Branch",
    desc: "Opened our Arinjerummal branch to serve more drivers across Wayanad.",
  },
  {
    year: "Today",
    title: "Kerala's Tyre Supermarket",
    desc: "A multi-brand destination loved by 10,000+ drivers across cars, SUVs and trucks.",
  },
];

const pillars = [
  {
    icon: Award,
    label: "Genuine Brands",
    desc: "Authorised stock from the world's leading tyre makers.",
  },
  {
    icon: Wrench,
    label: "Master Technicians",
    desc: "Trained crews using calibrated, modern equipment.",
  },
  { icon: ShieldCheck, label: "Honest Pricing", desc: "Transparent quotes — no surprises, ever." },
  {
    icon: Users,
    label: "Customer First",
    desc: "Personal advice for every car, route and budget.",
  },
];

export default function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <span className="tag-pill">Our Story</span>
            <h2 className="mt-5 text-4xl sm:text-5xl font-bold text-gradient">
              Two decades of keeping Kerala moving.
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              From a single counter in Panamaram to a multi-branch tyre supermarket, Kambiz has
              grown by doing the simple things relentlessly well: the right tyre, fitted precisely,
              backed by people you can trust.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass rounded-2xl p-5 card-tilt"
                >
                  <p.icon className="h-6 w-6 text-primary" />
                  <div className="mt-3 font-semibold">{p.label}</div>
                  <div className="text-sm text-muted-foreground mt-1">{p.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-12"
                >
                  <span className="absolute left-1.5 top-1.5 h-5 w-5 rounded-full bg-primary shadow-glow animate-pulse-glow" />
                  <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
                    {m.year}
                  </div>
                  <div className="mt-1 text-xl font-semibold">{m.title}</div>
                  <div className="mt-1 text-muted-foreground">{m.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
