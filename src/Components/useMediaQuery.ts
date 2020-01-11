import {
  useRef,
  useState,
  useEffect,
  MutableRefObject,
  useLayoutEffect
} from "react";
import ResizeObserver from "resize-observer-polyfill";

export function useMediaQuery(query: string) {
  const queryRef = useRef<MediaQueryList | null>(null);
  if (queryRef.current == null) {
    queryRef.current = window.matchMedia(query);
  }
  const [matches, setMatches] = useState(queryRef.current!.matches);

  useEffect(() => {
    function onChange() {
      setMatches(queryRef.current!.matches);
    }
    queryRef.current!.addListener(onChange);
    return () => queryRef.current!.removeListener(onChange);
  }, []);

  return matches;
}

export interface SizeSpec {
  minHeight?: number;
  minWidth?: number;
  maxHeight?: number;
  maxWidth?: number;
}

export function useWindowMatchesSize({
  minHeight,
  maxHeight,
  minWidth,
  maxWidth
}: SizeSpec): boolean {
  return useMediaQuery(
    [
      minHeight == null ? null : `(min-height: ${minHeight}px)`,
      minWidth == null ? null : `(min-width: ${minWidth}px)`,
      maxHeight == null ? null : `(max-height: ${maxHeight}px)`,
      maxWidth == null ? null : `(max-width: ${maxWidth}px)`
    ]
      .filter(Boolean)
      .join(" and ")
  );
}

export function useElementMatchesSize<T extends Element>(
  subject: MutableRefObject<T | null>,
  { minHeight, maxHeight, minWidth, maxWidth }: SizeSpec
): boolean {
  function getState() {
    if (subject.current == null) {
      return false;
    } else {
      return elementMatchesSize(subject.current, {
        minHeight,
        maxHeight,
        minWidth,
        maxWidth
      });
    }
  }
  const [matches, setMatches] = useState(getState());
  useLayoutEffect(() => {
    setMatches(getState());
    if (subject.current != null) {
      const element = subject.current;

      const observer = new ResizeObserver(() => {
        setMatches(getState());
      });

      observer.observe(element);
      return () => observer.unobserve(element);
    }
  }, [subject.current, minHeight, maxHeight, minWidth, maxWidth]);
  return matches;
}

function elementMatchesSize(
  element: Element,
  { minHeight, maxHeight, minWidth, maxWidth }: SizeSpec
): boolean {
  const { height, width } = element.getBoundingClientRect();

  let matches = true;

  if (minHeight != null) {
    matches == matches && height >= minHeight;
  }

  if (maxHeight != null) {
    matches == matches && height <= maxHeight;
  }

  if (minWidth != null) {
    matches == matches && width >= minWidth;
  }

  if (maxWidth != null) {
    matches == matches && width <= maxWidth;
  }

  return matches;
}
