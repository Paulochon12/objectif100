import Link from "next/link";
import { LangSwitch } from "@/components/lang-switch";
import { DICT, LEGAL_PATH, localePath, type Lang } from "@/lib/i18n";

export function Brand({ lang }: { lang: Lang }) {
  return (
    <Link href={localePath(lang, "/")} className="font-display text-lg tracking-tight">
      Objectif <span className="glow-text">100%</span>
    </Link>
  );
}

export function Header({ lang }: { lang: Lang }) {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
      <Brand lang={lang} />
      <div className="flex items-center gap-2 sm:gap-3">
        <LangSwitch lang={lang} />
        <Link href={localePath(lang, "/suivi/histoire")} className="btn-primary hidden whitespace-nowrap sm:inline-flex">
          {DICT[lang].myProgress}
        </Link>
      </div>
    </header>
  );
}

export function Footer({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  return (
    <footer className="mt-16 border-t border-edge px-4 py-8 text-center text-xs text-dim">
      <p className="mx-auto max-w-2xl">{t.disclaimer}</p>
      <p className="mt-3">
        <Link href={LEGAL_PATH[lang]} className="underline hover:text-text">{t.legal}</Link>
      </p>
    </footer>
  );
}
