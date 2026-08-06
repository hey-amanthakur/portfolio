import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Hero } from '@components/sections/Hero';
import { siteConfig } from '@/data';
import { SECTION_LABELS } from '@/constants';

describe('Hero Component', (): void => {
  it('renders the hero section with correct aria-label', (): void => {
    render(<Hero />);
    expect(screen.getByLabelText(SECTION_LABELS.hero)).toBeInTheDocument();
  });

  it('renders the availability pill and whoami command', (): void => {
    render(<Hero />);
    expect(screen.getByText('Available for freelance · Pune, IN')).toBeInTheDocument();
    expect(screen.getByText('whoami')).toBeInTheDocument();
  });

  it('renders the main heading elements', (): void => {
    render(<Hero />);
    expect(screen.getByText('build software.')).toBeInTheDocument();
    expect(screen.getByText('Aman')).toBeInTheDocument();
  });

  it('renders developer persona tabs', (): void => {
    render(<Hero />);
    expect(screen.getByRole('tab', { name: 'Developer' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Off-hours' })).toBeInTheDocument();
  });

  it('renders developer description text', (): void => {
    render(<Hero />);
    expect(screen.getByText(/Full-stack engineer specialising/)).toBeInTheDocument();
  });

  it('renders CTA buttons for developer mode', (): void => {
    render(<Hero />);
    expect(screen.getByRole('button', { name: /Hire Me/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', siteConfig.socials.github);
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', siteConfig.socials.linkedin);
  });

  it('renders stat counters', (): void => {
    render(<Hero />);
    expect(screen.getByText('Open Source Contributions')).toBeInTheDocument();
    expect(screen.getByText('Hackathon Wins')).toBeInTheDocument();
    expect(screen.getByText('Food Community')).toBeInTheDocument();
  });

  it('renders code stack labels', (): void => {
    render(<Hero />);
    const stackLabels = screen.getAllByText('stack');
    expect(stackLabels.length).toBeGreaterThanOrEqual(1);
    const reactLabels = screen.getAllByText('React');
    expect(reactLabels.length).toBeGreaterThanOrEqual(1);
    const tsLabels = screen.getAllByText('TypeScript');
    expect(tsLabels.length).toBeGreaterThanOrEqual(1);
    const springBootLabels = screen.getAllByText('Spring Boot');
    expect(springBootLabels.length).toBeGreaterThanOrEqual(1);
  });

  it('toggles to off-hours persona and shows food content', (): void => {
    render(<Hero />);

    fireEvent.click(screen.getByRole('tab', { name: 'Off-hours' }));

    expect(screen.getByText(/chase street food/)).toBeInTheDocument();
    expect(screen.getByText('Yeh Safar Swaad Ka')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /View food diary/ })).toBeInTheDocument();
    const followLink = screen.getByRole('link', { name: /Follow @yeh\.safar\.swaad\.ka/ });
    expect(followLink).toHaveAttribute('href', siteConfig.socials.instagram);
  });

  it('toggles back to developer mode from off-hours', (): void => {
    render(<Hero />);

    fireEvent.click(screen.getByRole('tab', { name: 'Off-hours' }));
    expect(screen.getByText(/chase street food/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('tab', { name: 'Developer' }));
    expect(screen.getByText('build software.')).toBeInTheDocument();
  });
});
