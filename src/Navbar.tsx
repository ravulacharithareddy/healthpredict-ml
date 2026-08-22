import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

export type Page = 'home' | 'predictions' | 'about' | 'contact';

interface NavbarProps {
  current: Page;
  onNavigate: (page: Page) => void;
}

const links: { id: Page; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'predictions', label: 'Predictions' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({ current, onNavigate }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (p: Page) => {
    onNavigate(p);
    setOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/85 backdrop-blur-lg shadow-sm ring-1 ring-ink-100' : 'bg-transparent'
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <button onClick={() => go('home')} className="transition hover:opacity-80" aria-label="HealthPredict home">
          <Logo />
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                current === l.id
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-ink-600 hover:bg-ink-100 hover:text-ink-900'
              }`}
            >
              {l.label}
            </button>
          ))}
          <button onClick={() => go('predictions')} className="btn-primary ml-2 px-4 py-2">
            Start Prediction
          </button>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-lg text-ink-700 hover:bg-ink-100 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink-100 bg-white md:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
                  current === l.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-ink-700 hover:bg-ink-100'
                }`}
              >
                {l.label}
              </button>
            ))}
            <button onClick={() => go('predictions')} className="btn-primary mt-2">
              Start Prediction
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
