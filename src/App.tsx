import { Suspense, lazy } from 'react';
import type { FC, ComponentType } from 'react';
import { Navbar } from '@components/layout/Navbar';
import { Hero } from '@components/sections/Hero';
import { About } from '@components/sections/About';
import { Services } from '@components/sections/Services';
import { LoadingFallback } from '@components/ui/LoadingFallback';
import { Footer } from '@components/layout/Footer';

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

export const App: FC = () => {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300 antialiased dark:bg-grid-pattern-dark relative dark:crt-flicker">
      {/* CRT scanline overlay — visible only in dark/terminal mode */}
      <div className="crt-overlay hidden dark:block" aria-hidden="true" />

      <Navbar />
      <main data-testid="main-terminal" className="relative z-10">
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
