import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { flushSync } from 'react-dom';
import { Button } from '../../components/ui/Button';
import { CheckboxField, SelectField, TextAreaField, TextField } from '../../components/ui/Field';
import {
  hasErrors,
  MESSAGE_MAX_LENGTH,
  MESSAGE_MIN_LENGTH,
  TOPICS,
  validateContactForm,
  type ContactField,
  type ContactFormValues,
} from './validation';

const INITIAL_VALUES: ContactFormValues = {
  name: '',
  email: '',
  topic: '',
  message: '',
  consent: false,
};

/** Field order and ids, used for the error summary links. */
const FIELD_IDS: Record<ContactField, string> = {
  name: 'contact-name',
  email: 'contact-email',
  topic: 'contact-topic',
  message: 'contact-message',
  consent: 'contact-consent',
};

/**
 * Example of an accessible, validated form:
 * - errors appear after a field is left or the form is submitted
 * - on a failed submit, focus moves to an error summary that links to each field
 * - success is announced through a polite live region
 *
 * Nothing is sent anywhere. Replace `handleValidSubmit` with a real API call.
 */
export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const summaryRef = useRef<HTMLDivElement>(null);

  const errors = validateContactForm(values);
  const errorFor = (field: ContactField) =>
    touched[field] || submitAttempted ? errors[field] : undefined;
  const summaryEntries = submitAttempted
    ? (Object.keys(FIELD_IDS) as ContactField[]).flatMap((field) => {
        const message = errors[field];
        return message ? [{ field, message }] : [];
      })
    : [];

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;
    const nextValue =
      event.target instanceof HTMLInputElement && event.target.type === 'checkbox'
        ? event.target.checked
        : value;
    setValues((current) => ({ ...current, [name]: nextValue }));
    setSuccessMessage('');
  }

  function handleBlur(field: ContactField) {
    setTouched((current) => ({ ...current, [field]: true }));
  }

  function handleValidSubmit(submitted: ContactFormValues) {
    setSuccessMessage(
      `Thanks, ${submitted.name.trim()}. Your message passed validation. (Demo only: nothing was sent.)`,
    );
    setValues(INITIAL_VALUES);
    setTouched({});
    setSubmitAttempted(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (hasErrors(errors)) {
      // Render the summary synchronously so it can receive focus straight away.
      flushSync(() => setSubmitAttempted(true));
      summaryRef.current?.focus();
      return;
    }
    handleValidSubmit(values);
  }

  function focusField(field: ContactField) {
    document.getElementById(FIELD_IDS[field])?.focus();
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-6" aria-describedby="form-note">
      <p id="form-note" className="text-sm text-muted">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      {summaryEntries.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          aria-labelledby="error-summary-title"
          className="rounded-xl border-2 border-danger bg-danger-soft p-4"
        >
          <h2 id="error-summary-title" className="font-semibold text-fg">
            {summaryEntries.length === 1
              ? 'There is 1 problem with your submission'
              : `There are ${summaryEntries.length} problems with your submission`}
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {summaryEntries.map(({ field, message }) => (
              <li key={field}>
                <a
                  href={`#${FIELD_IDS[field]}`}
                  className="font-medium text-danger underline underline-offset-2"
                  onClick={(event) => {
                    event.preventDefault();
                    focusField(field);
                  }}
                >
                  {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id={FIELD_IDS.name}
          name="name"
          label="Name"
          autoComplete="name"
          required
          value={values.name}
          error={errorFor('name')}
          onChange={handleChange}
          onBlur={() => handleBlur('name')}
        />
        <TextField
          id={FIELD_IDS.email}
          name="email"
          type="email"
          label="Email address"
          autoComplete="email"
          inputMode="email"
          spellCheck={false}
          required
          value={values.email}
          error={errorFor('email')}
          onChange={handleChange}
          onBlur={() => handleBlur('email')}
        />
      </div>

      <SelectField
        id={FIELD_IDS.topic}
        name="topic"
        label="Topic"
        required
        value={values.topic}
        error={errorFor('topic')}
        onChange={handleChange}
        onBlur={() => handleBlur('topic')}
      >
        <option value="">Select a topic</option>
        {TOPICS.map((topic) => (
          <option key={topic.value} value={topic.value}>
            {topic.label}
          </option>
        ))}
      </SelectField>

      <TextAreaField
        id={FIELD_IDS.message}
        name="message"
        label="Message"
        hint={`Between ${MESSAGE_MIN_LENGTH} and ${MESSAGE_MAX_LENGTH} characters.`}
        required
        rows={5}
        value={values.message}
        error={errorFor('message')}
        onChange={handleChange}
        onBlur={() => handleBlur('message')}
      />

      <CheckboxField
        id={FIELD_IDS.consent}
        name="consent"
        label="I understand this is a demo form and nothing will be sent."
        required
        checked={values.consent}
        error={errorFor('consent')}
        onChange={handleChange}
        onBlur={() => handleBlur('consent')}
      />

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit">Send message</Button>
        <p role="status" className="text-sm font-medium text-success">
          {successMessage}
        </p>
      </div>
    </form>
  );
}
