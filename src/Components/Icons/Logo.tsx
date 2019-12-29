import { css } from "emotion";

const toReactComponent = require("svgr.macro");

const LogoSVG = toReactComponent("./Logo.svg", {
  icon: true,
  svgo: process.env.NODE_ENV === "production"
});

export function Logo({ size = "1em" }: { size?: string | number }) {
  const sizeCss = typeof size === "string" ? size : `${size}px`;

  return (
    <div
      className={css`
        width: ${sizeCss};
        height: ${sizeCss};

        svg {
          width: ${sizeCss};
          height: ${sizeCss};
        }
      `}
    >
      <LogoSVG />
    </div>
  );
}
