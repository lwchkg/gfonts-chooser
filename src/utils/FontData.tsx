// Hide the Google API keys behind another service.
const gFontsApiUrl = "https://gfonts-web-cache.onrender.com/";

export type FontRecord = {
  axes?: { end: number; start: number; tag: string }[];
  category: string;
  family: string;
  files: Record<string, string>;
  kind: string;
  lastModified: string;
  menu: string;
  subsets: string[];
  variants: string[];
  version: string;
};

type Data = { items: FontRecord[]; kind: "webfonts#webfontList" };

let data: Promise<Data> | undefined = undefined;

export function fontFamilyFilter(family: string): string {
  // Replace space character in font name with underscore because browsers
  // cannot handle spaces properly, especially in the font name "Exo 2".
  return family.replace(/ /g, "_");
}

export function getFontData(): Promise<Data> {
  if (data === undefined) {
    data = fetch(gFontsApiUrl).then((value) => value.json());
  }
  return data;
}

export function urlStringToCSS(url: string): string {
  return `url(${url.replace(/^http:\/\//, "https://")})`;
}
