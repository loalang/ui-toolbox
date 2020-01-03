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
  LogOut,
  Plus,
  Trash2,
  Trash2Outline
} = toReactComponent(
  "./eva/{bulb,bulb-outline,heart,heart-outline,sun,sun-outline,chevron-right,link-2,arrow-forward,file-text-outline,file-text,person,person-outline,edit,edit-outline,code,code-outline,log-out,plus,trash-2,trash-2-outline}.svg",
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
  ChevronDown: makeIconComponent(
    "chevron-down",
    ChevronRight,
    ChevronRight,
    90
  ),
  ChevronLeft: makeIconComponent(
    "chevron-left",
    ChevronRight,
    ChevronRight,
    180
  ),
  ChevronUp: makeIconComponent("chevron-up", ChevronRight, ChevronRight, 270),
  Link: makeIconComponent("link", Link2, Link2),
  ArrowRight: makeIconComponent("arrow-right", ArrowForward, ArrowForward),
  ArrowDown: makeIconComponent("arrow-down", ArrowForward, ArrowForward, 90),
  ArrowLeft: makeIconComponent("arrow-left", ArrowForward, ArrowForward, 180),
  ArrowUp: makeIconComponent("arrow-up", ArrowForward, ArrowForward, 270),
  FileText: makeIconComponent("file-text", FileText, FileTextOutline),
  Person: makeIconComponent("person", Person, PersonOutline),
  Edit: makeIconComponent("edit", Edit, EditOutline),
  Code: makeIconComponent("code", Code, CodeOutline),
  LogOut: makeIconComponent("log-out", LogOut, LogOut),
  Plus: makeIconComponent("plus", Plus, Plus),
  Trash: makeIconComponent("trash", Trash2, Trash2Outline)
};

export interface IconProps {
  filled?: boolean;
}

function makeIconComponent(
  name: string,
  FilledComponent: () => ReactElement,
  OutlineComponent: () => ReactElement,
  rotation: number = 0
): (props: IconProps) => ReactElement {
  function Component({ filled = false }: IconProps) {
    const Component = filled ? FilledComponent : OutlineComponent;

    return (
      <div
        className={css`
          display: inline-block;
          vertical-align: middle;
          transform: rotate(${rotation}deg);

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
