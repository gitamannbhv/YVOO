import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Income Verification", href: "/income-verification" },
  { label: "Credit Score", href: "/credit-score" },
  { label: "Power BI Dashboard", href: "/power-bi" },
  { label: "YVOO Score", href: "/yvoo-score" },
  { label: "About", href: "/about" },
];

export const SiteHeader = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-hero-gradient text-lg font-semibold text-primary-foreground shadow-glow-teal">
            Y
          </span>
          <div className="leading-tight">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              YVOO
            </p>
            <p className="text-base font-semibold text-foreground">
              AI Credit Intelligence
            </p>
          </div>
        </NavLink>
        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-background/70 px-2 py-1 text-sm font-medium text-muted-foreground shadow-soft-xl md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 transition-all duration-300",
                  isActive
                    ? "bg-primary/15 text-foreground shadow-glow-teal"
                    : "hover:text-foreground",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="outline" className="border-primary/40 text-foreground">
            <NavLink to="/income-verification">Verify Income</NavLink>
          </Button>
          <Button asChild variant="gradient">
            <NavLink to="/credit-score">Check Your YVOO Score</NavLink>
          </Button>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-white/10 bg-background/70 p-2 text-foreground shadow-soft-xl md:hidden"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {isMobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {isMobileOpen && (
        <div className="border-t border-white/10 bg-background/95 px-6 pb-6 pt-2 shadow-soft-xl md:hidden">
          <nav className="flex flex-col gap-2 text-base">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  cn(
                    "rounded-2xl px-4 py-3 transition-all duration-300",
                    isActive
                      ? "bg-primary/15 text-foreground shadow-glow-teal"
                      : "hover:bg-accent/20",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <Button asChild variant="outline" className="border-primary/30 text-foreground">
              <NavLink to="/income-verification">Verify Income</NavLink>
            </Button>
            <Button asChild variant="gradient">
              <NavLink to="/credit-score">Check Your YVOO Score</NavLink>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
