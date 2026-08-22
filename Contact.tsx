import { useState } from 'react';
import { Mail, MapPin, Send, Loader2, CheckCircle2, Github, MessageSquare } from 'lucide-react';

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!form.email.trim()) e.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email.';
    if (!form.message.trim()) e.message = 'Please enter a message.';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    }, 1200);
  };

  const handleChange = (field: string, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => {
      if (!p[field]) return p;
      const n = { ...p };
      delete n[field];
      return n;
    });
  };

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-xs font-600 text-primary-700 ring-1 ring-primary-100">
          Get in Touch
        </span>
        <h1 className="mt-4 font-display text-3xl font-800 text-ink-900 sm:text-4xl">Contact Us</h1>
        <p className="mt-3 text-ink-500">
          Have a question about HealthPredict, want to collaborate, or report an issue? Send us a message.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-5">
        {/* Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-50 text-primary-600">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-600 text-ink-900">Email</p>
                <p className="text-sm text-ink-500">healthpredict@research.example</p>
              </div>
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent-50 text-accent-600">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-600 text-ink-900">Project</p>
                <p className="text-sm text-ink-500">Educational / Research ML Project</p>
              </div>
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-ink-100 text-ink-700">
                <Github className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-600 text-ink-900">Source</p>
                <p className="text-sm text-ink-500">Open-source on GitHub</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-3">
          {sent ? (
            <div className="card flex flex-col items-center justify-center p-10 text-center animate-scale-in">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-success-50 text-success-600 ring-1 ring-success-200">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="mt-4 font-display text-xl font-700 text-ink-900">Message sent!</h3>
              <p className="mt-1.5 text-sm text-ink-500">Thanks for reaching out. We&rsquo;ll get back to you soon.</p>
              <button onClick={() => setSent(false)} className="btn-secondary mt-6">
                <MessageSquare className="h-4 w-4" />
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card space-y-5 p-6 sm:p-8" noValidate>
              <div>
                <label htmlFor="name" className="input-label">Name</label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`input-field ${errors.name ? 'input-error' : ''}`}
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-1 text-xs font-500 text-danger-600">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="input-label">Email</label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`input-field ${errors.email ? 'input-error' : ''}`}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="mt-1 text-xs font-500 text-danger-600">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="message" className="input-label">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  className={`input-field resize-none ${errors.message ? 'input-error' : ''}`}
                  placeholder="Your message…"
                />
                {errors.message && <p className="mt-1 text-xs font-500 text-danger-600">{errors.message}</p>}
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
