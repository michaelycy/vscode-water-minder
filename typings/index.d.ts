declare module 'cowsay' {
  export interface CowsayOptions {
    text: string;
    r?: boolean;
  }

  export function say(options: CowsayOptions): string;
  export function think(options: CowsayOptions): string;
  export function list(
    callback: (err: Error | null, files: string[]) => void
  ): Promise<string[]>;
}
