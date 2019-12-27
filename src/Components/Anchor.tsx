import React, { useEffect, useRef, useState } from "react";
import { Icon } from "./Icons/Icon";
import { css } from "emotion";

let HAS_HOPPED = false;

export function Anchor({
  name,
  margin = 0
}: {
  name: string;
  margin?: number | string;
}) {
  const hash = `#${name}`;
  const marginCssValue = typeof margin === "number" ? `${margin}px` : margin;

  const anchorRef = useRef(null as HTMLDivElement | null);

  useEffect(() => {
    if (!HAS_HOPPED && location.hash === hash && anchorRef.current != null) {
      HAS_HOPPED = true;
      anchorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash]);

  const [, forceUpdate] = useState({});
  useEffect(() => {
    function onNavigate() {
      forceUpdate({});
    }
    window.addEventListener("hashchange", onNavigate);
    window.addEventListener("popstate", onNavigate);
    window.addEventListener("loa::anchor-clicked", onNavigate);
    return () => {
      window.removeEventListener("hashchange", onNavigate);
      window.removeEventListener("popstate", onNavigate);
      window.removeEventListener("loa::anchor-clicked", onNavigate);
    };
  }, [hash]);

  return (
    <div>
      <div
        ref={anchorRef}
        id={name}
        className={css`
          position: relative;
          top: -${marginCssValue};
          left: -${marginCssValue};
        `}
      />

      <a
        href={hash}
        className={css`
          display: block;
          color: ${location.hash === hash ? "#1111ff" : "inherit"};
        `}
        onClick={e => {
          if (anchorRef.current != null) {
            e.preventDefault();
            anchorRef.current.scrollIntoView({ behavior: "smooth" });
            history.pushState(null, document.title, hash);
            window.dispatchEvent(new CustomEvent("loa::anchor-clicked"));
          }
        }}
      >
        <Icon.Link />
      </a>
    </div>
  );
}
