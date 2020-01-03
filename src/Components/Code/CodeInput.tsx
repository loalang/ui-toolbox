import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import { useHighlightedElement } from "./useHighlight";
import { css } from "emotion";
import Misbehave from "misbehave";
import { CodeContainer } from "./CodeContainer";

export function CodeInput({
  value,
  onChange
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const elementRef = useRef<HTMLElement | null>(null);
  const editorRef = useRef<Misbehave | null>(null);
  const contentRef = useRef(value);

  const update = useHighlightedElement(elementRef, "loa");

  useLayoutEffect(() => {
    if (elementRef.current != null) {
      elementRef.current.textContent = value;
      editorRef.current = new Misbehave(elementRef.current, {
        oninput: content => {
          contentRef.current = content;
          update();
          onChange(content);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (editorRef.current != null && contentRef.current !== value) {
      editorRef.current.update(value);
    }
  }, [value]);

  const lines = value.split("\n");

  if (lines.length > 1 && lines[lines.length - 1] === "") {
    lines.pop();
  }

  return (
    <CodeContainer
      block
      lineCount={lines.length}
      ref={elementRef}
      contentEditable
    />
  );
}
