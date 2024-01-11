export const twProseFontSize = {
  sm: "prose-sm",
  base: "prose-base",
  lg: "prose-lg",
  xl: "prose-xl",
  "2xl": "prose-2xl",
};
Object.freeze(twProseFontSize);

export type FontSizeType = keyof typeof twProseFontSize;

export const fontSizes: FontSizeType[] = ["sm", "base", "lg", "xl", "2xl"];
Object.freeze(fontSizes);
