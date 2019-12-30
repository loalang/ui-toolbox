import React from "react";
import { theme, useMenus, Link, ComponentsProvider } from "docz";
import { Reset } from "../../../src/Components/Reset";
import { Heading } from "../../../src/Components/Typography/Heading";
import { PageHeading } from "../../../src/Components/Typography/TextStyle/PageHeading";
import { SectionHeading } from "../../../src/Components/Typography/TextStyle/SectionHeading";
import { Body } from "../../../src/Components/Typography/TextStyle/Body";
import { Code } from "../../../src/Components/Code/Code";
import { css } from "emotion";

function withMargin(margin) {
  return Component => props => (
    <div
      style={{
        margin:
          typeof margin === "number"
            ? `${margin}px 0`
            : `${margin.top}px 0 ${margin.bottom}px`
      }}
    >
      <Component {...props} />
    </div>
  );
}

function Theme({ children }) {
  return (
    <Reset>
      <React.Suspense fallback="Loading...">
        <ComponentsProvider
          components={{
            h1: withMargin({ top: 40, bottom: 20 })(p => (
              <Heading level={1}>
                <PageHeading {...p} />
              </Heading>
            )),
            h2: withMargin(20)(p => (
              <Heading level={2}>
                <SectionHeading {...p} />
              </Heading>
            )),
            h3: withMargin(10)(p => (
              <Heading level={3}>
                <SectionHeading {...p} />
              </Heading>
            )),
            p: withMargin(10)(Body),
            code: Code
          }}
        >
          <div
            className={css`
              width: 100%;
              display: flex;
            `}
          >
            <div
              className={css`
                flex: 0 0 200px;
              `}
            >
              <Menu />
            </div>
            <div
              className={css`
                flex: 1 1 calc(100% - 200px);
                padding: 20px;
                width: 100%;
              `}
            >
              {children}
            </div>
          </div>
        </ComponentsProvider>
      </React.Suspense>
    </Reset>
  );
}

function Menu() {
  const menus = useMenus();

  return (
    <ul>
      {menus.map(menu => (
        <li key={menu.id}>
          <Link to={menu.route}>{menu.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default theme()(Theme);
