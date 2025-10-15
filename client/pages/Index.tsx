import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";

// Default stats in case API fails
const defaultHeroStats = [
  {
    label: "Households analysed",
    value: "1.2M+",
    sublabel: "Across rural and semi-urban clusters",
  },
  {
    label: "Loan visibility",
    value: "₹4,800 Cr",
    sublabel: "Composite concessional lending pipeline",
  },
  {
    label: "Inclusion uplift",
    value: "63%",
    sublabel: "Applicants receiving improved credit access",
  },
];

const infographicSteps = [
  {
    title: "Inclusive Data Graph",
    description:
      "Document uploads, utility patterns, and repayment histories are unified into an encrypted household graph.",
  },
  {
    title: "Behavioral Intelligence",
    description:
      "AI senses repayment discipline, income volatility, and seasonal consumption to craft behavioural vectors.",
  },
  {
    title: "Composite Fusion",
    description:
      "Economic, socio-consumption, and credit bureau features converge inside the YVOO neural scoring core.",
  },
  {
    title: "Explainable Scores",
    description:
      "Transparent narratives surface recommendation strength, risk bands, and inclusion confidence in real-time.",
  },
];

const partnerLogos = [
  "NBCFDC",
  "Ministry of Social Justice",
  "SIDBI",
  "State Skilling Missions",
  "Fintech Inclusion Council",
  "Women SHG Federations",
];

type AssuranceHighlight = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const assuranceHighlights: AssuranceHighlight[] = [
  {
    icon: ShieldCheck,
    title: "Audit-grade governance",
    description:
      "Aligned with RBI responsible AI blueprints and best-in-class fintech compliance mandates.",
  },
  {
    icon: Users,
    title: "Community-first intelligence",
    description:
      "Household scorecards adapt to grassroots realities with multilingual narratives and explainability logs.",
  },
  {
    icon: BarChart3,
    title: "Decision-ready analytics",
    description:
      "Portfolio monitors, cohort benchmarking, and concessional triggers stream into live Power BI workspaces.",
  },
];

type CtaItem = {
  title: string;
  bullets: string[];
};

const ctaItems: CtaItem[] = [
  {
    title: "AI-driven Composite Credit Score",
    bullets: [
      "Cross-validates loan usage with energy, water, and mobility trails",
      "Calibrates concessional lending risk bands dynamically",
      "Delivers progressive score journeys for vulnerable segments",
    ],
  },
  {
    title: "Participating Institutions",
    bullets: [
      "Ministry-aligned nodal agencies",
      "Development finance institutions",
      "Impact-driven NBFCs and cooperative banks",
    ],
  },
];

const animationConfig = {
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: "easeOut" } as const,
};

