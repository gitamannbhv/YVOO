import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRightCircle,
  Banknote,
  CheckCircle2,
  GaugeCircle,
  PiggyBank,
  ShieldCheck,
  TrendingUp,
  Loader2, // ADDED
} from "lucide-react";

import CircularGauge from "@/components/credit/CircularGauge";
import { Button } from "@/components/ui/button";

type ScoreCategory = "Excellent" | "Good" | "Average" | "Needs Attention";

type CreditFormState = { 
  timelyRepayment: string;
  totalLoanTaken: string;
  totalLoanRepaid: string;
  annualIncome: string;
  totalBankAccounts: string;
  totalBalance: string;
  creditUtilization: string;
  age: string;
  averageMonthlyEMI: string;
};

type PredictionResult = {
  score: number;
  category: ScoreCategory;
  confidence: number;
  recommendation: string;
  focus: string;
  insights: Insight[];
  metrics: {
    repaymentRatio: number;
    timelyRepayment: number;
    debtToIncome: number;
    liquidityMonths: number;
    utilization: number;
  };
};

type Insight = {
  title: string;
  metric: string;
  description: string;
  icon: JSX.Element;
};

const initialFormState: CreditFormState = {
  timelyRepayment: "92",
  totalLoanTaken: "750000",
  totalLoanRepaid: "540000",
  annualIncome: "960000",
  totalBankAccounts: "4",
  totalBalance: "320000",
  creditUtilization: "32",
  age: "34",
  averageMonthlyEMI: "18000",
};

