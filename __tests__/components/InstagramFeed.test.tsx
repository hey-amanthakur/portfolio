import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InstagramFeed } from '@components/sections/InstagramFeed';
import { siteConfig } from '@/data';

describe('InstagramFeed Component', (): void => {
  it('renders the section with correct aria-label', (): void => {
    render(<InstagramFeed />);
    expect(screen.getByLabelText('Off-hours side project — food diary on Instagram')).toBeInTheDocument();
  });

  it('renders the section badge and heading', (): void => {
    render(<InstagramFeed />);
    expect(screen.getByText('Side project · 02')).toBeInTheDocument();
    expect(screen.getByText(/Off the keyboard/)).toBeInTheDocument();
  });

  it('renders the handle and description', (): void => {
    render(<InstagramFeed />);
    expect(screen.getByText(`@${siteConfig.instaHandle}`)).toBeInTheDocument();
    expect(screen.getByText(/Pune-based food diary/)).toBeInTheDocument();
  });

  it('renders food post cards', (): void => {
    render(<InstagramFeed />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThanOrEqual(4);
  });

  it('displays the follow call-to-action link', (): void => {
    render(<InstagramFeed />);
    const followLink = screen.getByRole('link', { name: /Follow @yeh\.safar\.swaad\.ka/ });
    expect(followLink).toBeInTheDocument();
    expect(followLink).toHaveAttribute('href', siteConfig.socials.instagram);
  });

  it('renders the CTA banner text', (): void => {
    render(<InstagramFeed />);
    expect(screen.getByText('Hungry for more reels?')).toBeInTheDocument();
    expect(screen.getByText(/Pune · weekly drops/)).toBeInTheDocument();
  });
});
