import { useState } from "react";

import "./App.css";
import { FontChooser } from "./FontChooser";
import { MainText } from "./MainText";
import { DarkModeToggle } from "./components/DarkModeToggle";
import { FontSizeSelector } from "./components/FontSizeSelector";
import { FontRecord } from "./utils/FontData";
import type { FontSizeType } from "./utils/FontSize";

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
