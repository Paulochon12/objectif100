import type { Metadata } from "next";
import { CategoryPage, categoryMetadata } from "@/components/pages";
import { CATEGORY_IDS } from "@/data/checklist";

export function generateStaticParams() {
  return CATEGORY_IDS.map((categorie) => ({ categorie }));
}

export async function generateMetadata(props: PageProps<"/suivi/[categorie]">): Promise<Metadata> {
  const { categorie } = await props.params;
  return categoryMetadata("fr", categorie);
}

export default async function Page(props: PageProps<"/suivi/[categorie]">) {
  const { categorie } = await props.params;
  return <CategoryPage lang="fr" id={categorie} />;
}
