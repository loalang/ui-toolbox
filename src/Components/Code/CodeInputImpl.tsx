import React, { useRef, useLayoutEffect, useEffect } from "react";
import { useHighlightedElement } from "./useHighlight";
import { CodeContainer } from "./CodeContainer";
import { KnownLanguage } from "./KnownLanguage";
import { css } from "emotion";
import Misbehave from "misbehave";

export default function CodeInputImpl({
  value,
  onChange,
  language
}: {
  value: string;
  onChange: (value: string) => void;
  language?: KnownLanguage;
}) {
  const elementRef = useRef<HTMLElement | null>(null);
  const editorRef = useRef<Misbehave | null>(null);
  const contentRef = useRef(value);

  const update =
    language == null ? () => {} : useHighlightedElement(elementRef, language);

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useLayoutEffect(() => {
    if (elementRef.current != null) {
      elementRef.current.textContent = value;
      const misbehave = new Misbehave(elementRef.current, {
        oninput: content => {
          contentRef.current = content;
          update();
          onChangeRef.current(content);
        }
      });
      editorRef.current = misbehave;

      return () => misbehave.destroy();
    }
  }, []);

  useEffect(() => {
    if (editorRef.current != null && contentRef.current !== value) {
      contentRef.current = value;
      editorRef.current.update({
        prefix: value,
        selected: "",
        suffix: ""
      });
    }
  }, [value]);

  const lines = value.split("\n");

  if (lines.length > 1 && lines[lines.length - 1] === "") {
    lines.pop();
  }

  return (
    <div
      className={css`
        cursor: text;
      `}
    >
      <CodeContainer
        block
        lineCount={lines.length}
        ref={elementRef}
        contentEditable
      />
    </div>
  );
}
