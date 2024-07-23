"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "./Icons";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className="border border-amber-300 dark:border-amber-300 rounded-2xl p-1 hover:bg-amber-200 hover:bg-opacity-30 dark:hover:bg-opacity-10 dark:hover:bg-amber-50"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default ThemeSwitch;
