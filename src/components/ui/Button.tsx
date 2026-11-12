import type { ComponentProps } from 'react';
import { buttonClassName, type ButtonSize, type ButtonVariant } from './button-styles';

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/** A native <button> with consistent styling. Defaults to `type="button"` to avoid accidental form submits. */
export function Button({ variant, size, className, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={buttonClassName(variant, size, className)} {...props} />;
}
