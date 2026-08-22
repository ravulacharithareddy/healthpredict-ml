import { useState, useCallback } from 'react';
import { Loader2, Sparkles, ChevronLeft } from 'lucide-react';
import type { DiseaseConfig } from '@/lib/diseases';
import {
  buildInitialValues,
  runPrediction,
  validateField,
  type FormValues,
  type PredictionResult,
} from '@/lib/predict';
import { PredictionResultCard } from './PredictionResult';
import { Disclaimer } from './Disclaimer';

interface PredictionFormProps {
  disease: DiseaseConfig;
  onBack: () => void;
}

export function PredictionForm({ disease, onBack }: PredictionFormProps) {
  const [values, setValues] = useState<FormValues>(() => buildInitialValues(disease));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const Icon = disease.icon;

  const handleChange = useCallback(
    (id: string, value: string | number) => {
      setValues((prev) => ({ ...prev, [id]: value }));
      setErrors((prev) => {
        if (!prev[id]) return prev;
        const next = { ...prev };
        delete next[id];
        return next;
      });
    },
    [],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    for (const f of disease.fields) {
      const err = validateField(f, values[f.id]);
      if (err) newErrors[f.id] = err;
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const res = runPrediction(disease, values);
      setResult(res);
      setLoading(false);
    }, 1400);
  };

  const reset = () => {
    setResult(null);
    setValues(buildInitialValues(disease));
    setErrors({});
  };

  if (result) {
    return (
      <div className="container-page py-10">
        <button onClick={onBack} className="mb-6 inline-flex items-center gap-1.5 text-sm font-500 text-ink-500 transition hover:text-ink-800">
          <ChevronLeft className="h-4 w-4" />
          Back to Predictions
        </button>
        <PredictionResultCard result={result} diseaseName={disease.name} onReset={reset} />
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <button onClick={onBack} className="mb-6 inline-flex items-center gap-1.5 text-sm font-500 text-ink-500 transition hover:text-ink-800">
        <ChevronLeft className="h-4 w-4" />
        Back to Predictions
      </button>

      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-start gap-4">
          <div className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${disease.gradient} text-white shadow-sm`}>
            <Icon className="h-7 w-7" strokeWidth={2} />
          </div>
          <div>
            <h1 className="font-display text-2xl font-700 text-ink-900 sm:text-3xl">{disease.name} Prediction</h1>
            <p className="mt-1 text-sm leading-relaxed text-ink-500">{disease.longDescription}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-5 p-6 sm:p-8" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            {disease.fields.map((field) => (
              <div key={field.id} className={field.type === 'select' ? 'sm:col-span-2' : ''}>
                <label htmlFor={field.id} className="input-label">
                  {field.label}
                  {field.unit && <span className="ml-1 text-ink-400">({field.unit})</span>}
                </label>
                {field.type === 'select' ? (
                  <select
                    id={field.id}
                    value={String(values[field.id])}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className={`input-field ${errors[field.id] ? 'input-error' : ''}`}
                  >
                    {field.options?.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={field.id}
                    type="number"
                    inputMode="decimal"
                    value={values[field.id]}
                    min={field.min}
                    max={field.max}
                    step={field.step ?? 1}
                    placeholder={field.placeholder}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className={`input-field ${errors[field.id] ? 'input-error' : ''}`}
                    aria-invalid={!!errors[field.id]}
                  />
                )}
                {field.helper && !errors[field.id] && (
                  <p className="mt-1 text-xs text-ink-400">{field.helper}</p>
                )}
                {errors[field.id] && (
                  <p className="mt-1 text-xs font-500 text-danger-600">{errors[field.id]}</p>
                )}
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Predict
                </>
              )}
            </button>
          </div>

          <Disclaimer />
        </form>

        {loading && (
          <div className="mt-6 flex items-center justify-center gap-3 rounded-xl bg-primary-50 py-4 text-sm font-500 text-primary-700 ring-1 ring-primary-100">
            <Loader2 className="h-5 w-5 animate-spin" />
            Running prediction model…
          </div>
        )}
      </div>
    </div>
  );
}
