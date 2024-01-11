import { useEffect, useState } from "react";

import { SampleText } from "./SampleText";
import { FontRecord, fontFamilyFilter, urlStringToCSS } from "./utils/FontData";
import { type FontSizeType, twProseFontSize } from "./utils/FontSize";

const defaultAxes = {
  ital: 0,
  opsz: 16,
  slnt: 0,
  wght: 400,
  wdth: 100,
  ARRR: 10,
  YTAZ: 750,
  BLED: 0,
  BNCE: 0,
  CASL: 0,
  XTRA: 400,
  CRSV: 0.5,
  YTDE: -250,
  EHLT: 12,
  ELGR: 1,
  ELSH: 0,
  EDPT: 100,
  YTFI: 600,
  FILL: 0,
  FLAR: 0,
  GRAD: 0,
  HEXP: 0,
  INFM: 0,
  YTLC: 500,
  MONO: 0,
  MORF: 0,
  XROT: 0,
  YROT: 0,
  ZROT: 0,
  ROND: 0,
  SCAN: 0,
  SHLN: 0,
  SHRP: 0,
  SOFT: 0,
  SPAC: 0,
  XOPQ: 88,
  YOPQ: 116,
  YTUC: 725,
  YELA: 0,
  VOLM: 0,
  WONK: 0,
  YEAR: 2000,
};

const steps: Record<string, number> = {
  opsz: 0.1,
  wdth: 0.1,
  CASL: 0.01,
  CRSV: 0.1,
  ELGR: 0.1,
  ELSH: 0.1,
  FILL: 0.01,
  HEXP: 0.1,
  MONO: 0.01,
  SHLN: 0.1,
  SOFT: 0.1,
  SPAC: 0.1,
};

export function MainText({
  font,
  fontSize,
}: {
  font: FontRecord | undefined;
  fontSize: FontSizeType;
}) {
  const [axes, setAxes] = useState<Record<string, number>>(defaultAxes);

  useEffect(() => {
    if (!font) return;

    const hasWghtAxis = font.axes?.find((item) => item.tag === "wght");
    const fontFaces = Object.keys(font.files).map(
      (key) =>
        new FontFace(
          fontFamilyFilter(font.family),
          urlStringToCSS(font.files[key]),
          {
            style: key.endsWith("italic") ? "italic" : "normal",
            ...(!hasWghtAxis
              ? {
                  weight: key.match(/^\d+/)?.at(0) || "normal",
                }
              : {}),
          },
        ),
    );
    fontFaces.forEach((item) => {
      document.fonts.add(item);
    });
    return () => {
      fontFaces.forEach((item) => {
        document.fonts.delete(item);
      });
    };
  }, [font]);

  const articleClassName = `prose ${twProseFontSize[fontSize]} prose-stone max-w-none dark:prose-invert`;

  if (!font) {
    return (
      <main className="col-span-9 overflow-x-auto">
        <article className={articleClassName}>
          <SampleText />
        </article>
      </main>
    );
  }

  function onAxisChange(tag: string, value: number) {
    console.log(tag, value);
    setAxes({ ...axes, [tag]: value });
  }

  return (
    <main className="col-span-9 overflow-x-auto">
      {font.axes ? (
        <div className="mb-8">
          <h1 className="mb-4 text-xl font-bold">Variable Axes</h1>
          {font.axes.map((axis) => (
            <p className="mb-2" key={axis.tag}>
              <label>
                {axis.tag}:{" "}
                <input
                  className="align-text-bottom"
                  type="range"
                  min={axis.start}
                  max={axis.end}
                  step={steps[axis.tag] || 1}
                  value={axes[axis.tag]}
                  onChange={(e) => {
                    onAxisChange(axis.tag, parseFloat(e.target.value));
                  }}
                />{" "}
                {axes[axis.tag]}
              </label>
            </p>
          ))}
        </div>
      ) : null}

      <article
        className={articleClassName}
        style={{
          fontFamily: `${fontFamilyFilter(font.family)}, sans-serif`,
          ...(font.axes
            ? {
                fontVariationSettings: font.axes
                  .map((axis) =>
                    Object.prototype.hasOwnProperty.call(axes, axis.tag)
                      ? `"${axis.tag}" ${axes[axis.tag]}`
                      : "",
                  )
                  .filter((item) => item !== "")
                  .join(", "),
              }
            : {}),
        }}
      >
        <SampleText />
      </article>
    </main>
  );
}
