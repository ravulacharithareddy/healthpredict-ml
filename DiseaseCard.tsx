import { ArrowRight } from 'lucide-react';
import type { DiseaseConfig } from '@/lib/diseases';

interface DiseaseCardProps {
  disease: DiseaseConfig;
  onPredict: (id: string) => void;
  index: number;
}

export function DiseaseCard({ disease, onPredict, index }: DiseaseCardProps) {
  const Icon = disease.icon;
  return (
    <div
      className="group card relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover animate-fade-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div
        className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${disease.gradient} opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-20`}
      />
      <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${disease.gradient} text-white shadow-sm`}>
        <Icon className="h-7 w-7" strokeWidth={2} />
      </div>

      <h3 className="mt-5 font-display text-xl font-700 text-ink-900">{disease.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-500">{disease.description}</p>

      <button
        onClick={() => onPredict(disease.id)}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-600 text-primary-600 transition group-hover:gap-2.5 hover:text-primary-700"
      >
        Predict Now
        <ArrowRight className="h-4 w-4 transition-transform" />
      </button>
    </div>
  );
}
