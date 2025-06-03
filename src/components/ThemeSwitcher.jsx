"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, LaptopMinimal } from "lucide-react";

export default function ThemeSwitcher() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef(null);

  // Garante que o tema só será renderizado após o componente montar
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    setOpen(false);
  };

  const currentTheme = theme === "system" ? systemTheme : theme;

  const renderThemeIcon = () => {
    if (!mounted) return <LaptopMinimal className="h-5 w-5" />;
    if (currentTheme === "dark") return <Moon className="h-5 w-5" />;
    if (currentTheme === "light") return <Sun className="h-5 w-5" />;
    return <LaptopMinimal className="h-5 w-5" />;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-center min-h-10 min-w-10 p-2 rounded-lg bg-slate-300 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        aria-label="Toggle theme"
      >
        {renderThemeIcon()}
      </button>

      {open && mounted && (
        <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 border border-gray-200 dark:border-gray-700">
          <div className="py-1">
            <button
              onClick={() => handleThemeChange("light")}
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Sun className="mr-3 h-4 w-4" />
              Light
            </button>
            <button
              onClick={() => handleThemeChange("dark")}
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Moon className="mr-3 h-4 w-4" />
              Dark
            </button>
            <button
              onClick={() => handleThemeChange("system")}
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <LaptopMinimal className="mr-3 h-4 w-4" />
              System
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
