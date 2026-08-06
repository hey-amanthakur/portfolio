import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Testimonials } from '@components/sections/Testimonials';
import { testimonials } from '@/data';
import { SECTION_LABELS } from '@/constants';

describe('Testimonials Component', (): void => {
  it('renders the section with correct aria-label', (): void => {
    render(<Testimonials />);
    expect(screen.getByLabelText(SECTION_LABELS.testimonials)).toBeInTheDocument();
  });

  it('renders the section badge and heading', (): void => {
    render(<Testimonials />);
    expect(screen.getByText('testimonials')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /What founders say/ })).toBeInTheDocument();
  });

  it('renders the introductory description', (): void => {
    render(<Testimonials />);
    expect(screen.getByText(/Real feedback from teams I've engineered alongside/)).toBeInTheDocument();
  });

  it('renders the current testimonial quote', (): void => {
    render(<Testimonials />);
    expect(screen.getByText(new RegExp(testimonials[0].quote))).toBeInTheDocument();
  });

  it('displays the current author name and role', (): void => {
    render(<Testimonials />);
    expect(screen.getByText(testimonials[0].name)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(testimonials[0].role))).toBeInTheDocument();
  });

  it('renders navigation arrow buttons', (): void => {
    render(<Testimonials />);
    expect(screen.getByRole('button', { name: 'Previous testimonial' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next testimonial' })).toBeInTheDocument();
  });

  it('renders dot navigation buttons', (): void => {
    render(<Testimonials />);
    testimonials.forEach((_, index) => {
      expect(screen.getByRole('button', { name: `Go to testimonial ${String(index + 1)}` })).toBeInTheDocument();
    });
  });

  it('renders client avatar image for the current testimonial', (): void => {
    render(<Testimonials />);
    const first = testimonials[0];
    if (first.avatarUrl !== undefined) {
      const img = screen.getByAltText(`${first.name} profile photo`);
      expect(img).toHaveAttribute('src', first.avatarUrl);
    }
  });
});
