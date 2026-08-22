import { CheckCircle2, AlertTriangle, ShieldCheck, TrendingUp, RotateCcw } from 'lucide-react';
import type { PredictionResult } from '@/lib/predict';
import { Disclaimer } from './Disclaimer';

interface PredictionResultCardProps {
  result: PredictionResult;
  diseaseName: string;
  onReset: () => void;
}

function RiskBar({ probability }: { probability: number }) {
  const pct = Math.round(probability * 100);
  const color = probability < 0.34 ? 'bg-success-500' : probability < 0.67 ? 'bg-warning-500' : 'bg-danger-500';
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs font-500 text-ink-500">
        <span>Model confidence</span>
        <span className="font-600 text-ink-700">{pct}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-ink-100">
        <div
          className={`h-full rounded-full ${color} transition-all duration-700 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function PredictionResultCard({ result, diseaseName, onReset }: PredictionResultCardProps) {
  const positive = result.positive;
  const Icon = positive ? AlertTriangle : CheckCircle2;
  const accent = positive
    ? 'from-danger-500 to-rose-500'
    : 'from-success-500 to-emerald-500';
  const ring = positive ? 'ring-danger-200 bg-danger-50' : 'ring-success-200 bg-success-50';
  const label = positive ? 'Positive — Risk Detected' : 'Negative — Low Risk';

  return (
    <div className="animate-scale-in space-y-5">
      <div className={`card overflow-hidden p-0 ring-2 ${positive ? 'ring-danger-100' : 'ring-success-100'}`}>
        <div className={`flex items-center gap-4 bg-gradient-to-r ${accent} p-6 text-white`}>
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/20 backdrop-blur">
            <Icon className="h-8 w-8" strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs font-500 uppercase tracking-wider text-white/80">
              {diseaseName} Prediction Result
            </p>
            <h3 className="font-display text-2xl font-700">{label}</h3>
          </div>
        </div>

        <div className="space-y-5 p-6">
          <div className={`flex items-center gap-2 rounded-xl ${ring} px-4 py-3 ring-1`}>
            <ShieldCheck className="h-5 w-5 shrink-0 text-ink-600" />
            <span className="text-sm font-600 text-ink-800">
              Risk Level: <span className="uppercase">{result.riskLevel}</span>
            </span>
          </div>

          <RiskBar probability={result.probability} />

          <p className="text-sm leading-relaxed text-ink-600">{result.message}</p>

          {result.contributingFactors.length > 0 && (
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-sm font-600 text-ink-700">
                <TrendingUp className="h-4 w-4 text-primary-500" />
                Key contributing factors
              </p>
              <ul className="flex flex-wrap gap-2">
                {result.contributingFactors.map((f, i) => (
                  <li
                    key={i}
                    className="rounded-lg bg-ink-100 px-3 py-1.5 text-xs font-500 text-ink-600"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Disclaimer variant="banner" />

          <button onClick={onReset} className="btn-secondary w-full">
            <RotateCcw className="h-4 w-4" />
            Run New Prediction
          </button>
        </div>
      </div>
    </div>
  );
}
