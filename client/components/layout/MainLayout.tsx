import { Outlet } from "react-router-dom";

import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export const MainLayout = () => {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary/20 via-background/80 to-transparent" />
      <SiteHeader />
      <main className="relative z-0 flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
};

export default MainLayout;
