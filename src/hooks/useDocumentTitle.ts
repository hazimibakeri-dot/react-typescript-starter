import { useEffect } from 'react';
import { APP_NAME } from '../config';

/** Sets `document.title` to "<title> · <app name>", or just the app name when no title is given. */
export function useDocumentTitle(title?: string): void {
  useEffect(() => {
    document.title = title ? `${title} · ${APP_NAME}` : APP_NAME;
  }, [title]);
}
