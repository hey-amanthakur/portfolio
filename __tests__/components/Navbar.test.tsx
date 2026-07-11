import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Navbar } from '@components/layout/Navbar';

describe('Navbar Component', (): void => {
  it('renders brand name logo', (): void => {
    render(<Navbar />);
    expect(screen.getByRole('link', { name: /aman_thakur_/ })).toBeInTheDocument();
  });

  it('renders desktop navigation links', (): void => {
    render(<Navbar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('Testimonials')).toBeInTheDocument();
    expect(screen.getByText('Off-Hours')).toBeInTheDocument();
    expect(screen.getByText('Hire Me')).toBeInTheDocument();
  });

  it('contains accessible theme toggle button', async (): Promise<void> => {
    const user = userEvent.setup();
    render(<Navbar />);

    const desktopThemeBtn = screen.getByRole('button', { name: 'Toggle active theme' });
    expect(desktopThemeBtn).toBeInTheDocument();

    await user.click(desktopThemeBtn);
    expect(desktopThemeBtn).toBeInTheDocument();
  });

  it('contains mobile hamburger menu button', (): void => {
    render(<Navbar />);
    expect(screen.getByRole('button', { name: 'Open mobile navigation drawer' })).toBeInTheDocument();
  });
});
