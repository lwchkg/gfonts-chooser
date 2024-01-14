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
      <header className="relative col-span-12 row-span-1">
        <DarkModeToggle />
        <FontSizeSelector fontSize={fontSize} setFontSize={setFontSize} />
        <HeaderText font={font} />
      </header>
      <aside className="col-span-3 overflow-x-auto">
        <FontChooser setFont={setFont} />
      </aside>
      <MainText key={font?.family} font={font} fontSize={fontSize} />
    </>
  );
}

export default App;
