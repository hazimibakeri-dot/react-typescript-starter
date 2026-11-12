import { Link } from 'react-router';
import { Container } from '../components/layout/Container';
import { PageHeader } from '../components/layout/PageHeader';
import { buttonClassName } from '../components/ui/button-styles';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function NotFoundPage() {
  useDocumentTitle('Page not found');

  return (
    <Container className="py-16 sm:py-24">
      <PageHeader eyebrow="404" title="Page not found">
        <p>The page you are looking for does not exist or has moved.</p>
      </PageHeader>
      <Link to="/" className={buttonClassName('primary', 'md', 'mt-8')}>
        Go to the home page
      </Link>
    </Container>
  );
}
