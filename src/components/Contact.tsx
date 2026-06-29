import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] glass-strong p-8 sm:p-12 lg:p-16">
          <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative grid lg:grid-cols-2 gap-12">
            <div>
              <span className="tag-pill">Get in Touch</span>
              <h2 className="mt-5 text-4xl sm:text-5xl font-bold text-gradient">
                Let's get you rolling.
              </h2>
              <p className="mt-4 text-muted-foreground text-lg max-w-md">
                Need a quote, advice, or to book an appointment? Reach us directly — we usually
                respond within minutes during business hours.
              </p>

              <div className="mt-8 space-y-4">
                <a
                  href="tel:+919946479998"
                  className="flex items-center gap-4 glass rounded-2xl p-4 card-tilt"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 border border-primary/30">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Phone
                    </div>
                    <div className="font-semibold">+91 99464 79998</div>
                  </div>
                </a>
                <div className="flex items-center gap-4 glass rounded-2xl p-4">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 border border-primary/30">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Branches
                    </div>
                    <div className="font-semibold">Panamaram & Arinjerummal, Wayanad</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 glass rounded-2xl p-4">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 border border-primary/30">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Email
                    </div>
                    <div className="font-semibold">Reach us by phone for fastest reply</div>
                  </div>
                </div>
              </div>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="glass rounded-2xl p-6 sm:p-8 space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full Name" name="name" placeholder="John Doe" />
                <Field label="Phone" name="phone" placeholder="+91 ..." />
              </div>
              <Field label="Vehicle" name="vehicle" placeholder="e.g. Maruti Swift 2021" />
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="How can we help?"
                  className="mt-2 w-full rounded-xl bg-background/50 border border-border px-4 py-3 outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
              <button type="submit" className="btn-hero w-full">
                {sent ? (
                  "We'll be in touch ✓"
                ) : (
                  <>
                    Send Message <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, placeholder }: { label: string; name: string; placeholder: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</label>
      <input
        name={name}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl bg-background/50 border border-border px-4 py-3 outline-none focus:border-primary transition-colors"
      />
    </div>
  );
}
