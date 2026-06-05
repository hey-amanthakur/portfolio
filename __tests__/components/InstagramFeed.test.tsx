import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InstagramFeed } from '@components/sections/InstagramFeed';
import { siteConfig } from '@/data/content';

describe('InstagramFeed Component', (): void => {
  it('renders the swaad feed heading and handle', (): void => {
    render(<InstagramFeed />);

    expect(screen.getByText(/Swaad Safar Feed/i)).toBeInTheDocument();
    expect(screen.getByText(`@${siteConfig.instaHandle}`)).toBeInTheDocument();
  });

  it('renders food post cards with captions', (): void => {
    render(<InstagramFeed />);

    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThanOrEqual(4);
  });

  it('displays the follow call-to-action link', (): void => {
    render(<InstagramFeed />);

    const followLink = screen.getByRole('link', { name: /Follow/i });
    expect(followLink).toBeInTheDocument();
    expect(followLink).toHaveAttribute('href', siteConfig.socials.instagram);
  });

  it('includes join the safar banner text', (): void => {
    render(<InstagramFeed />);

    expect(screen.getByText(/Join the Safar/i)).toBeInTheDocument();
  });
});
