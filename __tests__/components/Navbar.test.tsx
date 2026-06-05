import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Navbar } from '@components/layout/Navbar';

describe('Navbar Component', (): void => {
  it('renders brand name logo successfully', (): void => {
    render(<Navbar />);
    const brandElement = screen.getByText(/Aman Thakur/i);
    expect(brandElement).toBeInTheDocument();
  });

  it('renders standard desktop navigation links', (): void => {
    render(<Navbar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Swaad Feed')).toBeInTheDocument();
    expect(screen.getByText('Order Project')).toBeInTheDocument();
  });

  it('contains accessible theme toggle button and toggle interactions', async (): Promise<void> => {
    const user = userEvent.setup();
    render(<Navbar />);

    const [desktopThemeBtn, mobileThemeBtn] = screen.getAllByRole('button', { name: /Toggle active theme/i });
    expect(desktopThemeBtn).toBeInTheDocument();
    expect(mobileThemeBtn).toBeInTheDocument();

    // Toggle desktop button
    await user.click(desktopThemeBtn);
    expect(desktopThemeBtn).toBeInTheDocument();
  });
});
