import { useState, useEffect, useCallback } from 'react';
import { Navbar, type Page } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Home } from '@/pages/Home';
import { Predictions } from '@/pages/Predictions';
import { About } from '@/pages/About';
import { Contact } from '@/pages/Contact';
import { PredictionForm } from '@/components/PredictionForm';
import { getDisease } from '@/lib/diseases';

type View = { page: Page } | { page: 'form'; diseaseId: string };

function parseHash(): View {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (hash.startsWith('predict/')) {
    const id = hash.slice('predict/'.length);
    if (getDisease(id)) return { page: 'form', diseaseId: id };
  }
  if (hash === 'predictions' || hash === 'about' || hash === 'contact') {
    return { page: hash as Page };
  }
  return { page: 'home' };
}

function viewToHash(v: View): string {
  if (v.page === 'form') return `#predict/${v.diseaseId}`;
  return `#${v.page}`;
}

function pageFromView(v: View): Page {
  if (v.page === 'form') return 'predictions';
  return v.page;
}

export default function App() {
  const [view, setView] = useState<View>(() => parseHash());

  useEffect(() => {
    const onHash = () => setView(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = useCallback((v: View) => {
    window.location.hash = viewToHash(v);
    setView(v);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavigate = useCallback((p: Page) => navigate({ page: p }), [navigate]);
  const handlePredict = useCallback((id: string) => navigate({ page: 'form', diseaseId: id }), [navigate]);

  const currentNavPage = pageFromView(view);

  let content: React.ReactNode;
  if (view.page === 'home') {
    content = <Home onNavigate={handleNavigate} onPredict={handlePredict} />;
  } else if (view.page === 'predictions') {
    content = <Predictions onPredict={handlePredict} />;
  } else if (view.page === 'about') {
    content = <About />;
  } else if (view.page === 'contact') {
    content = <Contact />;
  } else if (view.page === 'form') {
    const disease = getDisease(view.diseaseId);
    content = disease ? (
      <PredictionForm disease={disease} onBack={() => navigate({ page: 'predictions' })} />
    ) : (
      <Predictions onPredict={handlePredict} />
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar current={currentNavPage} onNavigate={handleNavigate} />
      <main className="flex-1">{content}</main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
