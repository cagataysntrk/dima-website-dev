import { LegalPage, legalMetadata } from "@/lib/legal-page";

export const generateMetadata = ({ params }: PageProps<"/[locale]/legal/kullanim-kosullari">) => legalMetadata("terms", params);

export default function TermsPage({ params }: PageProps<"/[locale]/legal/kullanim-kosullari">) {
  return <LegalPage id="terms" params={params} />;
}
