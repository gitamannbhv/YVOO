import { motion } from "framer-motion";

const bands = [
  {
    label: "Low risk",
    range: "780 — 900",
    description: "Prime-ready applicants with high repayment discipline and resilient cash flows.",
    gradient: "from-emerald-400/40 via-primary/20 to-primary/10",
  },
  {
    label: "Medium risk",
    range: "680 — 779",
    description: "Stable households with moderate utilisation requiring light support triggers.",
    gradient: "from-amber-400/40 via-primary/20 to-primary/10",
  },
  {
    label: "High risk",
    range: "300 — 679",
    description: "Applicants needing structured interventions before concessional approval.",
    gradient: "from-rose-500/40 via-primary/20 to-primary/10",
  },
];

export const RiskBandLegend = () => {
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      {bands.map((band, index) => (
        <motion.article
          key={band.label}
          className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${band.gradient} p-6 text-foreground shadow-soft-xl`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
        >
          <div className="relative z-10 space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-primary/90">{band.range}</p>
            <h3 className="text-xl font-heading font-semibold">{band.label}</h3>
            <p className="text-sm text-muted-foreground/85">{band.description}</p>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />
        </motion.article>
      ))}
    </div>
  );
};

export default RiskBandLegend;