const CreditScore = () => {
  const [formState, setFormState] = useState<CreditFormState>(initialFormState);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Safe access to prediction properties
  const score = prediction?.score ?? 0;
  const category = prediction?.category ?? "Needs Attention";
  const confidence = prediction?.confidence ?? 0;
  const recommendation = prediction?.recommendation ?? "Submit your details to get a credit score analysis.";
  const focus = prediction?.focus ?? "Fill out the form and click 'Run prediction' to see personalized recommendations.";
  const metrics = prediction?.metrics ?? {
    repaymentRatio: 0,
    timelyRepayment: 0,
    debtToIncome: 0,
    liquidityMonths: 0,
    utilization: 0
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/credit/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });
      
      if (!response.ok) {
        throw new Error('Credit calculation failed');
      }
      
      const result = await response.json();
      setPrediction(result);
      setHasSubmitted(true);
    } catch (error) {
      console.error('Error calculating credit score:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const actionableInsights = useMemo(() => 
    prediction ? prediction.insights.slice(0, 3) : [], 
    [prediction]
  );

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(0,191,166,0.16),transparent_65%),radial-gradient(circle_at_80%_10%,rgba(13,27,42,0.45),transparent_60%)]" />
      <section className="mx-auto max-w-5xl px-6 pb-10 pt-24 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.4em] text-primary">
            <GaugeCircle className="size-4" /> YVOO Predictive Intelligence
          </span>
          <h1 className="text-5xl font-heading font-semibold tracking-tight text-foreground sm:text-6xl">
            Predict your YVOO Credit Score in real time
          </h1>
          <p className="mx-auto max-w-3xl text-base text-muted-foreground">
            Input repayment, income, and banking signals to generate an AI-backed YVOO score. Visualise the 300–900 gradient, surface key drivers, and unlock tailored recommendations for concessional lending journeys.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-8 rounded-3xl border border-white/10 bg-background/85 p-8 shadow-soft-xl"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <div>
              <h2 className="text-lg font-heading text-foreground">Smart input form</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Blend loan history, income, and banking footprint to feed the YVOO predictive engine.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <InputField
                label="Timely repayment percentage"
                name="timelyRepayment"
                value={formState.timelyRepayment}
                onChange={setFormState}
                suffix="%"
                min={0}
                max={100}
              />
              <InputField
                label="Total loans taken"
                name="totalLoanTaken"
                value={formState.totalLoanTaken}
                onChange={setFormState}
                prefix="₹"
              />
              <InputField
                label="Total loans repaid"
                name="totalLoanRepaid"
                value={formState.totalLoanRepaid}
                onChange={setFormState}
                prefix="₹"
              />
              <InputField
                label="Annual household income"
                name="annualIncome"
                value={formState.annualIncome}
                onChange={setFormState}
                prefix="₹"
              />
              <InputField
                label="Total bank accounts"
                name="totalBankAccounts"
                value={formState.totalBankAccounts}
                onChange={setFormState}
              />
              <InputField
                label="Total balance across accounts"
                name="totalBalance"
                value={formState.totalBalance}
                onChange={setFormState}
                prefix="₹"
              />
              <InputField
                label="Credit utilisation"
                name="creditUtilization"
                value={formState.creditUtilization}
                onChange={setFormState}
                suffix="%"
                min={0}
                max={100}
              />
              <InputField
                label="Age"
                name="age"
                value={formState.age}
                onChange={setFormState}
              />
              <InputField
                label="Average monthly EMI"
                name="averageMonthlyEMI"
                value={formState.averageMonthlyEMI}
                onChange={setFormState}
                prefix="₹"
                className="md:col-span-2"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground/85">
                <ArrowRightCircle className="size-5 text-primary" />
                <span>Adjust values and generate to refresh your YVOO prediction.</span>
              </div>
              <Button 
                type="submit" 
                variant="gradient" 
                className="h-12 px-8"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    Run prediction
                    <ArrowRightCircle className="ml-2 size-4" />
                  </>
                )}
              </Button>
            </div>
            {hasSubmitted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl border border-primary/25 bg-primary/10 px-4 py-3 text-xs text-primary"
              >
                Prediction refreshed. Insights reflect the latest lender-ready profile.
              </motion.p>
            )}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            <CircularGauge
              score={score}
              category={category}
              confidence={confidence}
            />
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-primary/15 via-background to-accent/10 p-7 text-sm text-muted-foreground shadow-soft-xl">
              <p className="text-xs uppercase tracking-[0.35em] text-primary">Recommendation</p>
              <p className="mt-3 text-base font-medium text-foreground">
                {recommendation}
              </p>
              <p className="mt-3 text-sm text-muted-foreground/90">{focus}</p>
              <div className="mt-5 grid gap-4 text-xs text-muted-foreground/80 sm:grid-cols-3">
                <MetricBadge
                  icon={<TrendingUp className="size-4 text-primary" />}
                  label="Repayment ratio"
                  value={`${(metrics.repaymentRatio * 100).toFixed(0)}% covered`}
                />
                <MetricBadge
                  icon={<Banknote className="size-4 text-primary" />}
                  label="Debt-to-income"
                  value={`${(metrics.debtToIncome * 100).toFixed(1)}%`}
                />
                <MetricBadge
                  icon={<PiggyBank className="size-4 text-primary" />}
                  label="Liquidity runway"
                  value={`${metrics.liquidityMonths >= 12 ? "12+" : metrics.liquidityMonths.toFixed(1)} months`}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rest of your JSX remains the same */}
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-10 lg:px-8">
         <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.4em] text-primary">Insight layer</p>
            <h2 className="mt-3 text-3xl font-heading font-semibold text-foreground">
              Understand what drives your composite YVOO score
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Each insight blends document proof, repayment history, and banking signals so lenders can underwrite with clarity.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground/85">
            <SparklineChip
              icon={<ArrowRightCircle className="size-4 text-primary" />}
              label="AI rationale"
            />
            <SparklineChip icon={<TrendingUp className="size-4 text-primary" />} label="Score uplift" />
            <SparklineChip icon={<ShieldCheck className="size-4 text-primary" />} label="Risk guardrails" />
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {actionableInsights.map((insight) => (
            <motion.article
              key={insight.title}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-background/80 p-7 shadow-soft-xl"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground/90">
                  {insight.icon}
                  <span>{insight.metric}</span>
                </div>
                <h3 className="text-xl font-heading text-foreground">{insight.title}</h3>
                <p className="text-sm text-muted-foreground/85">{insight.description}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-gradient-to-br from-background/90 via-primary/10 to-accent/10 p-8 shadow-soft-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.35em] text-primary">Next best actions</p>
              <h3 className="mt-3 text-2xl font-heading text-foreground">Collaborate with YVOO to progress your score</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Sync your verified documentation, automate repayments, and stream portfolio analytics into the Power BI workspace for real-time monitoring.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="gradient">Integrate lending data</Button>
              <Button variant="outline" className="border-primary/40 text-foreground">
                Book advisory session
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Keep all your existing helper components (InputField, MetricBadge, SparklineChip) exactly as they are


type InputFieldProps = {
  label: string;
  name: keyof CreditFormState;
  value: string;
  onChange: (updater: (prev: CreditFormState) => CreditFormState) => void;
  prefix?: string;
  suffix?: string;
  className?: string;
  min?: number;
  max?: number;
};

const InputField = ({
  label,
  name,
  value,
  onChange,
  prefix,
  suffix,
  className,
  min,
  max,
}: InputFieldProps) => {
  const handleValueChange = (event: FormEvent<HTMLInputElement>) => {
    const nextValue = event.currentTarget.value;
    onChange((prev) => ({ ...prev, [name]: nextValue }));
  };

  return (
    <label className={`group flex flex-col gap-2 text-sm font-medium text-muted-foreground ${className ?? ""}`}>
      <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">{label}</span>
      <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-background/85 px-3 shadow-soft-xl transition-all duration-300 focus-within:border-primary/50 focus-within:shadow-glow-teal">
        {prefix && <span className="text-xs font-semibold text-muted-foreground/70">{prefix}</span>}
        <input
          name={name}
          value={value}
          onInput={handleValueChange}
          inputMode="decimal"
          min={min}
          max={max}
          className="h-12 w-full bg-transparent text-base text-foreground focus:outline-none"
        />
        {suffix && <span className="text-xs font-semibold text-muted-foreground/70">{suffix}</span>}
      </div>
    </label>
  );
};

type MetricBadgeProps = {
  icon: JSX.Element;
  label: string;
  value: string;
};

const MetricBadge = ({ icon, label, value }: MetricBadgeProps) => (
  <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-background/70 px-4 py-3 shadow-soft-xl">
    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground/70">
      {icon}
      <span>{label}</span>
    </div>
    <p className="text-sm font-medium text-foreground">{value}</p>
  </div>
);

type SparklineChipProps = {
  icon: JSX.Element;
  label: string;
};

const SparklineChip = ({ icon, label }: SparklineChipProps) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-background/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground/80">
    {icon}
    {label}
  </span>
);

export default CreditScore;