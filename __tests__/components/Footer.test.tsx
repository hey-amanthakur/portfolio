import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from '@components/layout/Footer';
import { siteConfig } from '@/data/content';

describe('Footer Component', (): void => {
  it('renders the brand name', (): void => {
    render(<Footer />);
    expect(screen.getByText(/Aman Thakur/)).toBeInTheDocument();
  });

  it('displays the current copyright year', (): void => {
    render(<Footer />);
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });

  it('renders social links to external profiles', (): void => {
    render(<Footer />);
    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    const instagramLink = screen.getByRole('link', { name: 'Instagram' });
    const linkedinLink = screen.getByRole('link', { name: 'LinkedIn' });

    expect(githubLink).toHaveAttribute('href', siteConfig.socials.github);
    expect(instagramLink).toHaveAttribute('href', siteConfig.socials.instagram);
    expect(linkedinLink).toHaveAttribute('href', siteConfig.socials.linkedin);
  });

  it('opens social links in new tabs', (): void => {
    render(<Footer />);
    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
