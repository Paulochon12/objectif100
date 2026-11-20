import { LegalPage, legalMetadata } from "@/components/pages";

export const metadata = legalMetadata("en");

export default function Page() {
  return <LegalPage lang="en" />;
}
