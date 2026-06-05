import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { About } from '@components/sections/About';
import { milestones } from '@/data/content';

describe('About Component', (): void => {
  it('renders section heading and journey description', (): void => {
    render(<About />);

    expect(screen.getByText(/My Journey So Far/i)).toBeInTheDocument();
    expect(
      screen.getByText(/playful balancing act between complex backend microservices/i)
    ).toBeInTheDocument();
  });

  it('renders all milestone timeline entries', (): void => {
    render(<About />);

    milestones.forEach((milestone) => {
      expect(screen.getByText(milestone.title)).toBeInTheDocument();
      expect(screen.getByText(milestone.description)).toBeInTheDocument();
    });
  });

  it('displays year badges for each milestone', (): void => {
    render(<About />);

    milestones.forEach((milestone) => {
      expect(screen.getByText(milestone.year)).toBeInTheDocument();
    });
  });
});
