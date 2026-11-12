import { describe, expect, it } from 'vitest';
import {
  hasErrors,
  MESSAGE_MAX_LENGTH,
  MESSAGE_MIN_LENGTH,
  validateContactForm,
  type ContactFormValues,
} from './validation';

const valid: ContactFormValues = {
  name: 'Sam Example',
  email: 'sam@example.com',
  topic: 'general',
  message: 'This message is long enough to pass validation.',
  consent: true,
};

describe('validateContactForm', () => {
  it('returns no errors for valid input', () => {
    const errors = validateContactForm(valid);
    expect(errors).toEqual({});
    expect(hasErrors(errors)).toBe(false);
  });

  it('requires every field', () => {
    const errors = validateContactForm({
      name: '',
      email: '',
      topic: '',
      message: '',
      consent: false,
    });
    expect(Object.keys(errors).sort()).toEqual(['consent', 'email', 'message', 'name', 'topic']);
  });

  it('treats whitespace-only values as empty', () => {
    const errors = validateContactForm({ ...valid, name: '   ', message: '   ' });
    expect(errors.name).toBe('Enter your name.');
    expect(errors.message).toBe('Enter a message.');
  });

  it.each(['plainaddress', 'missing-at.example.com', 'name@domain', 'name @example.com'])(
    'rejects the malformed email %s',
    (email) => {
      expect(validateContactForm({ ...valid, email }).email).toMatch(/format/);
    },
  );

  it('accepts surrounding whitespace around a valid email', () => {
    expect(validateContactForm({ ...valid, email: '  sam@example.com ' }).email).toBeUndefined();
  });

  it('enforces message length limits', () => {
    expect(
      validateContactForm({ ...valid, message: 'a'.repeat(MESSAGE_MIN_LENGTH - 1) }).message,
    ).toMatch(/at least/);
    expect(
      validateContactForm({ ...valid, message: 'a'.repeat(MESSAGE_MIN_LENGTH) }).message,
    ).toBeUndefined();
    expect(
      validateContactForm({ ...valid, message: 'a'.repeat(MESSAGE_MAX_LENGTH + 1) }).message,
    ).toMatch(/or fewer/);
  });

  it('rejects unknown topics', () => {
    const values = { ...valid, topic: 'other' } as unknown as ContactFormValues;
    expect(validateContactForm(values).topic).toBe('Choose a topic.');
  });

  it('limits the name length', () => {
    expect(validateContactForm({ ...valid, name: 'a'.repeat(81) }).name).toMatch(/80 characters/);
  });
});
