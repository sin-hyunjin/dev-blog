declare module "gray-matter" {
  interface GrayMatterFile<T = string> {
    data: T;
    content: string;
    excerpt?: string;
    orig: string;
    language: string;
    matter: string;
    stringify(): string;
  }

  interface Options {
    excerpt?: boolean | ((file: string, options: Options) => string);
    excerpt_separator?: string;
    engines?: Record<string, (input: string) => unknown>;
    language?: string;
    delimiters?: string | [string, string];
  }

  function matter(content: string | Buffer, options?: Options): GrayMatterFile;

  export = matter;
}
