import type { Metadata } from "next";
import { CategoryPage, categoryMetadata } from "@/components/pages";
import { CATEGORY_IDS } from "@/data/checklist";

export function generateStaticParams() {
  return CATEGORY_IDS.map((categorie) => ({ categorie }));
}

export async function generateMetadata(props: PageProps<"/en/suivi/[categorie]">): Promise<Metadata> {
  const { categorie } = await props.params;
  return categoryMetadata("en", categorie);
}

export default async function Page(props: PageProps<"/en/suivi/[categorie]">) {
  const { categorie } = await props.params;
  return <CategoryPage lang="en" id={categorie} />;
}
