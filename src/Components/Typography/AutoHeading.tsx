import React, { ReactNode, ReactElement } from "react";
import { useHeadingLevel } from "./Section";
import { Heading } from "./Heading";
import { SectionHeading } from "./TextStyle/SectionHeading";
import { PageHeading } from "./TextStyle/PageHeading";
import { HeroHeading } from "./TextStyle/HeroHeading";

export function AutoHeading({ children }: { children: ReactNode }) {
  const currentLevel = useHeadingLevel();

  let heading: ReactElement;
  switch (currentLevel) {
    case 1:
      heading = <HeroHeading>{children}</HeroHeading>;
      break;

    case 2:
      heading = <PageHeading>{children}</PageHeading>;
      break;

    case 3:
    default:
      heading = <SectionHeading>{children}</SectionHeading>;
      break;
  }

  return <Heading>{heading}</Heading>;
}
