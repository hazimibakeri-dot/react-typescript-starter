import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { getAxeViolations } from '../../test/axe';
import { ContactForm } from './ContactForm';

function setup() {
  const user = userEvent.setup();
  const utils = render(<ContactForm />);
  return { user, ...utils };
}

describe('ContactForm', () => {
  it('shows an error summary and moves focus to it when submitted empty', async () => {
    const { user } = setup();
    await user.click(screen.getByRole('button', { name: 'Send message' }));

    const summary = screen.getByRole('heading', { name: /There are 5 problems/ }).parentElement;
    expect(summary).toHaveFocus();
    expect(screen.getByRole('textbox', { name: /^Name/ })).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('textbox', { name: /^Name/ })).toHaveAccessibleDescription(
      'Error: Enter your name.',
    );
  });

  it('focuses the related field when a summary link is activated', async () => {
    const { user } = setup();
    await user.click(screen.getByRole('button', { name: 'Send message' }));
    await user.click(screen.getByRole('link', { name: 'Enter your email address.' }));
    expect(screen.getByRole('textbox', { name: /^Email address/ })).toHaveFocus();
  });

  it('validates a field when it loses focus', async () => {
    const { user } = setup();
    const email = screen.getByRole('textbox', { name: /^Email address/ });
    await user.type(email, 'not-an-email');
    expect(email).not.toHaveAttribute('aria-invalid');
    await user.tab();
    expect(email).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText(/format name@example.com/)).toBeInTheDocument();
  });

  it('accepts valid input, announces success and resets the form', async () => {
    const { user } = setup();
    await user.type(screen.getByRole('textbox', { name: /^Name/ }), 'Sam Example');
    await user.type(screen.getByRole('textbox', { name: /^Email address/ }), 'sam@example.com');
    await user.selectOptions(screen.getByRole('combobox', { name: /^Topic/ }), 'support');
    await user.type(
      screen.getByRole('textbox', { name: /^Message/ }),
      'I would like to know more about this starter.',
    );
    await user.click(screen.getByRole('checkbox', { name: /demo form/ }));
    await user.click(screen.getByRole('button', { name: 'Send message' }));

    expect(screen.getByRole('status')).toHaveTextContent('Thanks, Sam Example.');
    expect(screen.queryByRole('heading', { name: /problem/ })).not.toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /^Name/ })).toHaveValue('');
  });

  it('has no detectable accessibility violations, including in the error state', async () => {
    const { user, container } = setup();
    expect(await getAxeViolations(container)).toEqual([]);
    await user.click(screen.getByRole('button', { name: 'Send message' }));
    expect(await getAxeViolations(container)).toEqual([]);
  });
});
