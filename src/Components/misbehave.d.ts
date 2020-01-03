declare module "misbehave" {
  class Misbehave {
    constructor(element: HTMLElement, opts?: Misbehave.MisbehaveOptions);

    destroy(): void;

    update(content: { prefix: string; selected: string; suffix: string }): void;
  }

  namespace Misbehave {
    export interface MisbehaveOptions {
      oninput?: (textContent: string) => void;
    }
  }

  export = Misbehave;
}
