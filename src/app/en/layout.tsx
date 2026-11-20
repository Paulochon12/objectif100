import { Root, rootMetadata } from "@/components/root";
import "../globals.css";

export const metadata = rootMetadata("en");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Root lang="en">{children}</Root>;
}
