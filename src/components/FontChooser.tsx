import { Suspense, useEffect, useState } from "react";

import {
  FontRecord,
  fontFamilyFilter,
  getFontData,
  urlStringToCSS,
} from "utils/FontData";
import { reactPromise } from "utils/reactPromise";

function getMenuFontFamily(family: string): string {
  return "Menu-" + fontFamilyFilter(family);
}

function FontChooserInner({
  category,
  setFont,
  variableFontsOnly,
}: {
  category: string;
  setFont: React.Dispatch<React.SetStateAction<FontRecord | undefined>>;
  variableFontsOnly: boolean;
}) {
  const data = reactPromise(getFontData()).items;

  useEffect(() => {
    const fonts = data
      .filter((item) => !item.family.startsWith("Material"))
      .map(
        // Do not escape family name.
        (item) =>
          new FontFace(
            getMenuFontFamily(item.family),
            urlStringToCSS(item.menu),
            {},
          ),
      );

    let cancelled = false;

    (async () => {
      for (const [index, font] of fonts.entries()) {
        if (cancelled) break;

        document.fonts.add(font);
        // Execute code in queue every 10 iterations to avoid blocking the UI.
        if ((index + 1) % 10 == 0) {
          await new Promise((resolve) => setTimeout(resolve));
        }
      }
    })();

    return () => {
      cancelled = true;
      fonts.forEach((item) => {
        document.fonts.delete(item);
      });
    };
  }, [data]);

  function handleClick(
    event: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
  ): void {
    const fontName = event.currentTarget.innerText;
    const fontEntry = data.find((item) => item.family === fontName);
    if (!fontEntry) throw new Error("Cannot find the font.");
    setFont(fontEntry);
  }

  const filtered = data.filter(
    (font) =>
      (!variableFontsOnly || font.axes) &&
      (category === "all" || category === font.category),
  );

  return (
    <>
      {filtered.map((item) => (
        <p
          key={item.family}
          className="cursor-default text-stone-700 hover:bg-stone-200 hover:text-black dark:text-stone-300 dark:hover:bg-stone-600 dark:hover:text-white"
          style={{
            fontFamily: `${getMenuFontFamily(item.family)}, sans-serif`,
          }}
          onClick={handleClick}
        >
          {item.family}
        </p>
      ))}
    </>
  );
}

export function FontChooser({
  setFont,
}: {
  setFont: React.Dispatch<React.SetStateAction<FontRecord | undefined>>;
}) {
  const [variableFontsOnly, setVariableFontsOnly] = useState(true);
  const [category, setCategory] = useState("all");

  function variableFontsOnlyChangeHandler(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setVariableFontsOnly(event.target.checked);
  }

  function categoryChangeHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    setCategory(event.target.value);
  }

  return (
    <>
      <div className="mb-4">
        <label>
          <input
            type="checkbox"
            className="accent-orange-500"
            checked={variableFontsOnly}
            onChange={variableFontsOnlyChangeHandler}
          />{" "}
          Variable Fonts only
        </label>
      </div>
      <div className="mb-4">
        Category:{" "}
        <select onChange={categoryChangeHandler}>
          <option value="all">All fonts</option>
          <option value="sans-serif">Sans-Serif</option>
          <option value="serif">Serif</option>
          <option value="monospace">Monospace</option>
          <option value="handwriting">Handwriting</option>
          <option value="display">Display</option>
        </select>
      </div>
      <Suspense fallback={<p>Loading font list...</p>}>
        <FontChooserInner
          setFont={setFont}
          variableFontsOnly={variableFontsOnly}
          category={category}
        />
      </Suspense>
    </>
  );
}
