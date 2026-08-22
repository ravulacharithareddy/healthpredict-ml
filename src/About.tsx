import {
  Cpu, Brain, Workflow, Database, Code2, ShieldCheck,
  BarChart3, Target, type LucideIcon,
} from 'lucide-react';

const steps: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Target, title: '1. Input health parameters', text: 'The user enters clinically-relevant measurements for the selected disease into a structured form.' },
  { icon: Workflow, title: '2. Feature scoring', text: 'Each input is weighted and normalized. The model computes a combined score using a logistic-regression-style approach.' },
  { icon: BarChart3, title: '3. Probability & risk', text: 'A sigmoid function converts the score into a probability. The result is classified as low, moderate, or high risk.' },
  { icon: ShieldCheck, title: '4. Result & disclaimer', text: 'The user sees a clear positive/negative result, contributing factors, and a reminder that this is not a medical diagnosis.' },
];

const tech = ['React 18', 'Vite', 'TypeScript', 'Tailwind CSS', 'Lucide Icons', 'Python (Flask/FastAPI ready)'];

export function About() {
  return (
    <div className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-xs font-600 text-primary-700 ring-1 ring-primary-100">
          About the Project
        </span>
        <h1 className="mt-4 font-display text-3xl font-800 text-ink-900 sm:text-4xl">
          About HealthPredict
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-600">
          HealthPredict is an educational and research-focused platform that uses machine learning to
          estimate the likelihood of multiple diseases — diabetes, heart disease, Parkinson&rsquo;s
          disease, and liver disease — from health parameters entered by the user.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="card p-7">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 ring-1 ring-primary-100">
            <Cpu className="h-5 w-5" />
          </div>
          <h2 className="mt-4 font-display text-xl font-700 text-ink-900">Machine Learning Approach</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-500">
            Each disease has a dedicated model based on a logistic-regression-style scoring approach.
            Input features are weighted according to their clinical significance, normalized, and
            combined into a single score. A sigmoid activation converts this score into a probability,
            which is then classified into risk levels. The architecture is designed so a real
            Python-trained model (scikit-learn, TensorFlow, etc.) served via Flask or FastAPI can be
            connected with minimal changes.
          </p>
        </div>

        <div className="card p-7">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-600 ring-1 ring-accent-100">
            <Target className="h-5 w-5" />
          </div>
          <h2 className="mt-4 font-display text-xl font-700 text-ink-900">Purpose</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-500">
            The goal is to demonstrate how machine learning can be applied to healthcare screening in
            an accessible, transparent way. It serves as a learning tool for students, researchers,
            and developers interested in the intersection of AI and health — and as a starting point
            for more robust clinical decision-support systems.
          </p>
        </div>
      </div>

      {/* How it works */}
      <div className="mt-16">
        <h2 className="text-center font-display text-2xl font-700 text-ink-900 sm:text-3xl">How Prediction Works</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="card p-6 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-600 text-ink-900">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{s.text}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Technologies */}
      <div className="mt-16 card p-8">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-ink-100 text-ink-700">
            <Code2 className="h-5 w-5" />
          </div>
          <h2 className="font-display text-xl font-700 text-ink-900">Technologies Used</h2>
        </div>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {tech.map((t) => (
            <span key={t} className="rounded-lg bg-ink-100 px-4 py-2 text-sm font-500 text-ink-700">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <Database className="mt-0.5 h-5 w-5 shrink-0 text-primary-500" />
            <p className="text-sm text-ink-500"><span className="font-600 text-ink-700">Frontend:</span> React + Vite + TypeScript with Tailwind CSS for a responsive, accessible UI.</p>
          </div>
          <div className="flex items-start gap-3">
            <Brain className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
            <p className="text-sm text-ink-500"><span className="font-600 text-ink-700">ML logic:</span> A structured prediction layer that simulates model inference and is ready for a backend.</p>
          </div>
          <div className="flex items-start gap-3">
            <Workflow className="mt-0.5 h-5 w-5 shrink-0 text-success-500" />
            <p className="text-sm text-ink-500"><span className="font-600 text-ink-700">Backend-ready:</span> Designed to connect to a Python Flask/FastAPI service serving trained models.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
