import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Services } from '@components/sections/Services';
import { services } from '@/data';

describe('Services Component', (): void => {
  it('renders the section with correct aria-label', (): void => {
    render(<Services />);
    expect(screen.getByLabelText('Aman Thakur Freelance Services Menu')).toBeInTheDocument();
  });

  it('renders the section badge and heading', (): void => {
    render(<Services />);
    expect(screen.getByText('services')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /What I build for clients/ })).toBeInTheDocument();
  });

  it('renders the introductory description', (): void => {
    render(<Services />);
    expect(screen.getByText(/Pick a track — every engagement is scoped/)).toBeInTheDocument();
  });

  it('renders all service cards with titles and taglines', (): void => {
    render(<Services />);

    services.forEach((service) => {
      expect(screen.getByText(service.title)).toBeInTheDocument();
      expect(screen.getByText(service.tagline)).toBeInTheDocument();
    });
  });

  it('renders stack badges for each service', (): void => {
    render(<Services />);
    expect(screen.getByText('React 18')).toBeInTheDocument();
    expect(screen.getByText('Spring Boot 3')).toBeInTheDocument();
    expect(screen.getByText('LLMs')).toBeInTheDocument();
    expect(screen.getByText('Storytelling')).toBeInTheDocument();
  });

  it('displays start project buttons for each service', (): void => {
    render(<Services />);
    const buttons = screen.getAllByRole('button', { name: /Start a project/ });
    expect(buttons).toHaveLength(services.length);
  });

  it('highlights the most-booked service', (): void => {
    render(<Services />);
    expect(screen.getByText('most-booked')).toBeInTheDocument();
  });
});
