declare module "misbehave" {
  export interface MisbehaveOptions {
    oninput?: (textContent: string) => void;
  }

  export default class Misbehave {
    constructor(element: HTMLElement, opts?: MisbehaveOptions);

    update(content: string): void;
  }
}
