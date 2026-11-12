import axe from 'axe-core';

/**
 * Runs axe-core against a rendered container and returns a readable list of violations.
 *
 * jsdom has no layout engine, so colour contrast cannot be measured here; it is disabled
 * and should be checked in a real browser (for example with Lighthouse or axe DevTools).
 */
export async function getAxeViolations(container: Element): Promise<string[]> {
  const results = await axe.run(container, {
    rules: {
      'color-contrast': { enabled: false },
    },
  });
  return results.violations.map(
    (violation) => `${violation.id}: ${violation.help} (${violation.nodes.length} element(s))`,
  );
}
