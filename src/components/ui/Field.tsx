import { useId, type ComponentProps, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface FieldMessages {
  /** Visible label text. Every field must have one. */
  label: string;
  /** Extra guidance shown under the label and linked with aria-describedby. */
  hint?: string;
  /** Validation message. When present the control is marked aria-invalid. */
  error?: string;
}

const controlClasses =
  'block w-full rounded-lg border bg-surface-raised px-3 py-2.5 text-base text-fg placeholder:text-muted/80 transition-colors sm:text-sm';

function useFieldIds(id: string | undefined, hint?: string, error?: string) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const hintId = hint ? `${controlId}-hint` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
  return { controlId, hintId, errorId, describedBy };
}

function FieldLabel({
  htmlFor,
  label,
  required,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-fg">
      {label}
      {required && (
        <span className="text-danger" aria-hidden="true">
          {' '}
          *
        </span>
      )}
    </label>
  );
}

function FieldHint({ id, children }: { id?: string; children?: ReactNode }) {
  if (!id) return null;
  return (
    <p id={id} className="text-sm text-muted">
      {children}
    </p>
  );
}

function FieldError({ id, children }: { id?: string; children?: ReactNode }) {
  if (!id) return null;
  return (
    <p id={id} className="text-sm font-medium text-danger">
      <span className="sr-only">Error:</span> {children}
    </p>
  );
}

type TextFieldProps = FieldMessages & ComponentProps<'input'>;

export function TextField({
  label,
  hint,
  error,
  id,
  className,
  required,
  ...props
}: TextFieldProps) {
  const ids = useFieldIds(id, hint, error);
  return (
    <div className={cn('space-y-1.5', className)}>
      <FieldLabel htmlFor={ids.controlId} label={label} required={required} />
      <FieldHint id={ids.hintId}>{hint}</FieldHint>
      <input
        id={ids.controlId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={ids.describedBy}
        className={cn(controlClasses, error ? 'border-danger' : 'border-border-strong')}
        {...props}
      />
      <FieldError id={ids.errorId}>{error}</FieldError>
    </div>
  );
}

type TextAreaFieldProps = FieldMessages & ComponentProps<'textarea'>;

export function TextAreaField({
  label,
  hint,
  error,
  id,
  className,
  required,
  ...props
}: TextAreaFieldProps) {
  const ids = useFieldIds(id, hint, error);
  return (
    <div className={cn('space-y-1.5', className)}>
      <FieldLabel htmlFor={ids.controlId} label={label} required={required} />
      <FieldHint id={ids.hintId}>{hint}</FieldHint>
      <textarea
        id={ids.controlId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={ids.describedBy}
        className={cn(controlClasses, 'min-h-32', error ? 'border-danger' : 'border-border-strong')}
        {...props}
      />
      <FieldError id={ids.errorId}>{error}</FieldError>
    </div>
  );
}

type SelectFieldProps = FieldMessages & ComponentProps<'select'>;

export function SelectField({
  label,
  hint,
  error,
  id,
  className,
  required,
  children,
  ...props
}: SelectFieldProps) {
  const ids = useFieldIds(id, hint, error);
  return (
    <div className={cn('space-y-1.5', className)}>
      <FieldLabel htmlFor={ids.controlId} label={label} required={required} />
      <FieldHint id={ids.hintId}>{hint}</FieldHint>
      <select
        id={ids.controlId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={ids.describedBy}
        className={cn(controlClasses, error ? 'border-danger' : 'border-border-strong')}
        {...props}
      >
        {children}
      </select>
      <FieldError id={ids.errorId}>{error}</FieldError>
    </div>
  );
}

type CheckboxFieldProps = FieldMessages & Omit<ComponentProps<'input'>, 'type'>;

export function CheckboxField({
  label,
  hint,
  error,
  id,
  className,
  required,
  ...props
}: CheckboxFieldProps) {
  const ids = useFieldIds(id, hint, error);
  return (
    <div className={cn('space-y-1.5', className)}>
      <div className="flex items-start gap-3">
        <input
          id={ids.controlId}
          type="checkbox"
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={ids.describedBy}
          className="mt-0.5 size-5 shrink-0 rounded border-border-strong accent-accent"
          {...props}
        />
        <FieldLabel htmlFor={ids.controlId} label={label} required={required} />
      </div>
      <div className="pl-8">
        <FieldHint id={ids.hintId}>{hint}</FieldHint>
        <FieldError id={ids.errorId}>{error}</FieldError>
      </div>
    </div>
  );
}
