import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Compass,
  Globe2,
  Linkedin,
  Lightbulb,
  Mail,
  Target,
  Twitter,
  Users,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const missionHighlights = [
  {
    icon: Target,
    title: "Aim",
    description:
      "Unlock equitable credit access for underserved households by translating alternative data into transparent financial narratives.",
  },
  {
    icon: Compass,
    title: "Guiding Principle",
    description:
      "Blend responsible AI, community empathy, and concessional lending guardrails to champion inclusion-first decisions.",
  },
  {
    icon: Globe2,
    title: "Impact Horizon",
    description:
      "Catalyse 10 million beneficiaries across India by 2030 through ministry partnerships, development finance institutions, and community cooperatives.",
  },
];

const strategicGoals = [
  {
    title: "Composite credit storytelling",
    details:
      "Fuse repayment histories, utility reliability, and socio-economic patterns into explainable, regulator-ready intelligence.",
  },
  {
    title: "Concessional risk orchestration",
    details:
      "Empower lenders with risk band visualisations, scenario simulation, and progressive underwriting tailored to vulnerable cohorts.",
  },
  {
    title: "AI trust and compliance",
    details:
      "Embed audit logs, bias checks, and SDG-aligned metrics so every YVOO decision can be defended to boards and beneficiaries alike.",
  },
];

type TeamMember = {
  name: string;
  role: string;
  focus: string;
  bio: string;
  email: string;
  linkedin: string;
  twitter?: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Kevin Ngangom",
    role: "Backend and data engineer",
    focus: "Designs explainable neural scoring models.",
    bio: "Architects the YVOO composite core, ensuring transparency across repayment, consumption, and behavioural signals.",
    email: "anaya@yvoo.ai",
    linkedin: "https://www.linkedin.com/in/anayakulkarni",
    twitter: "https://twitter.com/anaya_yvoo",
  },
  {
    name: "Hitanshu Choraria",
    role: "Credit Strategy Head",
    focus: "Partners with NBFCs and ministries for adoption.",
    bio: "Former concessional lending specialist who frames policy-aligned scorecards and portfolio governance accelerators.",
    email: "raghav@yvoo.ai",
    linkedin: "https://www.linkedin.com/in/raghavsingh",
  },
  {
    name: "Aman Anubhav Singh",
    role: "Responsible for AI Lead",
    focus: "Mobilises household data collaboratives.",
    bio: "Leads integrations with utility boards, telecom operators, and welfare registries to enrich alternative data layers.",
    email: "meera@yvoo.ai",
    linkedin: "https://www.linkedin.com/in/meeradeshpande",
    twitter: "https://twitter.com/meera_d",
  },
  {
    name: "Mahi Prakash",
    role: "Chief Product Experience",
    focus: "Crafts lender and beneficiary journeys.",
    bio: "Designs multilingual dashboards, parallax interactions, and inclusive UX artefacts for rural credit officers.",
    email: "kabir@yvoo.ai",
    linkedin: "https://www.linkedin.com/in/kabirahmed",
  },
  {
    name: "Megha Rege",
    role: "Impact & Inclusion Analyst",
    focus: "Measures SDG-aligned socioeconomic lift.",
    bio: "Quantifies empowerment, maps inclusion cohorts, and ensures every recommendation uplifts target communities.",
    email: "ishita@yvoo.ai",
    linkedin: "https://www.linkedin.com/in/ishitabose",
    twitter: "https://twitter.com/ishita_impact",
  },
  {
    name: "Ammar Bhilwara",
    role: "co lead - AI",
    focus: "Safeguards data and audit trails.",
    bio: "Implements zero-trust data vaults, regulatory-compliant infrastructure, and RBI-ready audit observability.",
    email: "dev@yvoo.ai",
    linkedin: "https://www.linkedin.com/in/devmalhotra",
  },
];

type ContactFormState = {
  name: string;
  organisation: string;
  email: string;
  message: string;
};

const initialContactState: ContactFormState = {
  name: "",
  organisation: "",
  email: "",
  message: "",
};

