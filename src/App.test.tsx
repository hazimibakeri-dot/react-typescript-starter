import { screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { getAxeViolations } from './test/axe';
import { renderRoute } from './test/render';

describe('application routes', () => {
  it('renders the home page with a single h1 and a document title', () => {
    renderRoute('/');
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(document.title).toBe('React TypeScript Starter');
  });

  it('navigates with the main navigation and marks the current page', async () => {
    const { user } = renderRoute('/');
    const nav = screen.getByRole('navigation', { name: 'Main' });
    await user.click(within(nav).getByRole('link', { name: 'Form example' }));

    expect(screen.getByRole('heading', { level: 1, name: 'Form validation' })).toBeInTheDocument();
    expect(within(nav).getByRole('link', { name: 'Form example' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(within(nav).getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');
    expect(document.title).toBe('Form example · React TypeScript Starter');
    expect(screen.getByRole('main')).toHaveFocus();
  });

  it('shows the not-found page for unknown URLs', () => {
    renderRoute('/does-not-exist');
    expect(screen.getByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument();
  });

  it('provides a skip link to the main content', () => {
    renderRoute('/');
    expect(screen.getByRole('link', { name: 'Skip to main content' })).toHaveAttribute(
      'href',
      '#main-content',
    );
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
  });

  it('opens and closes the mobile menu, including with Escape', async () => {
    const { user } = renderRoute('/');
    const menuButton = screen.getByRole('button', { name: 'Menu' });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    await user.keyboard('{Escape}');
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(menuButton).toHaveFocus();
  });

  it('isolates a crashing widget with the error boundary demo', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const { user } = renderRoute('/error-demo');
    await user.click(screen.getByRole('button', { name: 'Trigger a render error' }));
    expect(screen.getByRole('alert')).toHaveTextContent('The widget crashed.');
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Reset widget' }));
    expect(screen.getByRole('button', { name: 'Trigger a render error' })).toBeInTheDocument();
  });

  it('makes horizontally scrollable code and tables reachable by keyboard', () => {
    renderRoute('/about');
    for (const name of ['Directory tree', 'Scripts table']) {
      expect(screen.getByRole('region', { name })).toHaveAttribute('tabindex', '0');
    }
  });

  it.each(['/', '/form', '/error-demo', '/about', '/missing'])(
    'has no detectable accessibility violations at %s',
    async (path) => {
      const { container } = renderRoute(path);
      expect(await getAxeViolations(container)).toEqual([]);
    },
  );
});
