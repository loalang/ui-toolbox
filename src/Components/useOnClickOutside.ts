import { useRef, useEffect, RefObject } from "react";

export function useOnClickOutside(
  onClickOutside: () => void
): [RefObject<HTMLDivElement>] {
  const ref = useRef<HTMLDivElement>(undefined!);
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (
        ref.current != null &&
        event.target != null &&
        !ref.current.contains(event.target as Element)
      ) {
        onClickOutside();
      }
    }
    document.documentElement.addEventListener("click", onClick);
    return () => document.documentElement.removeEventListener("click", onClick);
  }, []);
  return [ref];
}
