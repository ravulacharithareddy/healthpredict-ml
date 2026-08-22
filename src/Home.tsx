import {
  ArrowRight, Activity, Brain, HeartPulse, Droplet, ShieldCheck,
  Cpu, BarChart3, FlaskConical, type LucideIcon,
} from 'lucide-react';
import type { Page } from '@/components/Navbar';
import { diseases } from '@/lib/diseases';
import { Disclaimer } from '@/components/Disclaimer';

interface HomeProps {
  onNavigate: (page: Page) => void;
  onPredict: (id: string) => void;
}

const stats = [
  { value: '4', label: 'Disease models' },
  { value: '40+', label: 'Health parameters' },
  { value: 'ML', label: 'Logistic-regression scoring' },
];

const features: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Cpu, title: 'ML-Powered', text: 'Each prediction uses a weighted logistic-regression-style model with clinically-inspired feature scoring.' },
  { icon: ShieldCheck, title: 'Privacy-first', text: 'All predictions run in your browser. No health data is stored or transmitted anywhere.' },
  { icon: BarChart3, title: 'Risk scoring', text: 'Get a clear positive/negative result with a confidence score and key contributing factors.' },
  { icon: FlaskConical, title: 'Research-ready', text: 'Structured for a Python Flask/FastAPI backend to be connected for real model inference.' },
];

export function Home({ onNavigate, onPredict }: HomeProps) {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-primary-200/30 blur-3xl" />
        <div className="absolute -right-20 top-40 h-80 w-80 rounded-full bg-accent-200/30 blur-3xl" />

        <div className="container-page relative py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs font-600 text-primary-700 ring-1 ring-primary-200 backdrop-blur animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500" />
              </span>
              Machine Learning · Healthcare · Research
            </span>

            <h1 className="mt-6 font-display text-4xl font-800 leading-tight tracking-tight text-ink-900 sm:text-6xl animate-fade-up">
              Health<span className="text-gradient">Predict</span>
            </h1>
            <p className="mt-4 font-display text-lg font-600 text-ink-700 sm:text-2xl animate-fade-up" style={{ animationDelay: '60ms' }}>
              Multiple Disease Prediction Using Machine Learning
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-500 sm:text-lg animate-fade-up" style={{ animationDelay: '120ms' }}>
              An educational platform that uses machine-learning models to estimate the likelihood of
              diabetes, heart disease, Parkinson&rsquo;s, and liver disease from health parameters you
              enter — instantly, privately, and for research purposes.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-up" style={{ animationDelay: '180ms' }}>
              <button onClick={() => onNavigate('predictions')} className="btn-primary px-7 py-3.5 text-base">
                Start Prediction
                <ArrowRight className="h-5 w-5" />
              </button>
              <button onClick={() => onNavigate('about')} className="btn-secondary px-7 py-3.5 text-base">
                Learn More
              </button>
            </div>

            <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4 animate-fade-up" style={{ animationDelay: '240ms' }}>
              {stats.map((s) => (
                <div key={s.label} className="card p-4 text-center">
                  <p className="font-display text-2xl font-800 text-gradient">{s.value}</p>
                  <p className="mt-1 text-xs font-500 text-ink-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Disease quick cards */}
      <section className="container-page py-16">
        <div className="mb-10 text-center">
          <h2 className="font-display text-2xl font-700 text-ink-900 sm:text-3xl">Prediction Modules</h2>
          <p className="mt-2 text-ink-500">Choose a disease to enter health parameters and receive a prediction.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {diseases.map((d, i) => {
            const Icon = d.icon;
            return (
              <button
                key={d.id}
                onClick={() => onPredict(d.id)}
                className="group card relative overflow-hidden p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${d.gradient} opacity-10 blur-2xl transition-opacity group-hover:opacity-25`} />
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${d.gradient} text-white shadow-sm`}>
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <h3 className="mt-4 font-display text-lg font-700 text-ink-900">{d.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500 line-clamp-3">{d.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-600 text-primary-600 transition group-hover:gap-2.5">
                  Predict Now <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="container-page">
          <div className="mb-10 text-center">
            <h2 className="font-display text-2xl font-700 text-ink-900 sm:text-3xl">How It Works</h2>
            <p className="mt-2 text-ink-500">A structured, privacy-first approach to health prediction.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="card p-6 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 ring-1 ring-primary-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-600 text-ink-900">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{f.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 p-10 text-center text-white sm:p-16">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative">
            <Activity className="mx-auto h-10 w-10 text-white/80" />
            <h2 className="mt-4 font-display text-2xl font-700 sm:text-3xl">Ready to run a prediction?</h2>
            <p className="mx-auto mt-3 max-w-xl text-primary-100">
              Select a disease module, enter the health parameters, and get an instant ML-based risk
              assessment.
            </p>
            <button onClick={() => onNavigate('predictions')} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-600 text-primary-700 shadow-lg transition hover:bg-primary-50 active:scale-[0.98]">
              Start Prediction <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="container-page pb-4">
        <div className="mx-auto max-w-3xl">
          <Disclaimer variant="banner" />
        </div>
      </section>
    </div>
  );
}
