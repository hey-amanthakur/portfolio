import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Contact } from '@components/sections/Contact';
import { siteConfig, services } from '@/data';

describe('Contact Component', (): void => {
  it('renders the section with correct aria-label', (): void => {
    render(<Contact />);
    expect(screen.getByLabelText('Contact Aman Thakur via WhatsApp')).toBeInTheDocument();
  });

  it('renders the heading and description', (): void => {
    render(<Contact />);
    expect(screen.getByRole('heading', { level: 2, name: /Let's build something real/ })).toBeInTheDocument();
    expect(screen.getByText(/Pick a service below — it opens WhatsApp with a pre-filled brief/)).toBeInTheDocument();
  });

  it('renders the WhatsApp chat header with profile info', (): void => {
    render(<Contact />);
    expect(screen.getByText('AT')).toBeInTheDocument();
    expect(screen.getByText('Aman Thakur')).toBeInTheDocument();
    expect(screen.getByText('Full-Stack Developer')).toBeInTheDocument();
  });

  it('renders the incoming chat bubble message', (): void => {
    render(<Contact />);
    expect(screen.getByText(/Hey! Interested in working together/)).toBeInTheDocument();
    expect(screen.getByText('Just now')).toBeInTheDocument();
  });

  it('renders service cards as chat bubbles with titles and taglines', (): void => {
    render(<Contact />);
    services.forEach((service) => {
      expect(screen.getByText(service.title)).toBeInTheDocument();
      expect(screen.getByText(service.tagline)).toBeInTheDocument();
    });
  });

  it('renders Tap to WhatsApp labels for each service', (): void => {
    render(<Contact />);
    const tapLabels = screen.getAllByText('Tap to WhatsApp');
    expect(tapLabels).toHaveLength(services.length);
  });

  it('WhatsApp links contain the correct phone number and open in new tab', (): void => {
    render(<Contact />);
    const links = screen.getAllByRole('link');
    const waLinks = links.filter((l) => l.getAttribute('href')?.includes('wa.me'));

    expect(waLinks.length).toBeGreaterThanOrEqual(services.length);
    waLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', expect.stringContaining(siteConfig.phone));
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  it('renders direct contact section with email and phone', (): void => {
    render(<Contact />);
    expect(screen.getByRole('heading', { level: 3, name: 'Direct contact' })).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText(siteConfig.email)).toBeInTheDocument();
    expect(screen.getByText('WhatsApp')).toBeInTheDocument();
    expect(screen.getByText('+91 77620 21493')).toBeInTheDocument();
    expect(screen.getByText('Active Hours')).toBeInTheDocument();
    expect(screen.getByText(/9:00 AM/)).toBeInTheDocument();
  });

  it('renders the sponsor card', (): void => {
    render(<Contact />);
    expect(screen.getByText('Buy me a coffee')).toBeInTheDocument();
    expect(screen.getByText('Support my work')).toBeInTheDocument();
  });
});
