import { diseases } from '@/lib/diseases';
import { DiseaseCard } from '@/components/DiseaseCard';
import { Disclaimer } from '@/components/Disclaimer';

interface PredictionsProps {
  onPredict: (id: string) => void;
}

export function Predictions({ onPredict }: PredictionsProps) {
  return (
    <div className="container-page py-12 sm:py-16">
      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-xs font-600 text-primary-700 ring-1 ring-primary-100">
          Prediction Modules
        </span>
        <h1 className="mt-4 font-display text-3xl font-800 text-ink-900 sm:text-4xl">
          Choose a Disease to Predict
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-ink-500">
          Each module uses a dedicated machine-learning model. Enter the relevant health parameters
          to receive an instant risk assessment.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {diseases.map((d, i) => (
          <DiseaseCard key={d.id} disease={d} onPredict={onPredict} index={i} />
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <Disclaimer variant="banner" />
      </div>
    </div>
  );
}
