import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Contact } from '@components/sections/Contact';

describe('Contact Form Component', (): void => {
  it('renders freelance project inquiry form fields', (): void => {
    render(<Contact />);

    expect(screen.getByLabelText(/Customer Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Inbox Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Service/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Project Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cooking Instructions/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit Project Request/i })).toBeInTheDocument();
  });

  it('triggers form validators and shows errors for empty or invalid values', async (): Promise<void> => {
    const user = userEvent.setup();
    render(<Contact />);

    const submitBtn = screen.getByRole('button', { name: /Submit Project Request/i });
    await user.click(submitBtn);

    // Assert that validation warnings show up
    expect(await screen.findByText(/Customer name must be at least 2 characters long/i)).toBeInTheDocument();
    expect(screen.getByText(/A valid delivery email address is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Please select a service/i)).toBeInTheDocument();
    expect(screen.getByText(/Subject must be at least 3 characters long/i)).toBeInTheDocument();
    expect(screen.getByText(/Instructions must be at least 10 characters long/i)).toBeInTheDocument();
  });

  it('displays success card after successful submission of valid inputs', async (): Promise<void> => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByLabelText(/Customer Name/i), 'Rohan Sharma');
    await user.type(screen.getByLabelText(/Inbox Address/i), 'rohan@test.com');
    await user.selectOptions(screen.getByLabelText(/Select Service/i), 'fullstack');
    await user.type(screen.getByLabelText(/Project Title/i), 'Build standard Spring boot backend');
    await user.type(screen.getByLabelText(/Cooking Instructions/i), 'Scale to thousands of active requests with high test coverage.');

    const submitBtn = screen.getByRole('button', { name: /Submit Project Request/i });
    await user.click(submitBtn);

    // Wait for the simulated API delay success card to render
    await waitFor((): void => {
      expect(screen.getByText(/Project Request Received/i)).toBeInTheDocument();
    }, { timeout: 3000 });

    expect(screen.getByText(/I.ll review your project details/i)).toBeInTheDocument();
  });
});