const Index = () => {
  const [heroStats, setHeroStats] = useState(defaultHeroStats);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        if (response.ok) {
          const data = await response.json();
          setHeroStats([
            {
              label: "Households analysed",
              value: data.households_analysed || "1.2M+",
              sublabel: "Across rural and semi-urban clusters",
            },
            {
              label: "Loan visibility", 
              value: data.loan_visibility || "₹4,800 Cr",
              sublabel: "Composite concessional lending pipeline",
            },
            {
              label: "Inclusion uplift",
              value: data.inclusion_uplift || "63%",
              sublabel: "Applicants receiving improved credit access",
            },
          ]);
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        // Keep default stats if API fails
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(0,191,166,0.18),transparent_60%),radial-gradient(circle_at_80%_20%,rgba(13,27,42,0.45),transparent_65%)]" />
      <section className="relative isolate px-6 pb-24 pt-32 lg:px-8">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 h-96 w-96 -translate-y-12 rounded-full bg-accent/20 blur-3xl"
            animate={{ y: [0, -20, 0], opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.4em] text-primary">
              <Sparkles className="size-4" /> Next-gen credit intelligence
            </span>
            <div>
              <h1 className="text-5xl font-heading font-semibold tracking-tight text-foreground sm:text-6xl">
                Empowering Financial Inclusion through AI.
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
                YVOO delivers an AI-driven Composite Credit Score for inclusive lending—merging repayment insights, sustainable consumption trends, and community data to unlock equitable finance access.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg" variant="gradient">
                <Link to="/credit-score" className="flex items-center gap-2">
                  Check Your YVOO Score
                  <ArrowRight className="size-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/40 text-foreground">
                <Link to="/income-verification">Verify Income</Link>
              </Button>
            </div>
            <div className="grid gap-6 pt-6 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-background/60 p-6 shadow-soft-xl"
                  whileHover={{ y: -6 }}
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-3xl font-heading font-semibold text-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground/80">{stat.sublabel}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative">
            <motion.div
              className="relative mx-auto flex h-[360px] w-[360px] items-center justify-center rounded-full bg-[conic-gradient(from_140deg_at_50%_50%,rgba(0,191,166,0.85)_0deg,rgba(0,191,166,0.85)_260deg,rgba(255,255,255,0.08)_260deg,rgba(13,27,42,0.2)_360deg)] shadow-glow-teal"
              animate={{ rotate: [0, 2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex h-[260px] w-[260px] flex-col items-center justify-center rounded-full border border-white/10 bg-background/80 text-center shadow-soft-xl">
                <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                  Predicted YVOO Score
                </p>
                <p className="mt-4 text-6xl font-heading font-semibold text-foreground">812</p>
                <p className="mt-2 text-sm font-medium text-primary">Excellent Band</p>
                <div className="mt-6 grid gap-2 text-xs text-muted-foreground/80">
                  <p className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="size-4 text-primary" />
                    Timely repayments above 94%
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <Activity className="size-4 text-primary" />
                    Sustainable energy utilisation
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="absolute -bottom-6 left-1/2 w-[260px] -translate-x-1/2 rounded-2xl border border-primary/30 bg-background/80 p-6 text-sm shadow-soft-xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-primary">
                Inclusion Signal
              </p>
              <p className="mt-2 font-medium text-foreground">
                Eligibility uplift of 2.4x for concessional skilling loans with projected 1.7% default reduction.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-background via-background/70 to-background px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-primary">How YVOO senses creditworthiness</p>
            <h2 className="mt-4 text-4xl font-heading font-semibold text-foreground">
              AI infographic: from household signals to concessional confidence
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Dynamic feature orchestration merges repayment behaviour, energy reliability, community commerce, and social inclusion factors into a living composite score.
            </p>
          </div>
          <div className="relative mt-16 grid gap-6 md:grid-cols-2">
            {infographicSteps.map((step, index) => (
              <motion.div
                key={step.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-background/80 p-8 shadow-soft-xl"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ ...animationConfig.transition, delay: index * 0.1 }}
                viewport={animationConfig.viewport}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary/90">
                      Step {index + 1}
                    </span>
                    <motion.span
                      className="h-12 w-12 rounded-full border border-primary/50 bg-primary/15 text-lg font-semibold text-primary"
                      initial={{ scale: 0.9 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 * index }}
                      viewport={animationConfig.viewport}
                    >
                      <span className="flex h-full w-full items-center justify-center">
                        {index + 1}
                      </span>
                    </motion.span>
                  </div>
                  <h3 className="mt-4 text-2xl font-heading text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground/85">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center">
          <div className="flex-1">
            <p className="text-xs uppercase tracking-[0.4em] text-primary">Trusted collaborators</p>
            <h2 className="mt-4 text-4xl font-heading font-semibold text-foreground">
              Backed by institutions championing financial justice
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              YVOO orchestrates data-sharing agreements across ministries, development finance partners, and on-ground collectives to unlock fair credit for households historically excluded from formal finance.
            </p>
          </div>
          <div className="grid flex-1 gap-4 sm:grid-cols-2">
            {partnerLogos.map((partner) => (
              <motion.div
                key={partner}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-background via-background/70 to-primary/10 p-6 text-center shadow-soft-xl"
                whileHover={{ scale: 1.03 }}
              >
                <p className="text-sm font-semibold text-foreground">{partner}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-background via-background/70 to-[#0a1724] px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-primary">Built for equitable lending</p>
            <h2 className="text-4xl font-heading font-semibold text-foreground">
              Explainable intelligence crafted with concessional lenders
            </h2>
            <p className="text-base text-muted-foreground">
              Every score breakdown is mapped to the Sustainable Development Goals, ensuring AI recommendations can be justified to committees, skilling partners, and beneficiaries alike.
            </p>
            <div className="space-y-5">
              {assuranceHighlights.map((highlight) => (
                <div
                  key={highlight.title}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-background/80 p-5 shadow-soft-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <highlight.icon className="size-6" />
                  </div>
                  <div>
                    <p className="text-lg font-heading text-foreground">
                      {highlight.title}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground/85">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-6">
            {ctaItems.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-background to-accent/10 p-8 text-foreground shadow-soft-xl"
              >
                <p className="text-sm uppercase tracking-[0.35em] text-primary">
                  {item.title}
                </p>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground/90">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-1 inline-flex h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="rounded-3xl border border-white/10 bg-background/80 p-8 shadow-soft-xl">
              <p className="text-sm uppercase tracking-[0.35em] text-primary">
                Ready to collaborate
              </p>
              <p className="mt-4 text-base text-muted-foreground">
                Partner with YVOO to launch pilots, co-create underwriting playbooks, or integrate the composite score into your digital lending journeys.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="gradient">
                  <Link to="/credit-score">Experience predictive AI</Link>
                </Button>
                <Button asChild variant="outline" className="border-primary/40 text-foreground">
                  <Link to="/about">Meet the team</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;