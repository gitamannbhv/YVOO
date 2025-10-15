import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRightCircle,
  BarChart3,
  BatteryCharging,
  Droplet,
  Zap,
  PieChart,
  Sparkles,
} from "lucide-react";

import { RiskBandLegend } from "@/components/score/RiskBandLegend";
import { ScoringAccordion } from "@/components/score/ScoringAccordion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type CompositeSnapshot = {
  month: string;
  repayment: number;
  incomeIndex: number;
  consumptionIndex: number;
};

type Metric = {
  label: string;
  value: string;
  change: string;
  icon: JSX.Element;
};

// Default data in case API fails
const defaultSnapshotData: CompositeSnapshot[] = [
  { month: "Jan", repayment: 82, incomeIndex: 68, consumptionIndex: 48 },
  { month: "Feb", repayment: 88, incomeIndex: 72, consumptionIndex: 56 },
  { month: "Mar", repayment: 90, incomeIndex: 74, consumptionIndex: 61 },
  { month: "Apr", repayment: 93, incomeIndex: 76, consumptionIndex: 65 },
  { month: "May", repayment: 95, incomeIndex: 79, consumptionIndex: 68 },
  { month: "Jun", repayment: 97, incomeIndex: 82, consumptionIndex: 71 },
];

const defaultMetricCards: Metric[] = [
  {
    label: "Repayment consistency",
    value: "97% on-time",
    change: "+3.2% uplift",
    icon: <BarChart3 className="size-5 text-primary" />,
  },
  {
    label: "Income verification",
    value: "Trusted tier",
    change: "Composite coverage",
    icon: <Sparkles className="size-5 text-primary" />,
  },
  {
    label: "Utility signals",
    value: "Resilient",
    change: "Electricity + telecom",
    icon: <Zap className="size-5 text-primary" />,
  },
];

const viewConfigs = {
  repayment: {
    title: "Repayment history",
    description:
      "Track on-time instalments, partial settlements, and bounce recoveries. Higher consistency creates stronger weight in the YVOO composite.",
  },
  income: {
    title: "Income verification graph",
    description:
      "AI validates documentum, utility income proxies, and account credits. Coverage is plotted monthly to detect disruptions early.",
  },
  consumption: {
    title: "Consumption reliability",
    description:
      "Map electricity, recharge, and water usage to capture affordability seasonality. Stable consumption lifts the inclusion index.",
  },
};

type ViewKey = keyof typeof viewConfigs;

const tabOrder: ViewKey[] = ["repayment", "income", "consumption"];

