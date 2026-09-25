import { LegalPage, legalMetadata } from "@/lib/legal-page";

export const generateMetadata = ({ params }: PageProps<"/[locale]/legal/cerez-politikasi">) => legalMetadata("cookies", params);

export default function CookiePolicyPage({ params }: PageProps<"/[locale]/legal/cerez-politikasi">) {
  return <LegalPage id="cookies" params={params} />;
}
