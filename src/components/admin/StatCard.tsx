import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  sub?: string;
  color?: "primary" | "emerald" | "blue" | "purple";
  delay?: number;
}

const colorMap = {
  primary: {
    bg: "bg-primary/10",
    icon: "text-primary",
    ring: "ring-primary/20",
    value: "text-primary",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    icon: "text-emerald-400",
    ring: "ring-emerald-500/20",
    value: "text-emerald-400",
  },
  blue: {
    bg: "bg-blue-500/10",
    icon: "text-blue-400",
    ring: "ring-blue-500/20",
    value: "text-blue-400",
  },
  purple: {
    bg: "bg-purple-500/10",
    icon: "text-purple-400",
    ring: "ring-purple-500/20",
    value: "text-purple-400",
  },
};

export default function StatCard({
  label,
  value,
  icon: Icon,
  sub,
  color = "primary",
  delay = 0,
}: StatCardProps) {
  const c = colorMap[color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="glass rounded-2xl p-5 ring-1 ring-border"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {label}
          </div>
          <div className={`mt-2 text-3xl font-bold font-display ${c.value}`}>{value}</div>
          {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
        </div>
        <div className={`rounded-xl p-2.5 ring-1 ${c.bg} ${c.ring}`}>
          <Icon className={`h-5 w-5 ${c.icon}`} />
        </div>
      </div>
    </motion.div>
  );
}
