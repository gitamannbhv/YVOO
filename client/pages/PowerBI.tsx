import { SectionPlaceholder } from "@/components/layout/SectionPlaceholder";

const PowerBI = () => {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-24 lg:px-8">
      <SectionPlaceholder
        title="Live Power BI Analytics"
        description="Embed the interactive dashboards for risk bands, sanction rates, and demographic insights here. Prompt when you are ready to integrate the live Power BI iframe and analytics styling."
        ctaLabel="Add Power BI dashboard"
        ctaHref="/power-bi"
      />
    </div>
  );
};

export default PowerBI;