const About = () => {
  const [contactState, setContactState] = useState<ContactFormState>(initialContactState);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialsMap = useMemo(
    () =>
      new Map(
        teamMembers.map((member) => [
          member.email,
          member.name
            .split(" ")
            .map((part) => part.charAt(0).toUpperCase())
            .slice(0, 2)
            .join(""),
        ]),
      ),
    [],
  );

  const handleContactChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = target;
    setContactState((prev) => ({ ...prev, [name]: value }));
    if (submitted || error) {
      setSubmitted(false);
      setError(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactState),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit contact form');
      }
      
      const result = await response.json();
      setSubmitted(true);
      setContactState(initialContactState);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(0,191,166,0.16),transparent_60%),radial-gradient(circle_at_80%_10%,rgba(13,27,42,0.45),transparent_65%)]" />
      <section className="mx-auto max-w-5xl px-6 pb-16 pt-24 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.4em] text-primary">
            YVOO Credit Intelligence
          </span>
          <h1 className="text-5xl font-heading font-semibold tracking-tight text-foreground sm:text-6xl">
            YVOO is building empathic AI for financial inclusion
          </h1>
          <p className="mx-auto max-w-3xl text-base text-muted-foreground">
            From concessional lending mandates to grassroots collectives, our team converts household realities into trusted credit intelligence. Every score we ship amplifies dignity, transparency, and opportunity.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="gradient" size="lg">
              <a href="#team">Meet the founders</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary/40 text-foreground">
              <a href="#mission">Explore our mission</a>
            </Button>
          </div>
        </motion.div>
      </section>

      <section id="mission" className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-primary">Purpose aligned with inclusion</p>
            <h2 className="text-4xl font-heading font-semibold text-foreground">
              AI that respects the nuances of concessional lending
            </h2>
            <p className="text-base text-muted-foreground">
              The YVOO platform synchronises document uploads, repayment behaviour, and consumption signals to interpret affordability with empathy. Our mission anchors technology in the lived experiences of beneficiaries.
            </p>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2">
            {missionHighlights.map((highlight) => (
              <motion.div
                key={highlight.title}
                className="rounded-3xl border border-white/10 bg-background/80 p-6 shadow-soft-xl"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <highlight.icon className="size-6" />
                </div>
                <p className="mt-4 text-lg font-heading text-foreground">{highlight.title}</p>
                <p className="mt-3 text-sm text-muted-foreground/85">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-background via-background/70 to-[#0b1826] px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.4em] text-primary">Strategic goals</p>
            <h2 className="mt-4 text-4xl font-heading font-semibold text-foreground">
              Goals that translate our responsible fintech vision into action
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {strategicGoals.map((goal) => (
              <motion.div
                key={goal.title}
                className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-background to-accent/10 p-6 text-foreground shadow-soft-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <p className="text-sm uppercase tracking-[0.35em] text-primary">{goal.title}</p>
                <p className="mt-4 text-sm text-muted-foreground/90">{goal.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="bg-gradient-to-b from-background via-background/70 to-[#0b1826] px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.4em] text-primary">Leadership collective</p>
              <h2 className="mt-4 text-4xl font-heading font-semibold text-foreground">
                A multidisciplinary team crafting inclusive AI finance
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                Six founders from AI, credit strategy, inclusion analytics, and security engineering co-create YVOO. Together we translate field learnings into responsible product decisions.
              </p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-background/70 p-6 shadow-soft-xl">
              <p className="text-sm text-muted-foreground">
                Our team works alongside ministries, NBFCs, and grassroots partners to ensure every data point empowers households and loan officers alike.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {teamMembers.map((member) => (
              <motion.article
                key={member.email}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-background/80 p-8 shadow-soft-xl"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-hero-gradient text-lg font-semibold text-primary-foreground shadow-glow-teal">
                      {initialsMap.get(member.email)}
                    </div>
                    <div>
                      <p className="text-lg font-heading text-foreground">{member.name}</p>
                      <p className="text-sm text-primary/90">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground/90">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-background/80 px-3 py-1">
                      <Lightbulb className="size-3.5 text-primary" />
                      {member.focus}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-background/80 px-3 py-1">
                      <Users className="size-3.5 text-primary" />
                      Concessional lending advocate
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-background/70 text-foreground transition-transform duration-200 hover:-translate-y-1 hover:border-primary/50"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="size-5" />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-background/70 text-foreground transition-transform duration-200 hover:-translate-y-1 hover:border-primary/50"
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <Linkedin className="size-5" />
                    </a>
                    {member.twitter && (
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-background/70 text-foreground transition-transform duration-200 hover:-translate-y-1 hover:border-primary/50"
                        aria-label={`${member.name} on Twitter`}
                      >
                        <Twitter className="size-5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-primary">Partner with us</p>
            <h2 className="mt-4 text-4xl font-heading font-semibold text-foreground">
              Let's co-create inclusive lending pipelines
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Share your challenge and we will align the YVOO composite engine, Power BI observability, and beneficiary analytics to your mission.
            </p>
          </div>
          <motion.form
            onSubmit={handleSubmit}
            className="mt-10 rounded-3xl border border-white/10 bg-background/80 p-8 shadow-soft-xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="grid gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-muted-foreground">
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">Name</span>
                <input
                  type="text"
                  name="name"
                  value={contactState.name}
                  onInput={handleContactChange}
                  required
                  disabled={isLoading}
                  className="h-12 rounded-2xl border border-white/15 bg-background/80 px-4 text-base text-foreground shadow-soft-xl transition-shadow duration-300 focus:border-primary/50 focus:outline-none focus:shadow-glow-teal disabled:opacity-50"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-muted-foreground">
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">Organisation</span>
                <input
                  type="text"
                  name="organisation"
                  value={contactState.organisation}
                  onInput={handleContactChange}
                  required
                  disabled={isLoading}
                  className="h-12 rounded-2xl border border-white/15 bg-background/80 px-4 text-base text-foreground shadow-soft-xl transition-shadow duration-300 focus:border-primary/50 focus:outline-none focus:shadow-glow-teal disabled:opacity-50"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-muted-foreground md:col-span-2">
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">Email</span>
                <input
                  type="email"
                  name="email"
                  value={contactState.email}
                  onInput={handleContactChange}
                  required
                  disabled={isLoading}
                  className="h-12 rounded-2xl border border-white/15 bg-background/80 px-4 text-base text-foreground shadow-soft-xl transition-shadow duration-300 focus:border-primary/50 focus:outline-none focus:shadow-glow-teal disabled:opacity-50"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-muted-foreground md:col-span-2">
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">How can we collaborate?</span>
                <textarea
                  name="message"
                  value={contactState.message}
                  onInput={handleContactChange}
                  required
                  rows={4}
                  disabled={isLoading}
                  className="rounded-2xl border border-white/15 bg-background/80 px-4 py-3 text-base text-foreground shadow-soft-xl transition-shadow duration-300 focus:border-primary/50 focus:outline-none focus:shadow-glow-teal disabled:opacity-50"
                />
              </label>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">
                By submitting, you consent to responsible outreach aligned with YVOO privacy expectations.
              </p>
              <Button 
                type="submit" 
                variant="gradient" 
                className="h-12 px-8"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Share your challenge"
                )}
              </Button>
            </div>
            {submitted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary"
              >
                Thank you for reaching out! Our founders will connect within 48 hours to align on inclusive lending goals.
              </motion.p>
            )}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
              >
                {error}
              </motion.p>
            )}
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default About;