import React from "react";
import { SearchResult, SearchItem } from "./SearchResult";
import { css } from "emotion";

export function SearchResultList<
  T extends { id: string | number } & SearchItem
>({
  items,
  onClick,
  selectedIndex
}: {
  items: T[];
  onClick: (item: T) => void;
  selectedIndex?: number;
}) {
  return (
    <ol>
      {items.map((item, index) => (
        <li
          key={item.id}
          className={css`
            border-top: 1px solid
              ${selectedIndex === index || selectedIndex === index - 1
                ? "#1111ff"
                : "#f1f1f1"};

            &:first-child {
              border-top: 0;
            }
          `}
        >
          <SearchResult
            isSelected={selectedIndex === index}
            item={item}
            onClick={() => onClick(item)}
          />
        </li>
      ))}
    </ol>
  );
}
