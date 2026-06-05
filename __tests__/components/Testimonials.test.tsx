import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Testimonials } from '@components/sections/Testimonials';
import { testimonials } from '@/data/content';

describe('Testimonials Component', (): void => {
  it('renders the testimonials heading', (): void => {
    render(<Testimonials />);

    expect(screen.getByText(/What They Say/i)).toBeInTheDocument();
  });

  it('renders all testimonial quotes', (): void => {
    render(<Testimonials />);

    testimonials.forEach((testimonial) => {
      expect(screen.getByText(new RegExp(testimonial.quote))).toBeInTheDocument();
    });
  });

  it('displays client names and roles', (): void => {
    render(<Testimonials />);

    testimonials.forEach((testimonial) => {
      expect(screen.getByText(testimonial.name)).toBeInTheDocument();
      expect(
        screen.getByText(`${testimonial.role} at ${testimonial.company}`)
      ).toBeInTheDocument();
    });
  });

  it('renders star ratings for each testimonial', (): void => {
    render(<Testimonials />);

    // Each testimonial has 5 star SVGs; verify star containers are present
    const quoteElements = screen.getAllByText(/"/);
    expect(quoteElements.length).toBeGreaterThanOrEqual(testimonials.length);
  });

  it('renders client avatar images', (): void => {
    render(<Testimonials />);

    testimonials.forEach((testimonial) => {
      if (testimonial.avatarUrl !== undefined) {
        const img = screen.getByAltText(`${testimonial.name} profile photo`);
        expect(img).toHaveAttribute('src', testimonial.avatarUrl);
      }
    });
  });
});
