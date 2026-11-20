import { LegalPage, legalMetadata } from "@/components/pages";

export const metadata = legalMetadata("fr");

export default function Page() {
  return <LegalPage lang="fr" />;
}
