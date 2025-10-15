import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRightCircle,
  BarChart3,
  CloudUpload,
  FileCheck2,
  FileText,
  Layers,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type IncomeFormState = {
  annualIncome: string;
  energyConsumption: string;
  totalLoanAmount: string;
  loanTenure: string;
  annualWaterBill: string;
  householdMembers: string;
  monthlyExpenses: string;
};

const initialFormState: IncomeFormState = {
  annualIncome: "",
  energyConsumption: "",
  totalLoanAmount: "",
  loanTenure: "",
  annualWaterBill: "",
  householdMembers: "",
  monthlyExpenses: "",
};

interface AnalysisResult {
  category: "Low" | "Medium" | "High";
  score: number;
  summary: string;
  insights: string[];
}

const categoryGradients: Record<AnalysisResult["category"], string> = {
  High: "from-emerald-400/30 via-primary/20 to-primary/10",
  Medium: "from-amber-400/30 via-primary/20 to-primary/10",
  Low: "from-rose-500/30 via-primary/20 to-primary/10",
};

const IncomeVerification = () => {
  const [formState, setFormState] = useState<IncomeFormState>(initialFormState);
  const [documents, setDocuments] = useState<File[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const documentNames = useMemo(() => documents.map((file) => file.name), [documents]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    setDocuments(files);
  };

const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setIsLoading(true);
  
  console.log('Form submitted with data:', formState); // ADD THIS
  
  try {
    console.log('Making API request...'); // ADD THIS
    const response = await fetch('/api/income/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formState),
    });
    
    console.log('Response status:', response.status); // ADD THIS
    
    if (!response.ok) {
      throw new Error('Income analysis failed');
    }
    
    const result = await response.json();
    console.log('API response:', result); // ADD THIS
    
    setAnalysis(result);
    
    // Upload documents if any
    if (documents.length > 0) {
      await uploadDocuments(documents);
    }
  } catch (error) {
    console.error('Error analyzing income:', error);
  } finally {
    setIsLoading(false);
  }
};

  const uploadDocuments = async (files: File[]) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    
    try {
      const response = await fetch('/api/income/upload-documents', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Document upload failed');
      }
      
      const result = await response.json();
      console.log('Documents uploaded:', result);
    } catch (error) {
      console.error('Error uploading documents:', error);
    }
  };

  // Safe access to analysis properties
  const category = analysis?.category ?? "Low";
  const score = analysis?.score ?? 0;
  const summary = analysis?.summary ?? "Submit your income details to get an analysis.";
  const insights = analysis?.insights ?? [];

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_20%_20%,rgba(0,191,166,0.18),transparent_60%)]" />
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.4em] text-primary">
            <Layers className="size-4" /> YVOO Income Intelligence
          </span>
          <h1 className="mt-6 text-4xl font-heading font-semibold text-foreground sm:text-5xl">
            Upload documents & unlock income transparency
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            Combine income proofs, utility reliability, and household context to generate an explainable Income Analysis Result for concessional lending journeys.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-8 rounded-3xl border border-white/10 bg-background/80 p-8 shadow-soft-xl"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <div>
              <h2 className="text-lg font-heading text-foreground">Document evidence</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Upload income proof, energy bills, mobile recharge receipts, and other household data points.
              </p>
              <label
                htmlFor="documents"
                className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-primary/40 bg-background/70 p-8 text-center transition-shadow duration-300 hover:shadow-glow-teal"
              >
                <CloudUpload className="size-10 text-primary" />
                <p className="mt-3 text-sm font-medium text-foreground">
                  Drag and drop documents or click to upload
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Accepted formats: PDF, JPG, PNG, DOCX (max 10 files)
                </p>
                <input
                  id="documents"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  multiple
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
              {documentNames.length > 0 && (
                <div className="mt-4 space-y-2 rounded-2xl border border-white/10 bg-background/70 p-4 text-sm text-muted-foreground">
                  {documentNames.map((name) => (
                    <div key={name} className="flex items-center gap-2">
                      <FileText className="size-4 text-primary" />
                      <span className="truncate" title={name}>
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <InputField
                label="Annual household income"
                name="annualIncome"
                value={formState.annualIncome}
                onChange={handleChange}
                placeholder="₹"
                required
              />
              <InputField
                label="Energy consumption (kWh)"
                name="energyConsumption"
                value={formState.energyConsumption}
                onChange={handleChange}
                placeholder="e.g. 3200"
                required
              />
              <InputField
                label="Total loan amount taken"
                name="totalLoanAmount"
                value={formState.totalLoanAmount}
                onChange={handleChange}
                placeholder="₹"
                required
              />
              <InputField
                label="Loan tenure (months)"
                name="loanTenure"
                value={formState.loanTenure}
                onChange={handleChange}
                placeholder="e.g. 36"
                required
              />
              <InputField
                label="Annual water bill"
                name="annualWaterBill"
                value={formState.annualWaterBill}
                onChange={handleChange}
                placeholder="₹"
                required
              />
              <InputField
                label="Total household members"
                name="householdMembers"
                value={formState.householdMembers}
                onChange={handleChange}
                placeholder="e.g. 4"
                required
              />
              <InputField
                label="Monthly expenses"
                name="monthlyExpenses"
                value={formState.monthlyExpenses}
                onChange={handleChange}
                placeholder="₹"
                required
              />
              <div className="flex flex-col justify-end">
                <Button 
                  type="submit" 
                  variant="gradient" 
                  className="h-12"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Generate Income Analysis"
                  )}
                </Button>
              </div>
            </div>
          </motion.form>

          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="space-y-6"
          >
            <div className="rounded-3xl border border-white/10 bg-background/80 p-8 shadow-soft-xl">
              <p className="text-sm uppercase tracking-[0.35em] text-primary">Why it matters</p>
              <h2 className="mt-4 text-2xl font-heading text-foreground">
                Capture the full economic story
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                YVOO fuses income documents with household consumption to classify concessional eligibility with transparency.
              </p>
              <ul className="mt-6 space-y-4 text-sm text-muted-foreground/90">
                <li className="flex items-start gap-3">
                  <FileCheck2 className="mt-1 size-5 text-primary" />
                  <span>AI validates document coverage across income, utilities, and behavioural proxies.</span>
                </li>
                <li className="flex items-start gap-3">
                  <BarChart3 className="mt-1 size-5 text-primary" />
                  <span>
                    Multi-metric scoring maps affordability, debt burden, and sustainability to an inclusion category.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRightCircle className="mt-1 size-5 text-primary" />
                  <span>Insights sync into the Credit Score Prediction journey instantly.</span>
                </li>
              </ul>
            </div>

            {analysis && (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`rounded-3xl border border-white/10 bg-gradient-to-br ${categoryGradients[category]} p-8 text-foreground shadow-glow-teal`}
              >
                <p className="text-sm uppercase tracking-[0.35em] text-primary">
                  Income Analysis Result
                </p>
                <div className="mt-4 flex items-end gap-2">
                  <span className="text-6xl font-heading font-semibold">
                    {category}
                  </span>
                  <span className="text-sm text-muted-foreground/80">
                    composite score {score.toFixed(0)} / 100
                  </span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground/90">{summary}</p>
                <div className="mt-6 grid gap-3 text-sm text-muted-foreground">
                  {insights.map((insight, index) => (
                    <div key={index} className="flex items-center gap-2 rounded-2xl border border-white/20 bg-background/70 px-4 py-3">
                      <FileCheck2 className="size-4 text-primary" />
                      <span>{insight}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.aside>
        </div>
      </section>
    </div>
  );
};

type InputFieldProps = {
  label: string;
  name: keyof IncomeFormState;
  value: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  placeholder?: string;
  required?: boolean;
};

const InputField = ({ label, name, value, onChange, placeholder, required }: InputFieldProps) => {
  return (
    <label className="group flex flex-col gap-2 text-sm font-medium text-muted-foreground">
      <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">{label}</span>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputMode="decimal"
        required={required}
        className="h-12 rounded-2xl border border-white/15 bg-background/80 px-4 text-base text-foreground shadow-soft-xl transition-shadow duration-300 focus:border-primary/50 focus:outline-none focus:shadow-glow-teal"
      />
    </label>
  );
};

export default IncomeVerification;