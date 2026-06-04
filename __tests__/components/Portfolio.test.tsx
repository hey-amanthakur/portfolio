import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Portfolio } from '@components/sections/Portfolio';

describe('Portfolio Component', (): void => {
  it('renders search input and category filter buttons', (): void => {
    console.log('Portfolio component import:', Portfolio);
    render(<Portfolio />);
    
    expect(screen.getByPlaceholderText(/Search code recipes/i)).toBeInTheDocument();
    
    // Check main filters exist
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'React' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Java' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Spring Boot' })).toBeInTheDocument();
  });

  it('renders static projects list and performs active search filtrations', async (): Promise<void> => {
    const user = userEvent.setup();
    render(<Portfolio />);

    // Assert that featured projects show up initially
    expect(screen.getByText('Drishti AI Assistive Platform')).toBeInTheDocument();
    expect(screen.getByText('The Swaad Recommendation Engine')).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(/Search code recipes/i);
    
    // Type in a query that matches only one project
    await user.type(searchInput, 'Drishti');

    // Assert search matches correctly
    expect(screen.getByText('Drishti AI Assistive Platform')).toBeInTheDocument();
    expect(screen.queryByText('The Swaad Recommendation Engine')).not.toBeInTheDocument();
  });
});
