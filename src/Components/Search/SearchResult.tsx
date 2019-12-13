import React from "react";
import { css } from "emotion";
import { ItemHeading } from "../Typography/TextStyle/ItemHeading";
import { Label } from "../Typography/TextStyle/Label";
import { Basic } from "../Typography/TextStyle/Basic";

export interface SearchItem {
  name: string;
  description?: string;
  label?: string;
  highlights?: string[];
}

export function SearchResult<T extends SearchItem>({
  item,
  onClick,
  isSelected = false
}: {
  item: T;
  onClick: (item: T) => void;
  isSelected?: boolean;
}) {
  const { highlights = [] } = item;

  return (
    <button
      className={css`
        display: block;
        width: 100%;
        text-align: left;
        padding: 4px 7px;

        &:focus {
          outline: 0;
        }

        ${isSelected
          ? `
            background: #1111ff;
            color: #fff;
          `
          : undefined}
      `}
      onClick={() => onClick(item)}
    >
      <ItemHeading>
        <Highlight text={item.name} highlights={highlights} />
      </ItemHeading>
      {item.description && (
        <p>
          <Basic>
            {item.label && (
              <span
                className={css`
                  display: inline-block;
                  margin-right: 2px;
                `}
              >
                <Label>
                  <Highlight text={item.label} highlights={highlights} />
                </Label>
              </span>
            )}
            <Highlight text={item.description} highlights={highlights} />
          </Basic>
        </p>
      )}
    </button>
  );
}

function Highlight({
  highlights,
  text
}: {
  highlights: string[];
  text: string;
}) {
  if (highlights.length === 0) {
    return <>{text}</>;
  }

  const sortedHighlights = highlights
    .map(h => h.toLowerCase())
    .sort((a, b) => a.length - b.length);

  let rest = text;
  const parts: { text: string; highlighted: boolean }[] = [];

  parts: while (rest.length > 0) {
    const lcRest = rest.toLowerCase();
    for (const highlight of sortedHighlights) {
      if (highlight === "") {
        continue;
      }
      if (lcRest.startsWith(highlight)) {
        parts.push({
          text: rest.slice(0, highlight.length),
          highlighted: true
        });
        rest = rest.slice(highlight.length);
        continue parts;
      }
    }
    if (parts.length === 0 || parts[parts.length - 1].highlighted) {
      parts.push({ text: "", highlighted: false });
    }
    parts[parts.length - 1].text += rest[0];
    rest = rest.slice(1);
  }

  return (
    <>
      {parts.map(({ text, highlighted }, i) => {
        if (highlighted) {
          return (
            <em
              key={i}
              className={css`
                background: #fdea0c;
                color: #000;
                border-radius: 3px;
              `}
            >
              {text}
            </em>
          );
        } else {
          return text;
        }
      })}
    </>
  );
}
