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
  ChevronRight,
  Link2,
  ArrowForward,
  FileText,
  FileTextOutline,
  Person,
  PersonOutline,
  Edit,
  EditOutline,
  Code,
  CodeOutline,
  LogOut
} = toReactComponent(
  "./eva/{bulb,bulb-outline,heart,heart-outline,sun,sun-outline,chevron-right,link-2,arrow-forward,file-text-outline,file-text,person,person-outline,edit,edit-outline,code,code-outline,log-out}.svg",
  {
    icon: true,
    replaceAttrValues: ["#000000=currentColor"],
    svgo: process.env.NODE_ENV === "production"
  }
);

export const Icon = {
  Bulb: makeIconComponent("bulb", Bulb, BulbOutline),
  Heart: makeIconComponent("heart", Heart, HeartOutline),
  Sun: makeIconComponent("sun", Sun, SunOutline),
  ChevronRight: makeIconComponent("chevron-right", ChevronRight, ChevronRight),
  Link: makeIconComponent("link", Link2, Link2),
  ArrowForward: makeIconComponent("arrow-forward", ArrowForward, ArrowForward),
  FileText: makeIconComponent("file-text", FileText, FileTextOutline),
  Person: makeIconComponent("person", Person, PersonOutline),
  Edit: makeIconComponent("edit", Edit, EditOutline),
  Code: makeIconComponent("code", Code, CodeOutline),
  LogOut: makeIconComponent("log-out", LogOut, LogOut)
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
