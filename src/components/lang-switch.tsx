"use client";

import { usePathname } from "next/navigation";
import { DICT, LANGS, switchPath, type Lang } from "@/lib/i18n";

/**
 * Bouton FR | EN : ouvre la même page dans l'autre langue.
 * Lien <a> classique : chaque langue a sa propre mise en page racine, donc la page se recharge.
 */
export function LangSwitch({ lang }: { lang: Lang }) {
  const pathname = usePathname() ?? "/";
  return (
    <nav aria-label={DICT[lang].langLabel} className="flex rounded-xl border border-edge bg-night p-1 text-xs font-semibold">
      {LANGS.map((l) =>
        l === lang ? (
          <span key={l} aria-current="true" className="rounded-lg bg-panel-2 px-2.5 py-1.5 text-text">
            {l.toUpperCase()}
          </span>
        ) : (
          <a key={l} href={switchPath(pathname, l)} hrefLang={l} lang={l} className="rounded-lg px-2.5 py-1.5 text-dim hover:text-text">
            {l.toUpperCase()}
          </a>
        ),
      )}
    </nav>
  );
}
