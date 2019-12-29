import React from "react";
import { SearchInput } from "./SearchInput";
import { SearchResultsDropdown } from "./SearchResultsDropdown";
import { useState, useEffect } from "react";
import { useOnClickOutside } from "../useOnClickOutside";
import { SearchItem } from "./SearchResult";

export function Search<T extends { id: number | string } & SearchItem>({
  term,
  onChange,
  results,
  onClick,
  translucent = false,
  placeholder
}: {
  term: string;
  onChange: (term: string) => void;
  results: T[];
  onClick: (item: T) => void;
  translucent?: boolean;
  placeholder?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const open = setIsOpen.bind(null, true);
  const close = setIsOpen.bind(null, false);

  useEffect(() => {
    if (!isOpen && term !== "") {
      open();
    }
  }, [term]);

  const [containerRef] = useOnClickOutside(close);
  const [selectedIndex, selectedItem, move, setIndex] = useListSelection(
    results
  );

  return (
    <div ref={containerRef}>
      <SearchInput
        placeholder={placeholder}
        translucent={translucent}
        term={term}
        onChange={(newTerm: string) => {
          setIndex(0);
          onChange(newTerm);
        }}
        onFocus={() => {
          open();
        }}
        onEnter={() => {
          if (selectedItem !== undefined) {
            onClick(selectedItem);
          }
        }}
        onUp={() => move(-1)}
        onDown={() => move(1)}
      />
      <SearchResultsDropdown
        isOpen={term !== "" && isOpen}
        onClick={onClick}
        items={results}
        selectedIndex={selectedIndex}
      />
    </div>
  );
}

function useListSelection<T>(
  items: T[]
): [number, T | undefined, (delta: number) => void, (set: number) => void] {
  const [index, setIndex] = useState(-1);

  function setClampedIndex(index: number) {
    setIndex(Math.max(0, Math.min(items.length - 1, index)));
  }

  function move(delta: number) {
    setClampedIndex(index + delta);
  }

  useEffect(() => {
    setClampedIndex(index);
  }, [items]);

  return [index, items[index], move, setClampedIndex];
}
