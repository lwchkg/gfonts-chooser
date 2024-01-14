import { useState } from "react";

import { DarkModeToggle } from "components/DarkModeToggle";
import { FontChooser } from "components/FontChooser";
import { FontSizeSelector } from "components/FontSizeSelector";
import { MainText } from "components/MainText";

import { FontRecord } from "utils/FontData";
import type { FontSizeType } from "utils/FontSize";

import "./App.css";

function GetGoogleFontUrl(family: string): string {
  if (family.startsWith("Material")) {
    return "https://fonts.google.com/icons";
  }
  return "https://fonts.google.com/specimen/" + encodeURIComponent(family);
}

function HeaderText({ font }: { font: FontRecord | undefined }) {
  return (
    <h1 className="text-4xl">
      Google Font Chooser
      {font && (
        <>
          {" "}
          &ndash;{" "}
          <a
            href={GetGoogleFontUrl(font.family)}
            target="_blank"
            className="border-b-2 hover:border-b-4"
          >
            <b>{font.family}</b>
            <span className="material-symbols-outlined">{"\ue157"}</span>
          </a>
        </>
      )}
    </h1>
  );
}

function App() {
  const [font, setFont] = useState<FontRecord | undefined>(undefined);

  const [fontSize, setFontSize] = useState<FontSizeType>("base");

  return (
    <>
      <header className="bg-stone-200 dark:bg-stone-800">
        <div className="mx-auto max-w-screen-xl px-4 py-2">
          <DarkModeToggle />
          <FontSizeSelector fontSize={fontSize} setFontSize={setFontSize} />
          <HeaderText font={font} />
        </div>
      </header>
      <div className="mx-auto grid max-w-screen-xl grid-cols-12 grid-rows-1">
        <aside className="col-span-4 overflow-y-auto py-4 pl-4 pr-1 sm:col-span-3">
          <FontChooser setFont={setFont} />
        </aside>
        <main className="col-span-8 overflow-y-auto p-4 sm:col-span-9">
          <MainText key={font?.family} font={font} fontSize={fontSize} />
        </main>
      </div>
    </>
  );
}

export default App;
