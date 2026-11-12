interface SkipLinkProps {
  targetId: string;
}

/** Visually hidden until focused; lets keyboard users jump past the navigation. */
export function SkipLink({ targetId }: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only rounded-md bg-accent px-4 py-2 font-semibold text-accent-fg focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
    >
      Skip to main content
    </a>
  );
}
