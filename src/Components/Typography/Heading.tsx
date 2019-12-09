import React, { ReactNode } from "react";
import { useHeadingLevel } from "./Section";

export function Heading({
  children,
  level: forceLevel
}: {
  children: ReactNode;
  level?: number;
}) {
  const inferredLevel = useHeadingLevel();

  const level = forceLevel != null ? forceLevel : inferredLevel;

  const Element: "h1" = `h${Math.min(level, 6)}` as any;

  return (
    <Element role="heading" aria-level={level}>
      {children}
    </Element>
  );
}
