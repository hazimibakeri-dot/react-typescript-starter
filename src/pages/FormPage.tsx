import { Container } from '../components/layout/Container';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { ContactForm } from '../features/contact/ContactForm';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function FormPage() {
  useDocumentTitle('Form example');

  return (
    <Container className="py-12 sm:py-16">
      <PageHeader eyebrow="Example" title="Form validation">
        <p>
          A contact form with client-side validation. Submit it empty to see the error summary, then
          fix each field. This demo does not send any data.
        </p>
      </PageHeader>
      <Card className="mt-10 max-w-3xl">
        <ContactForm />
      </Card>
    </Container>
  );
}
