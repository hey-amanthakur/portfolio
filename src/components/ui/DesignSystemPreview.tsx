import type { FC, ReactNode } from 'react';
import { Button } from '@components/ui/Button';
import { Badge } from '@components/ui/Badge';
import { Card } from '@components/ui/Card';
import { SectionReveal } from '@components/ui/SectionReveal';
import { GitHubIcon } from '@components/icons';
import { ROUTES } from '@/constants';

const swatches = [
  { name: 'canvas', class: 'bg-canvas' },
  { name: 'surface', class: 'bg-surface' },
  { name: 'line', class: 'bg-line' },
  { name: 'ink', class: 'bg-ink' },
  { name: 'muted', class: 'bg-muted' },
  { name: 'primary-400', class: 'bg-primary-400' },
  { name: 'secondary-400', class: 'bg-secondary-400' },
] as const;

const primaryScale = [
  { name: '50', className: 'bg-primary-50' },
  { name: '100', className: 'bg-primary-100' },
  { name: '200', className: 'bg-primary-200' },
  { name: '300', className: 'bg-primary-300' },
  { name: '400', className: 'bg-primary-400' },
  { name: '500', className: 'bg-primary-500' },
  { name: '600', className: 'bg-primary-600' },
  { name: '700', className: 'bg-primary-700' },
  { name: '800', className: 'bg-primary-800' },
  { name: '900', className: 'bg-primary-900' },
] as const;

const secondaryScale = [
  { name: '50', className: 'bg-secondary-50' },
  { name: '100', className: 'bg-secondary-100' },
  { name: '200', className: 'bg-secondary-200' },
  { name: '300', className: 'bg-secondary-300' },
  { name: '400', className: 'bg-secondary-400' },
  { name: '500', className: 'bg-secondary-500' },
  { name: '600', className: 'bg-secondary-600' },
  { name: '700', className: 'bg-secondary-700' },
  { name: '800', className: 'bg-secondary-800' },
  { name: '900', className: 'bg-secondary-900' },
] as const;

const Panel: FC<{ title: string; children: ReactNode }> = ({ title, children }) => (
  <section className="border-2 border-line rounded-2xl-playful bg-canvas p-6 mb-8">
    <h2 className="font-display font-black text-xl text-ink mb-5">{title}</h2>
    {children}
  </section>
);

/**
 * Development-only "kitchen sink" reference page. Reach it by appending
 * `#design` to the URL. Every token, utility, and component variant is
 * rendered here so contributors can copy working markup instead of guessing.
 */
