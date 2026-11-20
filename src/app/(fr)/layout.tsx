import { Root, rootMetadata } from "@/components/root";
import "../globals.css";

export const metadata = rootMetadata("fr");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Root lang="fr">{children}</Root>;
}
