import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const sections = [
  {
    value: "repayment",
    title: "Repayment behaviour",
    description:
      "We read repayment timelines, bounce instances, and rolling delinquency to determine discipline. Households with >92% on-time history receive premium weighting in the YVOO composite.",
  },
  {
    value: "consumption",
    title: "Consumption insight",
    description:
      "Utility, recharge, and spend patterns are stitched to validate income stability. Power, water, and telecom signals close the loop on sustainability and affordability.",
  },
  {
    value: "income",
    title: "Income verification",
    description:
      "Digitised income proofs, GST slips, and DBT trails are corroborated to craft transparent household affordability narratives.",
  },
  {
    value: "risk",
    title: "Risk band classification",
    description:
      "YVOO risk bands—Low, Medium, High—are calibrated for concessional lending thresholds, aligned with regulators and impact lenders.",
  },
];

export const ScoringAccordion = () => {
  return (
    <Accordion type="single" collapsible className="w-full space-y-3">
      {sections.map((section) => (
        <AccordionItem
          key={section.value}
          value={section.value}
          className="overflow-hidden rounded-2xl border border-white/10 bg-background/75 shadow-soft-xl"
        >
          <AccordionTrigger className="px-6 py-4 text-left text-base font-medium text-foreground">
            {section.title}
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 text-sm text-muted-foreground">
            {section.description}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ScoringAccordion;
