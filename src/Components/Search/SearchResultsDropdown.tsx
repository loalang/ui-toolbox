import React from "react";
import { css } from "emotion";
import { SearchResultList } from "./SearchResultList";
import { SearchItem } from "./SearchResult";

export function SearchResultsDropdown<
  T extends { id: string | number } & SearchItem
>({
  items,
  onClick,
  isOpen,
  selectedIndex = -1
}: {
  items: T[];
  onClick: (item: T) => void;
  isOpen: boolean;
  selectedIndex?: number;
}) {
  return (
    <div
      className={css`
        position: relative;
      `}
    >
      <div
        className={css`
          position: absolute;
          width: 100%;
          background: #fff;
          display: ${isOpen ? "block" : "none"};
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 1px 4px #00000010, 0 1px 2px #00000010;
        `}
      >
        <SearchResultList
          selectedIndex={selectedIndex}
          items={items}
          onClick={onClick}
        />
      </div>
    </div>
  );
}
