import React, { ReactNode, useContext, createContext } from "react";

const HeadingContext = createContext(0);

export function useHeadingLevel(): number {
  const level = useContext(HeadingContext);

  if (level === 0) {
    return 1;
  }

  return level;
}

export function Section({ children }: { children: ReactNode }) {
  return (
    <HeadingContext.Provider value={useContext(HeadingContext) + 1}>
      {children}
    </HeadingContext.Provider>
  );
}
