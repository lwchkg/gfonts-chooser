import { useState } from "react";

import { DarkModeToggle } from "components/DarkModeToggle";
import { FontChooser } from "components/FontChooser";
import { FontSizeSelector } from "components/FontSizeSelector";
import { MainText } from "components/MainText";

import { FontRecord } from "utils/FontData";
import type { FontSizeType } from "utils/FontSize";

import "./App.css";

function App() {
  const [font, setFont] = useState<FontRecord | undefined>(undefined);

  const [fontSize, setFontSize] = useState<FontSizeType>("base");

  return (
    <>
      <header className="relative col-span-12 row-span-1">
        <h1 className="text-4xl">Font Tester</h1>
        <DarkModeToggle />
        <FontSizeSelector fontSize={fontSize} setFontSize={setFontSize} />
      </header>
      <aside className="col-span-3 overflow-x-auto">
        <FontChooser setFont={setFont} />
      </aside>
      <MainText key={font?.family} font={font} fontSize={fontSize} />
    </>
  );
}

export default App;
