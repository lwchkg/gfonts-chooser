import { useState } from "react";

import "./App.css";
import { FontChooser } from "./FontChooser";
import { MainText } from "./MainText";
import { FontRecord } from "./utils/FontData";

function App() {
  const [font, setFont] = useState<FontRecord | undefined>(undefined);

  return (
    <>
      <header className="col-span-12 row-span-1">
        <h1 className="text-4xl">Font Tester</h1>
      </header>
      <aside className="col-span-3 overflow-x-auto">
        <FontChooser setFont={setFont} />
      </aside>
      <MainText key={font?.family} font={font} />
    </>
  );
}

export default App;