export const DesignSystemPreview: FC = () => {
  return (
    <div className="min-h-screen bg-canvas text-ink antialiased">
      <header className="sticky top-0 z-10 border-b-2 border-line bg-surface px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <p className="font-mono text-xs text-muted uppercase tracking-widest">design system</p>
            <h1 className="font-display font-black text-2xl">Kitchen sink</h1>
          </div>
          <a href={ROUTES.home} className="font-mono text-xs text-muted hover:text-primary-400">
            ← back to portfolio
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Typography */}
        <Panel title="Typography">
          <div className="space-y-2">
            <p className="font-display font-black text-4xl">Display — Plus Jakarta Sans</p>
            <p className="font-body text-lg">Body — Outfit</p>
            <p className="font-mono text-sm">Mono — JetBrains Mono</p>
            <p className="text-muted text-sm">Muted body copy example</p>
            <p>
              <span className="text-primary-400">primary</span> ·{' '}
              <span className="text-secondary-400">secondary</span> ·{' '}
              <span className="text-gradient-primary">text-gradient-primary</span> ·{' '}
              <span className="text-gradient-secondary">text-gradient-secondary</span>
            </p>
          </div>
        </Panel>

        {/* Color tokens */}
        <Panel title="Semantic color tokens (auto-flip in dark mode)">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {swatches.map((s) => (
              <div key={s.name} className="rounded-xl border border-line p-2">
                <div className={`h-14 rounded-lg ${s.class} border border-line`} />
                <p className="font-mono text-[11px] text-muted mt-2">{s.name}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-6">
            {primaryScale.map((shade) => (
              <div key={shade.name}>
                <div className={`h-10 rounded-lg ${shade.className}`} />
                <p className="font-mono text-[10px] text-muted mt-1">primary-{shade.name}</p>
              </div>
            ))}
            {secondaryScale.map((shade) => (
              <div key={shade.name}>
                <div className={`h-10 rounded-lg ${shade.className}`} />
                <p className="font-mono text-[10px] text-muted mt-1">secondary-{shade.name}</p>
              </div>
            ))}
          </div>
        </Panel>

        {/* Buttons */}
        <Panel title="Button variants & sizes">
          <div className="flex flex-wrap items-center gap-4">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button isLoading>Loading</Button>
          </div>
        </Panel>

        {/* Badges */}
        <Panel title="Badge variants">
          <div className="flex flex-wrap items-center gap-4">
            <Badge variant="primary">primary</Badge>
            <Badge variant="secondary">secondary</Badge>
            <Badge variant="outline">outline</Badge>
            <Badge variant="neutral">neutral</Badge>
          </div>
        </Panel>

        {/* Cards */}
        <Panel title="Card variants">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-6">
              <h3 className="font-display font-bold text-ink">default</h3>
              <p className="text-sm text-muted mt-2">Border + surface background.</p>
            </Card>
            <Card variant="flat-primary" hoverEffect="none" className="p-6">
              <h3 className="font-display font-bold text-ink">flat-primary</h3>
              <p className="text-sm text-muted mt-2">Hard-offset shadow, saffron accent.</p>
            </Card>
            <Card variant="flat-secondary" hoverEffect="none" className="p-6">
              <h3 className="font-display font-bold text-ink">flat-secondary</h3>
              <p className="text-sm text-muted mt-2">Hard-offset shadow, mint accent.</p>
            </Card>
            <Card variant="borderless" className="p-6">
              <h3 className="font-display font-bold text-ink">borderless</h3>
              <p className="text-sm text-muted mt-2">No chrome at all.</p>
            </Card>
          </div>
        </Panel>

        {/* Custom utilities */}
        <Panel title="Custom utilities">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl-playful bg-surface border-2 border-line p-4">
              <p className="font-mono text-xs text-muted">rounded-2xl-playful</p>
            </div>
            <div className="rounded-xl-playful bg-surface border-2 border-line shadow-flat-light dark:shadow-flat-dark p-4">
              <p className="font-mono text-xs text-muted">shadow-flat-light / dark</p>
            </div>
            <div className="rounded-xl-playful bg-surface border-2 border-line shadow-flat-primary p-4">
              <p className="font-mono text-xs text-muted">shadow-flat-primary</p>
            </div>
            <div className="rounded-xl-playful bg-surface border-2 border-line shadow-flat-secondary p-4">
              <p className="font-mono text-xs text-muted">shadow-flat-secondary</p>
            </div>
            <div className="rounded-xl glass-light dark:glass-dark p-4">
              <p className="font-mono text-xs text-muted">glass-light / glass-dark</p>
            </div>
            <div className="rounded-xl border-gradient p-4">
              <p className="font-mono text-xs text-muted">border-gradient</p>
            </div>
          </div>
          <div className="bg-grid-pattern-light dark:bg-grid-pattern-dark rounded-xl border-2 border-line p-4 mt-4">
            <p className="font-mono text-xs text-muted">bg-grid-pattern-light / dark</p>
          </div>
        </Panel>

        {/* Flat shadow press recipe */}
        <Panel title="Flat shadow press recipe (interactive elements)">
          <p className="text-sm text-muted mb-4">
            Pair <code className="font-mono text-primary-400">shadow-flat-*</code> with{' '}
            <code className="font-mono text-primary-400">active:translate-x-0.5 active:translate-y-0.5 active:shadow-none</code>.
          </p>
          <a
            href={ROUTES.design}
            className="inline-flex items-center gap-2 px-4 py-2 font-display font-bold text-xs rounded-xl border-2 border-ink bg-surface text-ink hover:bg-primary-50 shadow-flat-light dark:shadow-flat-dark active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-150"
          >
            <GitHubIcon className="w-4 h-4" />
            Example link button
          </a>
        </Panel>

        <SectionReveal className="text-center pb-10">
          <p className="text-muted font-mono text-xs">
            Toggle the theme in the navbar to preview dark-mode tokens.
          </p>
        </SectionReveal>
      </main>
    </div>
  );
};

export default DesignSystemPreview;
