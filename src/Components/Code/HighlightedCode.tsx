import React from "react";
import { KnownLanguage } from "./KnownLanguage";
import { useHighlight } from "./useHighlight";

/** @internal */
export default function HighlightedCode({
  children,
  language
}: {
  children: string;
  language: KnownLanguage;
}) {
  const html = useHighlight(children, language);

  return (
    <span
      dangerouslySetInnerHTML={{
        __html: html
      }}
    />
  );
}
