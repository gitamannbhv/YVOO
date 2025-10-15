import { Linkedin, Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Income Verification", href: "/income-verification" },
  { label: "Credit Score", href: "/credit-score" },
  { label: "Power BI Dashboard", href: "/power-bi" },
  { label: "YVOO Score", href: "/yvoo-score" },
  { label: "About", href: "/about" },
];

export const SiteFooter = () => {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-[#0a1724] text-muted-foreground">
      <div className="absolute inset-x-0 -top-16 mx-auto h-32 max-w-4xl rounded-full bg-gradient-to-r from-primary/20 via-accent/20 to-transparent blur-3xl" />
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 lg:flex-row lg:justify-between lg:px-8">
        <div className="max-w-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-hero-gradient text-lg font-semibold text-primary-foreground shadow-glow-teal">
              Y
            </div>
            <div className="leading-tight">
              <p className="text-xs uppercase tracking-[0.4em] text-primary/80">YVOO</p>
              <p className="text-base font-semibold text-foreground">AI Credit Intelligence</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground/80">
            Building transparent, concessional lending intelligence for underserved communities through AI-powered composite credit scoring.
          </p>
        </div>
        <div className="grid flex-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Navigate</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="transition-colors duration-200 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="mailto:hello@yvoo.ai"
                  className="transition-colors duration-200 hover:text-primary"
                >
                  hello@yvoo.ai
                </a>
              </li>
              <li>
                <span>+91 98765 43210</span>
              </li>
              <li>
                <span>Backed by inclusive finance partners</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Follow</h3>
            <div className="mt-4 flex gap-3">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-background/60 transition-transform duration-200 hover:-translate-y-1 hover:border-primary/50"
              >
                <Linkedin className="size-5" />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-background/60 transition-transform duration-200 hover:-translate-y-1 hover:border-primary/50"
              >
                <Twitter className="size-5" />
              </a>
              <a
                href="mailto:hello@yvoo.ai"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-background/60 transition-transform duration-200 hover:-translate-y-1 hover:border-primary/50"
              >
                <Mail className="size-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 bg-[#08111a] py-5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-muted-foreground/80 md:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} YVOO AI. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-primary">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-primary">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
