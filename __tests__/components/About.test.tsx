import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { About } from '@components/sections/About';
import { milestones } from '@/data';
import { SECTION_LABELS } from '@/constants';

describe('About Component', (): void => {
  it('renders the section with correct aria-label', (): void => {
    render(<About />);
    expect(screen.getByLabelText(SECTION_LABELS.about)).toBeInTheDocument();
  });

  it('renders the section badge and heading', (): void => {
    render(<About />);
    expect(screen.getByText('// the path so far')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /From hackathon hall → production stack/ })).toBeInTheDocument();
  });

  it('renders the introductory description', (): void => {
    render(<About />);
    expect(screen.getByText(/Three years of shipping software, winning hackathons/)).toBeInTheDocument();
  });

  it('renders all stat labels', (): void => {
    render(<About />);
    expect(screen.getByText('Open Source Contributions')).toBeInTheDocument();
    expect(screen.getByText('Hackathon Wins')).toBeInTheDocument();
    expect(screen.getByText('Food Community')).toBeInTheDocument();
    expect(screen.getByText('Years Coding')).toBeInTheDocument();
  });

  it('renders all milestone entries with titles and descriptions', (): void => {
    render(<About />);

    milestones.forEach((milestone) => {
      expect(screen.getByText(new RegExp(milestone.title))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(milestone.description))).toBeInTheDocument();
    });
  });

  it('displays year badges for each milestone', (): void => {
    render(<About />);

    milestones.forEach((milestone) => {
      expect(screen.getAllByText(milestone.year).length).toBeGreaterThanOrEqual(1);
    });
  });
});
