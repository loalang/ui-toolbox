import { KnownLanguage } from "./KnownLanguage";
import {
  useDebugValue,
  useEffect,
  useLayoutEffect,
  MutableRefObject
} from "react";
import * as hljsTypes from "highlight.js";

const hljs: typeof hljsTypes = require("highlight.js/lib");

type Language = (hljs?: hljsTypes.HLJSStatic) => hljsTypes.IModeBase;

const languageJavaScript: Language = require("highlight.js/lib/languages/javascript");
const languageJSON: Language = require("highlight.js/lib/languages/json");
const languageJava: Language = require("highlight.js/lib/languages/java");
const languageShell: Language = require("highlight.js/lib/languages/bash");

hljs.registerLanguage("javascript", languageJavaScript);
hljs.registerLanguage("json", languageJSON);
hljs.registerLanguage("java", languageJava);
hljs.registerLanguage("shell", languageShell);
hljs.registerLanguage("loa", languageLoa);

const uid = Math.floor(Math.random() * 10 ** 8).toString(36);
const prefix = `hlcode-${uid}-`;

hljs.configure({
  classPrefix: prefix
});

const styles =
  typeof document === "object" ? document.createElement("style") : ({} as any);

styles.innerHTML = `
.${prefix}keyword {
  color: #1111ff;
}
.${prefix}type, .${prefix}name, .${prefix}built_in, .${prefix}title {
  color: #ff0048;
}
.${prefix}literal {}
.${prefix}number {
  color: #a963ef;
}
.${prefix}regexp {}
.${prefix}string {
  color: #44b471;
}
.${prefix}subst {}
.${prefix}symbol {}
.${prefix}class {}
.${prefix}function {}
.${prefix}params {}
.${prefix}attr, .${prefix}variable {
  font-style: italic;
}
`;

let highlightDependents = 0;

function useHighlightStyling() {
  useEffect(() => {
    if (highlightDependents === 0) {
      document.body.appendChild(styles);
    }
    highlightDependents++;
    return () => {
      highlightDependents--;

      if (highlightDependents === 0) {
        document.body.removeChild(styles);
      }
    };
  });
}

export function useHighlightedElement(
  ref: MutableRefObject<HTMLElement | null>,
  language: KnownLanguage
): () => void {
  useHighlightStyling();

  useDebugValue(language);

  useLayoutEffect(update, []);

  function update() {
    if (ref.current != null) {
      ref.current.classList.add(language);
      hljs.highlightBlock(ref.current);
    }
  }

  return update;
}

export function useHighlight(code: string, language: KnownLanguage): string {
  useHighlightStyling();

  useDebugValue(language);

  return hljs.highlight(language, code).value;
}

function languageLoa(hljs?: hljsTypes.HLJSStatic): hljsTypes.IMode {
  return {
    keywords:
      "as in is out inout class private public namespace self import export partial let native"
  };
}
