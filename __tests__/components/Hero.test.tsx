import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Hero } from '@components/sections/Hero';
import { siteConfig } from '@/data/content';

describe('Hero Component', (): void => {
  it('renders dual welcome header and default code mode', (): void => {
    render(<Hero />);

    // Check main title is visible
    expect(screen.getByText(/Cook Scalable Code/i)).toBeInTheDocument();

    // Check default mode is Code Mode
    expect(screen.getByText(/Mode: Elite Developer/i)).toBeInTheDocument();
    expect(screen.getByText(/Code Mode/i)).toBeInTheDocument();
    expect(screen.getByText(/Food Mode/i)).toBeInTheDocument();
  });

  it('toggles interactive panels successfully when Food Mode is clicked', async (): Promise<void> => {
    const user = userEvent.setup();
    render(<Hero />);

    const foodBtn = screen.getByRole('button', { name: /Food Mode/i });
    expect(foodBtn).toBeInTheDocument();

    // Click on Food Mode
    await user.click(foodBtn);

    // Assert that the theme subheaders change
    expect(screen.getByText(/Mode: Swaad Explorer/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Yeh Safar Swaad Ka/i })).toBeInTheDocument();
  });

  it('switches back to code mode after food mode is active', async (): Promise<void> => {
    const user = userEvent.setup();
    render(<Hero />);

    await user.click(screen.getByRole('button', { name: /Food Mode/i }));
    expect(screen.getByText(/Mode: Swaad Explorer/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Code Mode/i }));
    expect(screen.getByText(/Mode: Elite Developer/i)).toBeInTheDocument();
    expect(screen.getByText(/Cook Scalable Code/i)).toBeInTheDocument();
  });

  it('renders CTA links for code mode', (): void => {
    render(<Hero />);

    expect(screen.getByRole('button', { name: /Order a System/i })).toBeInTheDocument();
    const githubLink = screen.getByRole('link', { name: /GitHub Repos/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', siteConfig.socials.github);
  });

  it('renders CTA links for food mode', async (): Promise<void> => {
    const user = userEvent.setup();
    render(<Hero />);

    await user.click(screen.getByRole('button', { name: /Food Mode/i }));

    const instaLink = screen.getByRole('link', { name: /Follow @/ });
    expect(instaLink).toBeInTheDocument();
    expect(instaLink).toHaveAttribute('href', siteConfig.socials.instagram);
    expect(screen.getByRole('button', { name: /View Food Feed/i })).toBeInTheDocument();
  });
});
