import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

interface SectionPlaceholderProps {
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export const SectionPlaceholder = ({
  title,
  description,
  ctaLabel = "Request full build",
  ctaHref = "/about",
}: SectionPlaceholderProps) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-background via-background/40 to-primary/10 p-12 shadow-soft-xl">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-2xl"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-primary">Coming soon</p>
        <h1 className="mt-4 text-4xl font-heading font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="mt-4 text-base text-muted-foreground">{description}</p>
        <div className="mt-8">
          <Button asChild variant="outline" className="group border-primary/30 text-foreground">
            <Link to={ctaHref} className="flex items-center gap-2">
              {ctaLabel}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </motion.div>
      <div className="pointer-events-none absolute -top-10 -right-16 h-64 w-64 rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-gradient-to-br from-accent/30 via-primary/10 to-transparent blur-3xl" />
    </div>
  );
};
