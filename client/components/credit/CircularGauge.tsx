import { motion } from "framer-motion";
import { useId, useMemo } from "react";

interface CircularGaugeProps {
  score: number;
  category: "Excellent" | "Good" | "Average" | "Needs Attention";
  confidence: number;
}

const CATEGORY_COLORS: Record<CircularGaugeProps["category"], string> = {
  Excellent: "#00BFA6",
  Good: "#16C7D4",
  Average: "#F4B942",
  "Needs Attention": "#F97070",
};

const CATEGORY_LABELS: Record<CircularGaugeProps["category"], string> = {
  Excellent: "Prime ready",
  Good: "Strong",
  Average: "Developing",
  "Needs Attention": "Stabilise",
};

export const CircularGauge = ({ score, category, confidence }: CircularGaugeProps) => {
  const rawId = useId();
  const gradientId = useMemo(
    () => `${rawId.replace(/[^a-zA-Z0-9-]/g, "")}-gradient`,
    [rawId],
  );
  const normalized = useMemo(() => {
    const ratio = (score - 300) / 600;
    return Math.min(Math.max(ratio, 0), 1);
  }, [score]);

  const radius = 128;
  const strokeWidth = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - normalized);

  const categoryColor = CATEGORY_COLORS[category];
  const label = CATEGORY_LABELS[category];

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-8 rounded-[3rem] border border-white/10 bg-gradient-to-br from-background/80 via-primary/5 to-accent/10 p-10 shadow-soft-xl">
      <div className="relative">
        <svg width={(radius + strokeWidth) * 2} height={(radius + strokeWidth) * 2}>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={categoryColor} stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0D1B2A" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <g transform={`rotate(-90 ${(radius + strokeWidth)} ${(radius + strokeWidth)})`}>
            <circle
              cx={radius + strokeWidth}
              cy={radius + strokeWidth}
              r={radius}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeLinecap="round"
            />
            <motion.circle
              cx={radius + strokeWidth}
              cy={radius + strokeWidth}
              r={radius}
              stroke={`url(#${gradientId})`}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </g>
        </svg>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 rounded-full bg-background/80 px-10 py-8 text-center shadow-glow-teal backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Predicted YVOO Score</p>
            <p className="text-6xl font-heading font-semibold text-foreground">{Math.round(score)}</p>
            <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground/80">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-background/60 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-primary">
                {category}
              </span>
              <span>{label}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6 text-center text-sm text-muted-foreground/90">
        <div className="rounded-2xl border border-white/10 bg-background/70 px-4 py-3 shadow-soft-xl">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground/70">Range</p>
          <p className="mt-1 text-base font-medium text-foreground">300 — 900</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-background/70 px-4 py-3 shadow-soft-xl">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground/70">Confidence</p>
          <p className="mt-1 text-base font-medium text-foreground">{Math.round(confidence)}%</p>
        </div>
      </div>
    </div>
  );
};

export default CircularGauge;
