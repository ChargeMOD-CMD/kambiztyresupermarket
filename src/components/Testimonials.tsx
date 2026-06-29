import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Rahul Krishnan",
    role: "SUV Owner, Kalpetta",
    text: "Best tyre shop in Wayanad — honest pricing and the alignment work was perfect. My XUV feels brand new on the highway.",
  },
  {
    name: "Anjali M.",
    role: "Sedan Owner, Mananthavady",
    text: "Kambiz guided me to the right tyre for my budget and even fitted them the same evening. Truly premium service.",
  },
  {
    name: "Suresh K.",
    role: "Fleet Operator",
    text: "We rely on Kambiz for our truck fleet. Their rethreading and quick puncture turnaround keeps us on the road.",
  },
  {
    name: "Fathima R.",
    role: "Hatchback Owner",
    text: "Loved the showroom feel and the way they explained everything. Will not go anywhere else now.",
  },
];

export default function Testimonials() {
  const loop = [...reviews, ...reviews];
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="tag-pill">Loved by Drivers</span>
          <h2 className="mt-5 text-4xl sm:text-5xl font-bold text-gradient">
            What our customers say.
          </h2>
        </div>
      </div>

      <div className="mt-14 relative">
        <div className="absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />
        <div className="flex gap-5 animate-marquee" style={{ width: "max-content" }}>
          {loop.map((r, i) => (
            <motion.div key={i} className="w-[340px] sm:w-[400px] shrink-0 glass rounded-3xl p-7">
              <Quote className="h-7 w-7 text-primary/60" />
              <p className="mt-4 text-foreground/90 leading-relaxed">{r.text}</p>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
