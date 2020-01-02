import React, { ReactNode, createContext, useContext } from "react";
import { css } from "emotion";
import { Label } from "../Typography/TextStyle/Label";
import { Basic } from "../Typography/TextStyle/Basic";

export type FormErrors<T> =
  | { [K in keyof T]?: FormErrors<T[K]> }
  | (string | undefined | null)[];

interface FormContextValue<T, P = any> {
  parent: FormContextValue<P> | null;
  value: T;
  onChange: (value: T) => void;
  errors: FormErrors<T>;
}

export interface InputProps<T> {
  value: T;
  onChange(value: T): void;
  errors: FormErrors<T>;
}

export interface ArrayProps<A extends any[]> {
  items: ArrayItemProps<A[number]>[];
  push(item: A[number]): void;
  update(index: number, value: A[number]): void;
  pop(): void;
  remove(index: number): void;
  slice(start: number, end?: number): void;
  splice(index: number, deleteCount: number, ...newItems: A[number][]): void;
  filter(
    predicate: (
      item: A[number],
      index: number,
      array: ReadonlyArray<A[number]>
    ) => boolean
  ): void;
  map(
    transform: (
      item: A[number],
      index: number,
      array: ReadonlyArray<A[number]>
    ) => A[number]
  ): void;
  flatMap(
    transform: (
      item: A[number],
      index: number,
      array: ReadonlyArray<A[number]>
    ) => A[number][]
  ): void;
}

export interface ArrayItemProps<T> extends InputProps<T> {
  index: number;
  remove(): void;
}

const FormContext = createContext<FormContextValue<any> | null>(null);

export function useInput<T, K extends keyof T>(field: K): InputProps<T[K]> {
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

Form.Input = function Input<
  T extends { [x: string]: any | any[] },
  K extends keyof ArrayFieldsOf<T>
>({
  field,
  children
}: {
  field: K;
  children: (p: InputProps<T[K][number]>) => ReactNode;
}) {
  return <label>{children(useInput<T, K>(field))}</label>;
};

type ArrayFieldsOf<T> = Pick<
  T,
  {
    [P in keyof T]: T[P] extends any[] ? P : never;
  }[keyof T]
>;

Form.Array = function FormArray<T, K extends keyof ArrayFieldsOf<T>>({
  field,
  children
}: {
  field: K;
  children: (p: ArrayProps<T[K]>) => ReactNode;
}) {
  const { value, onChange, errors } = useInput<T, K>(field);

  const items: any[] = value;

  function push(item: any) {
    onChange([...items, item] as T[K]);
  }

  function update(index: number, item: any) {
    splice(index, 1, item);
  }

  function remove(index: number) {
    splice(index, 1);
  }

  function pop() {
    slice(0, -1);
  }

  function slice(start: number, end?: number) {
    onChange(items.slice(start, end) as T[K]);
  }

  function splice(index: number, deleteCount: number, ...newItems: any[]) {
    const i = items.slice();
    i.splice(index, deleteCount, ...newItems);
    onChange(i as T[K]);
  }

  function filter(
    predicate: (item: any, index: number, array: any[]) => boolean
  ) {
    onChange(items.filter(predicate) as T[K]);
  }

  function map(transform: (item: any, index: number, array: any[]) => any) {
    onChange(items.map(transform) as T[K]);
  }

  function flatMap(
    transform: (item: any, index: number, array: any[]) => any[]
  ) {
    onChange(items.flatMap(transform) as T[K]);
  }

  return children({
    items: items.map(
      (item, index): ArrayItemProps<any> => ({
        errors: errors || [],
        index,
        value: item,
        onChange: value => update(index, value),
        remove: remove.bind(null, index)
      })
    ),
    push,
    pop,
    filter,
    map,
    flatMap,
    slice,
    splice,
    update,
    remove
  });
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
