import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Portfolio } from '@components/sections/Portfolio';
import { SECTION_LABELS, ALL_FILTER } from '@/constants';

describe('Portfolio Component', (): void => {
  it('renders the section with correct aria-label', (): void => {
    render(<Portfolio />);
    expect(screen.getByLabelText(SECTION_LABELS.portfolio)).toBeInTheDocument();
  });

  it('renders the section badge and heading', (): void => {
    render(<Portfolio />);
    expect(screen.getByText('selected work')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Things I've shipped/ })).toBeInTheDocument();
  });

  it('renders pinned repositories heading', (): void => {
    render(<Portfolio />);
    expect(screen.getByRole('heading', { level: 3, name: 'Pinned repositories' })).toBeInTheDocument();
    expect(screen.getByText('@hey-amanthakur')).toBeInTheDocument();
  });

  it('renders search input and category filter buttons', (): void => {
    render(<Portfolio />);
    expect(screen.getByPlaceholderText(/Search projects, tech stacks/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: ALL_FILTER })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'AI' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Web' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Data Science' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Security' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Game Dev' })).toBeInTheDocument();
  });

  it('renders featured projects', (): void => {
    render(<Portfolio />);
    expect(screen.getAllByText('Saathi — Assistive Platform').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Multiplayer Game Engine')).toBeInTheDocument();
  });

  it('filters projects by search query', (): void => {
    render(<Portfolio />);

    const searchInput = screen.getByPlaceholderText(/Search projects, tech stacks/);
    fireEvent.change(searchInput, { target: { value: 'Saathi' } });

    expect(screen.getAllByText('Saathi — Assistive Platform').length).toBeGreaterThanOrEqual(1);
    expect(screen.queryByText('Multiplayer Game Engine')).not.toBeInTheDocument();
  });

  it('renders source code and live demo links', (): void => {
    render(<Portfolio />);
    const sourceLinks = screen.getAllByRole('link', { name: /Source Code/ });
    expect(sourceLinks.length).toBeGreaterThanOrEqual(1);
    const demoLinks = screen.getAllByRole('link', { name: /Live Demo/ });
    expect(demoLinks.length).toBeGreaterThanOrEqual(1);
  });
});
