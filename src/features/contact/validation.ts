export const TOPICS = [
  { value: 'general', label: 'General question' },
  { value: 'support', label: 'Technical support' },
  { value: 'feedback', label: 'Product feedback' },
] as const;

export type Topic = (typeof TOPICS)[number]['value'];

export interface ContactFormValues {
  name: string;
  email: string;
  topic: Topic | '';
  message: string;
  consent: boolean;
}

export type ContactField = keyof ContactFormValues;
export type ContactFormErrors = Partial<Record<ContactField, string>>;

export const MESSAGE_MIN_LENGTH = 20;
export const MESSAGE_MAX_LENGTH = 1000;
const NAME_MAX_LENGTH = 80;

/**
 * Pragmatic email check: something@something.tld with no spaces.
 * It intentionally does not try to implement the full RFC 5322 grammar; confirm
 * ownership of an address by sending a verification email instead.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isTopic = (value: string): value is Topic => TOPICS.some((topic) => topic.value === value);

/** Returns a message for each invalid field. An empty object means the form is valid. */
export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) {
    errors.name = 'Enter your name.';
  } else if (name.length > NAME_MAX_LENGTH) {
    errors.name = `Name must be ${NAME_MAX_LENGTH} characters or fewer.`;
  }

  if (!email) {
    errors.email = 'Enter your email address.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter an email address in the format name@example.com.';
  }

  if (!values.topic || !isTopic(values.topic)) {
    errors.topic = 'Choose a topic.';
  }

  if (!message) {
    errors.message = 'Enter a message.';
  } else if (message.length < MESSAGE_MIN_LENGTH) {
    errors.message = `Message must be at least ${MESSAGE_MIN_LENGTH} characters.`;
  } else if (message.length > MESSAGE_MAX_LENGTH) {
    errors.message = `Message must be ${MESSAGE_MAX_LENGTH} characters or fewer.`;
  }

  if (!values.consent) {
    errors.consent = 'Confirm that this is a demo submission to continue.';
  }

  return errors;
}

export const hasErrors = (errors: ContactFormErrors): boolean => Object.keys(errors).length > 0;
