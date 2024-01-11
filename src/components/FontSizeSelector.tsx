import { type FontSizeType, fontSizes } from "utils/FontSize";

export function FontSizeSelector({
  fontSize,
  setFontSize,
}: {
  fontSize: FontSizeType;
  setFontSize: React.Dispatch<React.SetStateAction<FontSizeType>>;
}) {
  function decreaseFontSize() {
    const index = Array.prototype.indexOf.call(fontSizes, fontSize);
    setFontSize(fontSizes[Math.max(index - 1, 0)]);
  }

  function increaseFontSize() {
    const index = Array.prototype.indexOf.call(fontSizes, fontSize);
    setFontSize(fontSizes[Math.min(index + 1, fontSizes.length - 1)]);
  }

  return (
    <>
      <button
        onClick={increaseFontSize}
        className="material-symbols-outlined header-button absolute right-14 top-0 h-10 w-10"
        disabled={fontSize === fontSizes[fontSizes.length - 1]}
        aria-label="Increase font size"
      >
        {"\ueae2"}
      </button>

      <button
        onClick={decreaseFontSize}
        className="material-symbols-outlined header-button absolute right-28 top-0 h-10 w-10"
        disabled={fontSize === fontSizes[0]}
        aria-label="Decrease font size"
      >
        {"\ueadd"}
      </button>
    </>
  );
}
