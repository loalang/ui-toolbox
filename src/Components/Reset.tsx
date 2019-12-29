import React, { ReactNode } from "react";
import { css } from "emotion";

export function Reset({ children }: { children: ReactNode }) {
  return (
    <div
      className={css`
        width: 100%;
      `}
    >
      <style>{`
        @import url("https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,600&display=swap");
        @import url("https://fonts.googleapis.com/css?family=IBM+Plex+Serif:400&display=swap");
        @import url("https://fonts.googleapis.com/css?family=IBM+Plex+Mono:400&display=swap");

        div,
        span,
        applet,
        object,
        iframe,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        blockquote,
        pre,
        a,
        abbr,
        acronym,
        address,
        big,
        cite,
        code,
        del,
        dfn,
        em,
        img,
        ins,
        kbd,
        q,
        s,
        samp,
        small,
        strike,
        strong,
        sub,
        sup,
        tt,
        var,
        b,
        u,
        i,
        center,
        dl,
        dt,
        dd,
        ol,
        ul,
        li,
        fieldset,
        form,
        label,
        legend,
        table,
        caption,
        tbody,
        tfoot,
        thead,
        tr,
        th,
        td,
        article,
        aside,
        canvas,
        details,
        embed,
        figure,
        figcaption,
        footer,
        header,
        hgroup,
        menu,
        nav,
        output,
        ruby,
        section,
        summary,
        time,
        mark,
        audio,
        video,
        input,
        body,
        button,
        textarea {
          margin: 0;
          padding: 0;
          vertical-align: baseline;
          border-radius: 0;
          border: 0;
          appearance: none;
          font: inherit;
          font-size: 100%;
          line-height: 1;
          color: inherit;
          text-decoration: inherit;
          background: inherit;
          list-style: none;
        }

        body {
          font-family: "IBM Plex Sans", sans-serif;
          background: #ffffff;
          width: 100%;

          -webkit-text-size-adjust: none;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
      {children}
    </div>
  );
}
