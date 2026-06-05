import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Services } from '@components/sections/Services';
import { services } from '@/data/content';

describe('Services Component', (): void => {
  it('renders the freelance menu heading', (): void => {
    render(<Services />);

    expect(screen.getByText(/The Freelance Menu/i)).toBeInTheDocument();
    expect(screen.getByText(/Chef Aman's gourmet offerings/i)).toBeInTheDocument();
  });

  it('renders all service cards with titles and taglines', (): void => {
    render(<Services />);

    services.forEach((service) => {
      expect(screen.getByText(service.title)).toBeInTheDocument();
      expect(screen.getByText(service.tagline)).toBeInTheDocument();
    });
  });

  it('renders key ingredients badges for each service', (): void => {
    render(<Services />);

    expect(screen.getByText('React 18')).toBeInTheDocument();
    expect(screen.getByText('Spring Boot 3')).toBeInTheDocument();
    expect(screen.getByText('LLMs')).toBeInTheDocument();
    expect(screen.getByText('Storytelling')).toBeInTheDocument();
  });

  it('displays order buttons for each service', (): void => {
    render(<Services />);

    const orderButtons = screen.getAllByRole('button', { name: /Add to Project Order/i });
    expect(orderButtons).toHaveLength(services.length);
  });

  it('highlights the chef special service', (): void => {
    render(<Services />);

    expect(screen.getByText(/Chef's Special/i)).toBeInTheDocument();
  });
});
