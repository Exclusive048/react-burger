export type TCategoryRef = {
  ref: (node: Element | null | undefined) => void;
};

export type TCategoryRefMap = {
  [name: string]: TCategoryRef;
};