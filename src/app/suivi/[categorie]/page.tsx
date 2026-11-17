import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer, Header } from "@/components/site";
import { Tracker } from "@/components/tracker";
import { CATEGORIES } from "@/data/checklist";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ categorie: c.id }));
}

export async function generateMetadata(props: PageProps<"/suivi/[categorie]">): Promise<Metadata> {
  const { categorie } = await props.params;
  const c = CATEGORIES.find((x) => x.id === categorie);
  if (!c) return {};
  return {
    title: { absolute: c.seoTitle },
    description: c.seoDescription,
    alternates: { canonical: `/suivi/${c.id}` },
    openGraph: { title: c.seoTitle, description: c.seoDescription, url: `/suivi/${c.id}`, images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
  };
}

export default async function CategoryPage(props: PageProps<"/suivi/[categorie]">) {
  const { categorie } = await props.params;
  const c = CATEGORIES.find((x) => x.id === categorie);
  if (!c) notFound();

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6">
        <h1 className="font-display text-xl sm:text-2xl">{c.seoTitle.replace(/ ?\(.*\)$/, "").replace(/ ?:.*$/, "")}</h1>
        <p className="mb-6 mt-2 max-w-2xl text-sm text-dim">{c.seoDescription}</p>
        <Tracker active={c.id} />
      </main>
      <Footer />
    </>
  );
}
