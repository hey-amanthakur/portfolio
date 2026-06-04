import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Hero } from '@components/sections/Hero';

describe('Hero Component', (): void => {
  it('renders dual welcome header and default code mode', (): void => {
    render(<Hero />);
    
    // Check main title is visible
    expect(screen.getByText(/Aman/i)).toBeInTheDocument();
    
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
    expect(screen.getByText(/Yeh Safar Swaad Ka/i)).toBeInTheDocument();
  });
});
