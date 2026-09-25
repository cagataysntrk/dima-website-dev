import { LegalPage, legalMetadata } from "@/lib/legal-page";

export const generateMetadata = ({ params }: PageProps<"/[locale]/legal/kvkk">) => legalMetadata("kvkk", params);

export default function KvkkPage({ params }: PageProps<"/[locale]/legal/kvkk">) {
  return <LegalPage id="kvkk" params={params} />;
}