const ScoreExplanation = () => {
  const [view, setView] = useState<ViewKey>("repayment");
  const [snapshotData, setSnapshotData] = useState(defaultSnapshotData);
  const [metricCards, setMetricCards] = useState(defaultMetricCards);

  const highlightedData = useMemo(() => {
    switch (view) {
      case "repayment":
        return snapshotData.map((item) => item.repayment);
      case "income":
        return snapshotData.map((item) => item.incomeIndex);
      case "consumption":
        return snapshotData.map((item) => item.consumptionIndex);
    }
  }, [view, snapshotData]);

  // You can add API calls here if you want to fetch dynamic data
  // useEffect(() => {
  //   const fetchScoreData = async () => {
  //     try {
  //       const response = await fetch('/api/score/explanation');
  //       if (response.ok) {
  //         const data = await response.json();
  //         setSnapshotData(data.snapshotData || defaultSnapshotData);
  //         setMetricCards(data.metricCards || defaultMetricCards);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching score explanation data:', error);
  //     }
  //   };
  //   fetchScoreData();
  // }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(0,191,166,0.14),transparent_60%),radial-gradient(circle_at_80%_10%,rgba(13,27,42,0.45),transparent_60%)]" />
      <section className="mx-auto max-w-5xl px-6 pb-12 pt-24 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.4em] text-primary">
            <PieChart className="size-4" /> YVOO Score Transparency
          </span>
          <h1 className="text-5xl font-heading font-semibold tracking-tight text-foreground sm:text-6xl">
            Visualise how the YVOO composite score is engineered
          </h1>
          <p className="mx-auto max-w-3xl text-base text-muted-foreground">
            Dive into repayment patterns, income verification depth, and
            consumption reliability to understand eligibility in a single
            glance. Each component powers responsible, concessional lending.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="gradient" size="lg">
              Download methodology brief
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary/40 text-foreground"
            >
              Request compliance deck
            </Button>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="space-y-6"
          >
            <div className="rounded-3xl border border-white/10 bg-background/80 p-8 shadow-soft-xl">
              <p className="text-xs uppercase tracking-[0.4em] text-primary">
                Composite signal snapshot
              </p>
              <h2 className="mt-3 text-3xl font-heading text-foreground">
                Household impact across the YVOO lens
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Monthly telemetry explains how repayments, income proofs, and
                household consumption orchestrate your composite credit score.
              </p>
              <Tabs
                value={view}
                onValueChange={(value) => setView(value as ViewKey)}
                className="mt-6"
              >
                <TabsList className="grid grid-cols-3 rounded-full border border-white/10 bg-background/70 p-1 text-xs uppercase tracking-[0.3em]">
                  {tabOrder.map((tabKey) => (
                    <TabsTrigger
                      key={tabKey}
                      value={tabKey}
                      className={cn(
                        "rounded-full px-4 py-2 text-muted-foreground transition-all duration-300",
                        view === tabKey &&
                          "bg-primary/15 text-foreground shadow-glow-teal",
                      )}
                    >
                      {viewConfigs[tabKey].title}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {tabOrder.map((tabKey) => (
                  <TabsContent
                    key={tabKey}
                    value={tabKey}
                    className="mt-6 border-none p-0"
                  >
                    <p className="text-sm text-muted-foreground/90">
                      {viewConfigs[tabKey].description}
                    </p>
                    <div className="mt-6 space-y-4">
                      <div className="grid grid-cols-6 gap-3">
                        {snapshotData.map((item, index) => (
                          <motion.div
                            key={item.month}
                            className="flex flex-col items-center gap-2"
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{
                              duration: 0.4,
                              ease: "easeOut",
                              delay: index * 0.05,
                            }}
                          >
                            <div className="flex h-36 w-14 items-end justify-center rounded-full bg-gradient-to-t from-primary/10 via-primary/20 to-primary/40">
                              <motion.div
                                className="w-8 rounded-full bg-hero-gradient shadow-glow-teal"
                                style={{ height: `${highlightedData[index]}%` }}
                                initial={{ scaleY: 0.4 }}
                                whileInView={{ scaleY: 1 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{
                                  duration: 0.5,
                                  ease: "easeOut",
                                  delay: index * 0.04,
                                }}
                              />
                            </div>
                            <div className="text-center text-xs text-muted-foreground/70">
                              <p>{item.month}</p>
                              <p>{highlightedData[index]}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {metricCards.map((metric) => (
                <motion.div
                  key={metric.label}
                  className="rounded-3xl border border-white/10 bg-background/80 p-6 shadow-soft-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-muted-foreground/80">
                    {metric.icon}
                    <span>{metric.label}</span>
                  </div>
                  <p className="mt-3 text-lg font-heading text-foreground">
                    {metric.value}
                  </p>
                  <p className="text-xs text-primary/80">{metric.change}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="space-y-6"
          >
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-primary/15 via-background to-accent/10 p-7 text-sm text-muted-foreground shadow-soft-xl">
              <p className="text-xs uppercase tracking-[0.35em] text-primary">
                Score contribution weights
              </p>
              <h3 className="mt-3 text-2xl font-heading text-foreground">
                Key factors powering eligibility
              </h3>
              <div className="mt-4 space-y-4 text-sm text-muted-foreground/90">
                <FactorRow
                  icon={<BarChart3 className="size-4 text-primary" />}
                  label="Repayment behaviour"
                  value="40%"
                />
                <FactorRow
                  icon={<Sparkles className="size-4 text-primary" />}
                  label="Income verification"
                  value="32%"
                />
                <FactorRow
                  icon={<Activity className="size-4 text-primary" />}
                  label="Consumption reliability"
                  value="18%"
                />
                <FactorRow
                  icon={<Droplet className="size-4 text-primary" />}
                  label="Water & sanitation"
                  value="6%"
                />
                <FactorRow
                  icon={<BatteryCharging className="size-4 text-primary" />}
                  label="Energy resilience"
                  value="4%"
                />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-background/85 p-7 shadow-soft-xl">
              <p className="text-xs uppercase tracking-[0.35em] text-primary">
                Eligibility narrative
              </p>
              <h3 className="mt-3 text-2xl font-heading text-foreground">
                Explainable AI narrative
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                YVOO surfaces explainability logs with every score—so NBFCs,
                ministries, and beneficiaries share a unified view of income
                stability, consumption profiles, and repayment diligence.
              </p>
              <div className="mt-5 flex flex-wrap gap-3 text-xs text-muted-foreground/80">
                <Chip label="Behavioural scorecards" />
                <Chip label="Utility-linked verification" />
                <Chip label="Community benchmark" />
                <Chip label="Audit ready" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="rounded-3xl border border-white/10 bg-background/85 p-8 shadow-soft-xl">
              <p className="text-xs uppercase tracking-[0.4em] text-primary">
                Risk band clarity
              </p>
              <h2 className="mt-3 text-3xl font-heading text-foreground">
                Understand your YVOO risk classification
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Risk bands connect score outcomes to concessional lending
                triggers. Each band maps to blended finance guardrails and
                recommended support actions.
              </p>
              <div className="mt-8">
                <RiskBandLegend />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-background/85 p-8 shadow-soft-xl">
              <p className="text-xs uppercase tracking-[0.4em] text-primary">
                Scoring logic deep dive
              </p>
              <h2 className="mt-3 text-3xl font-heading text-foreground">
                Explore weighted logic behind the composite score
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Expand each section to uncover how the YVOO AI interprets your
                financial journey—from repayment to utility streams—to produce
                transparent, regulator-ready narratives.
              </p>
              <div className="mt-6">
                <ScoringAccordion />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-primary/15 via-background to-accent/10 p-8 text-sm text-muted-foreground shadow-soft-xl"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-primary">
              Signals powering transparency
            </p>
            <h3 className="mt-3 text-2xl font-heading text-foreground">
              How AI assembles your score
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Every metric is explainable, audited, and traceable. YVOO
              orchestrates document, repayment, and consumption data to craft
              equitable financial pathways.
            </p>
            <div className="mt-6 space-y-4">
              {snapshotData.map((item, index) => (
                <motion.div
                  key={item.month}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-background/80 px-4 py-3"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.45,
                    ease: "easeOut",
                    delay: index * 0.04,
                  }}
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/70">
                      {item.month}
                    </p>
                    <p className="text-base font-medium text-foreground">
                      Composite index{" "}
                      {Math.round((item.repayment +
                        item.incomeIndex +
                        item.consumptionIndex) /
                        3)}
                    </p>
                  </div>
                  <div className="flex gap-2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground/70">
                    <Chip label={`Repay ${item.repayment}`} />
                    <Chip label={`Income ${item.incomeIndex}`} />
                    <Chip label={`Usage ${item.consumptionIndex}`} />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground/80">
              <ArrowRightCircle className="size-4 text-primary" />
              <span>
                Use these logs to brief credit committees and impact investors.
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

type FactorRowProps = {
  icon: JSX.Element;
  label: string;
  value: string;
};

const FactorRow = ({ icon, label, value }: FactorRowProps) => (
  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-background/80 px-4 py-3">
    <div className="flex items-center gap-3 text-sm text-muted-foreground/85">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary">
        {icon}
      </span>
      <span>{label}</span>
    </div>
    <span className="text-sm font-medium text-foreground">{value}</span>
  </div>
);

type ChipProps = {
  label: string;
};

const Chip = ({ label }: ChipProps) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-background/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground/80">
    {label}
  </span>
);

export default ScoreExplanation;