import { SectionPlaceholder } from "@/components/layout/SectionPlaceholder";

const Privacy = () => {
  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-24 lg:px-8">
      <SectionPlaceholder
        title="Privacy Policy Draft"
        description="Custom data governance, AI transparency disclosures, and consent frameworks will be documented here. Ask to generate the full legal copy when ready."
        ctaLabel="Draft privacy policy"
        ctaHref="/privacy"
      />
    </div>
  );
};

export default Privacy;
