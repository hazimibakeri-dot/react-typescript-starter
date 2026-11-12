import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  eyebrow?: string;
  children?: ReactNode;
}

/** Consistent page title block. Each page renders exactly one <h1>. */
export function PageHeader({ title, eyebrow, children }: PageHeaderProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <p className="text-sm font-semibold tracking-wide text-accent uppercase">{eyebrow}</p>
      )}
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-balance sm:text-4xl">{title}</h1>
      {children && <div className="mt-4 text-lg text-pretty text-muted">{children}</div>}
    </div>
  );
}
