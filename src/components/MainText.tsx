import Slider from "@mui/joy/Slider";
import { useEffect, useState } from "react";

import { FontRecord, fontFamilyFilter, urlStringToCSS } from "utils/FontData";
import { type FontSizeType, twProseFontSize } from "utils/FontSize";

import { SampleText } from "./SampleText";

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

  const wghtAxis = font?.axes?.find((item) => item.tag === "wght");

  useEffect(() => {
    if (!font) return;

    const fontFaces = Object.keys(font.files).map(
      (key) =>
        new FontFace(
          fontFamilyFilter(font.family),
          urlStringToCSS(font.files[key]),
          {
            style: key.endsWith("italic") ? "italic" : "normal",
            weight: wghtAxis
              ? [wghtAxis.start, wghtAxis.end].join(" ")
              : key.match(/^\d+/)?.at(0) || "normal",
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
  }, [font, wghtAxis]);

  const articleClassName = `prose ${twProseFontSize[fontSize]} max-w-none dark:prose-invert`;

  if (!font) {
    return (
      <main className="col-span-9 overflow-x-auto">
        <article className={articleClassName}>
          <SampleText boldWeight={700} />
        </article>
      </main>
    );
  }

  function onAxisChange(tag: string, value: number) {
    setAxes({ ...axes, [tag]: value });
  }

  const weight = axes["wght"];
  let weights: number[] = [];

  if (!wghtAxis) {
    const weightsSet = new Set<number>();
    font.variants.forEach((variant) => {
      variant = variant.replace("italic", "");
      if (["", "regular"].includes(variant)) {
        weightsSet.add(400);
      } else {
        weightsSet.add(parseInt(variant));
      }
    });
    weights = [...weightsSet.keys()];
    weights.sort((a, b) => a - b);
    console.log(weights);
  }
  const boldWeight = Math.min(weight + 300, 900);

  return (
    <main className="col-span-9 overflow-x-auto">
      {font.axes ? (
        <div className="mb-8">
          <h1 className="mb-3 text-xl font-bold">Variable Axes</h1>
          {font.axes.map((axis) => (
            <p className="mb-2" key={axis.tag}>
              <label className="flex h-12 flex-row">
                <span className="mr-5 mt-[.75em] inline-block w-14 text-right">
                  {axis.tag}:
                </span>
                <Slider
                  slotProps={{
                    // Styles are set to override JoyUI defaults.
                    root: {
                      style: { width: "15em" },
                    },
                    markLabel: {
                      className: "opacity-70",
                      style: { color: "unset" },
                    },
                  }}
                  name={axis.tag}
                  min={axis.start}
                  max={axis.end}
                  defaultValue={axes[axis.tag]}
                  getAriaValueText={toString}
                  step={steps[axis.tag] || 1}
                  marks={[
                    { label: axis.start, value: axis.start },
                    { label: axis.end, value: axis.end },
                  ]}
                  onChange={(_event, value) => {
                    onAxisChange(axis.tag, value as number);
                  }}
                />{" "}
                <span className="ml-5 mt-[.75em]">{axes[axis.tag]}</span>
              </label>
            </p>
          ))}
        </div>
      ) : null}

      {!wghtAxis && weights.length > 1 && (
        <>
          <h1 className="mb-3 text-xl font-bold">Font weight</h1>
          <p className="mb-2" key="weight">
            <label className="flex h-12 flex-row">
              <span className="mr-5 mt-[.75em] inline-block w-14 text-right">
                weight:
              </span>
              <Slider
                slotProps={{
                  // Styles are set to override JoyUI defaults.
                  root: {
                    style: { width: "15em" },
                  },
                  markLabel: {
                    className: "opacity-70",
                    style: { color: "unset" },
                  },
                }}
                name="weight"
                min={weights[0]}
                max={weights[weights.length - 1]}
                defaultValue={weight}
                getAriaValueText={toString}
                step={null}
                marks={weights.map((w) => ({ label: w, value: w }))}
                onChange={(_event, value) => {
                  onAxisChange("wght", value as number);
                }}
              />
              <span className="ml-5 mt-[.75em]">{axes.wght}</span>
            </label>
          </p>
        </>
      )}

      <article
        className={articleClassName}
        style={{
          fontFamily: `${fontFamilyFilter(font.family)}, sans-serif`,
          fontWeight: weight,
          ...(font.axes
            ? {
                fontVariationSettings: font.axes
                  .filter((item) => item.tag !== "wght")
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
        <SampleText boldWeight={boldWeight} />
      </article>
    </main>
  );
}
