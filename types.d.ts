// type for react-inline-svg
declare module '*.svg' {
  const content: any;
  export default content;
}

// copy rest of types from https://github.com/twopluszero/next-images/blob/master/index.d.ts
declare module "*.jpeg" {
  const value: string;
  export = value;
}

declare module "*.jpg" {
  const value: string;
  export = value;
}

declare module "*.png" {
  const value: string;
  export = value;
}

declare module "*.gif" {
  const value: string;
  export = value;
}

declare module "*.ico" {
  const value: string;
  export = value;
}

declare module "*.webp" {
  const value: string;
  export = value;
}

declare module "*.jp2" {
  const value: string;
  export = value;
}

declare module "*.avif" {
  const value: string;
  export = value;
}