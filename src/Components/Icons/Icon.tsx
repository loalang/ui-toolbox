import React, { ReactElement } from "react";
import { css } from "emotion";

const toReactComponent = require("svgr.macro");

const {
  Bulb,
  BulbOutline,
  Heart,
  HeartOutline,
  Sun,
  SunOutline,
  ChevronRight
} = toReactComponent(
  "./eva/{bulb,bulb-outline,heart,heart-outline,sun,sun-outline,chevron-right}.svg",
  {
    icon: true,
    replaceAttrValues: ["#000000=currentColor"],
    svgo: false
  }
);

export const Icon = {
  Bulb: makeIconComponent("bulb", Bulb, BulbOutline),
  Heart: makeIconComponent("heart", Heart, HeartOutline),
  Sun: makeIconComponent("sun", Sun, SunOutline),
  ChevronRight: makeIconComponent("chevron-right", ChevronRight, ChevronRight)
};

export interface IconProps {
  filled?: boolean;
}

function makeIconComponent(
  name: string,
  FilledComponent: () => ReactElement,
  OutlineComponent: () => ReactElement
): (props: IconProps) => ReactElement {
  function Component({ filled = false }: IconProps) {
    const Component = filled ? FilledComponent : OutlineComponent;

    return (
      <div
        className={css`
          display: inline-block;
          vertical-align: middle;

          * {
            fill: currentColor;
          }

          svg {
            display: block;
          }
        `}
      >
        <Component />
      </div>
    );
  }

  Component.displayName = `EvaIcon(${name})`;

  return Component;
}
