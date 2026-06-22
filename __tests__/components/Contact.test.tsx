import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Contact } from '@components/sections/Contact';
import { siteConfig, services } from '@/data/content';

describe('Contact Component', (): void => {
  it('renders the WhatsApp-style chat header', (): void => {
    render(<Contact />);

    expect(screen.getByText(/Let's Build Something/i)).toBeInTheDocument();
    expect(screen.getByText('Aman Thakur')).toBeInTheDocument();
    expect(screen.getByText('Full-Stack Developer')).toBeInTheDocument();
  });

  it('renders the incoming chat bubble message', (): void => {
    render(<Contact />);

    expect(screen.getByText(/Hey! 👋 Interested in working together/i)).toBeInTheDocument();
  });

  it('renders service cards as chat bubbles with WhatsApp links', (): void => {
    render(<Contact />);

    services.forEach((service) => {
      expect(screen.getByText(service.title)).toBeInTheDocument();
      expect(screen.getByText(service.tagline)).toBeInTheDocument();
    });

    const links = screen.getAllByRole('link');
    const waLinks = links.filter((l) => l.getAttribute('href')?.includes('wa.me'));
    expect(waLinks.length).toBeGreaterThanOrEqual(services.length);
  });

  it('WhatsApp links contain the correct phone number', (): void => {
    render(<Contact />);

    const links = screen.getAllByRole('link');
    const waLinks = links.filter((l) => l.getAttribute('href')?.includes('wa.me'));

    waLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', expect.stringContaining(siteConfig.phone));
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  it('renders email, WhatsApp number, and active hours', (): void => {
    render(<Contact />);

    expect(screen.getByText(/Quick Reach/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(siteConfig.email)).toBeInTheDocument();
    expect(screen.getByText(/Active Hours/i)).toBeInTheDocument();
    expect(screen.getByText(/9:00 AM/i)).toBeInTheDocument();
  });

  it('renders sponsor card when sponsorUrl is set', (): void => {
    render(<Contact />);

    expect(screen.getByText(/Enjoy my work/i)).toBeInTheDocument();
    expect(screen.getByText(/Buy me a coffee/i)).toBeInTheDocument();
  });
});
