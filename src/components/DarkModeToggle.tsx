import { useEffect, useLayoutEffect, useState } from "react";

function getSystemPrefersLight() {
  return window.matchMedia("(prefers-color-scheme: light)").matches;
}

function getIsLight() {
  const localStorageColorScheme = localStorage.getItem("color-scheme");
  if (localStorageColorScheme !== null) {
    return localStorageColorScheme === "light";
  }
  return getSystemPrefersLight();
}

function setBrowserIsLight(isLight: boolean) {
  const classList = document.documentElement.classList;

  if (isLight) {
    classList.remove("dark");
    classList.add("light");
  } else {
    classList.add("dark");
    classList.remove("light");
  }

  if (isLight === getSystemPrefersLight()) {
    localStorage.removeItem("color-scheme");
  } else {
    localStorage.setItem("color-scheme", isLight ? "light" : "dark");
  }
}

export function DarkModeToggle() {
  const [isLight, setIsLight] = useState(getIsLight());

  useLayoutEffect(() => {
    document.documentElement.classList.add(getIsLight() ? "light" : "dark");
  }, []);

  useEffect(() => {
    const listener = (e: MediaQueryListEvent) => {
      setIsLight(e.matches);
      setBrowserIsLight(e.matches);
    };

    window
      .matchMedia("(prefers-color-scheme: light)")
      .addEventListener("change", listener);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: light)")
        .removeEventListener("change", listener);
    };
  }, []);

  function handleClick() {
    const nextIsLight = !isLight;
    setIsLight(nextIsLight);
    setBrowserIsLight(nextIsLight);
  }

  return (
    <button
      onClick={handleClick}
      className="material-symbols-outlined header-button absolute right-0 top-0 h-10 w-10"
      aria-label="Dark mode toggle"
    >
      {isLight ? "\ue51c" : "\ue518"}
    </button>
  );
}
