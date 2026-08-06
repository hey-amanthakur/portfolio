import { Suspense, lazy, useEffect, useState } from 'react';
import type { FC, ComponentType } from 'react';
import { Navbar } from '@components/layout/Navbar';
import { Hero } from '@components/sections/Hero';
import { About } from '@components/sections/About';
import { Services } from '@components/sections/Services';
import { LoadingFallback } from '@components/ui/LoadingFallback';
import { Footer } from '@components/layout/Footer';
import { ScrollProgress } from '@components/ui/ScrollProgress';
import { DesignSystemPreview } from '@components/ui/DesignSystemPreview';
import { ROUTES } from '@/constants';

// Lazy-load below-fold sections — each becomes a separate JS chunk
const LazyPortfolio = lazy(
  async (): Promise<{ default: ComponentType }> =>
    import('@components/sections/Portfolio')
);
const LazyTestimonials = lazy(
  async (): Promise<{ default: ComponentType }> =>
    import('@components/sections/Testimonials')
);
const LazyInstagramFeed = lazy(
  async (): Promise<{ default: ComponentType }> =>
    import('@components/sections/InstagramFeed')
);
const LazyContact = lazy(
  async (): Promise<{ default: ComponentType }> =>
    import('@components/sections/Contact')
);

const useHashRoute = (): string => {
  const [hash, setHash] = useState<string>(() => window.location.hash);
  useEffect((): (() => void) => {
    const onHashChange = (): void => { setHash(window.location.hash); };
    window.addEventListener('hashchange', onHashChange);
    return (): void => { window.removeEventListener('hashchange', onHashChange); };
  }, []);
  return hash;
};

export const App: FC = () => {
  const hash = useHashRoute();

  if (hash === ROUTES.design) {
    return <DesignSystemPreview />;
  }

  return (
    <div className="min-h-screen bg-canvas text-ink transition-colors duration-300 antialiased selection:bg-primary-300/40">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Suspense fallback={<LoadingFallback />}>
          <LazyPortfolio />
          <LazyTestimonials />
          <LazyInstagramFeed />
          <LazyContact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default App;
