import type { FC } from 'react';
import { Navbar } from '@components/layout/Navbar';
import { Hero } from '@components/sections/Hero';
import { About } from '@components/sections/About';
import { Services } from '@components/sections/Services';
import { Portfolio } from '@components/sections/Portfolio';
import { Testimonials } from '@components/sections/Testimonials';
import { InstagramFeed } from '@components/sections/InstagramFeed';
import { Contact } from '@components/sections/Contact';
import { Footer } from '@components/layout/Footer';

export const App: FC = () => {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300 antialiased selection:bg-primary-300/40">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Testimonials />
        <InstagramFeed />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
