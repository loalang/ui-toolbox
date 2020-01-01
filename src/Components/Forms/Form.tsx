import React, { ReactNode, createContext, useContext } from "react";
import { css } from "emotion";
import { Label } from "../Typography/TextStyle/Label";
import { Basic } from "../Typography/TextStyle/Basic";

export type FormErrors<T> =
  | { [K in keyof T]?: FormErrors<T> }
  | (string | undefined | null)[];

interface FormContextValue<T, P = any> {
  parent: FormContextValue<P> | null;
  value: T;
  onChange: (value: T) => void;
  errors: FormErrors<T>;
}

export interface InputProps<T, K extends keyof T> {
  value: T[K];
  onChange(value: T[K]): void;
  errors: FormErrors<T[K]>;
}

const FormContext = createContext<FormContextValue<any> | null>(null);

export function useInput<T, K extends keyof T>(field: K): InputProps<T, K> {
  const form: FormContextValue<T, any> | null = useContext(FormContext);

  if (form == null) {
    throw new Error("Using Form.Input outside of a Form is not allowed.");
  }

  const { value, onChange, errors } = form;

  return {
    value: value[field],
    onChange: fv =>
      onChange({
        ...value,
        [field]: fv
      }),
    errors:
      !Array.isArray(errors) && errors[field] != null
        ? (errors[field] as FormErrors<T[K]>)
        : []
  };
}

export function Form<T>({
  children,
  value,
  onChange,
  onSubmit,
  errors = {}
}: {
  children: ReactNode;
  value: T;
  onChange: (value: T) => void;
  onSubmit?: (value: T) => void;
  errors?: FormErrors<T>;
}) {
  const parent = useContext(FormContext);

  const content = (
    <FormContext.Provider
      value={{
        parent,
        value,
        onChange,
        errors
      }}
    >
      {children}
    </FormContext.Provider>
  );

  if (parent != null) {
    if (onSubmit != null) {
      throw new Error("Cannot use `onSubmit` prop on inner form.");
    }
    return <div>{content}</div>;
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        if (onSubmit != null) {
          onSubmit(value);
        }
      }}
    >
      {content}
    </form>
  );
}

Form.Input = function Input<T, K extends keyof T>({
  field,
  children
}: {
  field: K;
  children: (p: InputProps<T, K>) => ReactNode;
}) {
  return <label>{children(useInput<T, K>(field))}</label>;
};

Form.Errors = function Errors<T>({
  errors,
  children
}: {
  errors: FormErrors<T>;
  children?: ReactNode;
}) {
  const paddedChildren = (
    <div
      className={css`
        margin-bottom: 3px;
      `}
    >
      {children}
    </div>
  );

  if (Array.isArray(errors)) {
    if (errors.filter(Boolean).length === 0) {
      return <>{children}</>;
    }

    return (
      <>
        {children == null ? null : paddedChildren}
        <ErrorList errors={errors} />
      </>
    );
  }

  const errorItems = (Object.keys(errors) as (keyof T)[])
    .filter(k => errors.hasOwnProperty(k))
    .filter(
      k =>
        !(
          Array.isArray(errors[k]) &&
          (errors[k] as any[]).filter(Boolean).length === 0
        )
    )
    .map(k => (
      <React.Fragment key={k.toString()}>
        <dt
          className={css`
            color: #ff0048;
            margin-bottom: 2px;
          `}
        >
          <Label>{k.toString().replace(/([A-Z]+)/g, " $1")}</Label>
        </dt>
        <dd>
          <Form.Errors errors={(errors[k] as FormErrors<T[typeof k]>) || []} />
        </dd>
      </React.Fragment>
    ));

  if (errorItems.length === 0) {
    return <>{children}</>;
  }

  return (
    <>
      {children == null ? null : paddedChildren}
      <dl>{errorItems}</dl>
    </>
  );
};

function ErrorList({
  errors: unfilteredErrors
}: {
  errors: (string | null | undefined)[];
}) {
  const errors = unfilteredErrors.filter(Boolean) as string[];
  const padding = 15;

  return (
    <ul
      className={css`
        padding-left: ${padding}px;
      `}
    >
      {errors.map((e, i) => (
        <li
          key={i}
          className={css`
            color: #ff0048;

            &::before {
              content: "×";
              margin-left: -${padding}px;
              position: absolute;
            }
          `}
        >
          <Basic>{e}</Basic>
        </li>
      ))}
    </ul>
  );
}
