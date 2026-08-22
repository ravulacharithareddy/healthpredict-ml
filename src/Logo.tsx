import { Activity } from 'lucide-react';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-glow">
        <Activity className="h-5 w-5" strokeWidth={2.5} />
      </span>
      <span className="font-display text-lg font-700 tracking-tight text-ink-900">
        Health<span className="text-gradient">Predict</span>
      </span>
    </span>
  );
}
