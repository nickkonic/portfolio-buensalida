"use client"

import * as React from "react"

type Theme = "light" | "dark"

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined)

const THEME_STORAGE_KEY = "portfolio-theme"

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.remove("light", "dark")
  root.classList.add(theme)
}

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setThemeState] = React.useState<Theme>("dark")

  React.useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === "light" || stored === "dark") {
      setThemeState(stored)
      applyTheme(stored)
      return
    }

    const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialTheme: Theme = preferredDark ? "dark" : "light"
    setThemeState(initialTheme)
    applyTheme(initialTheme)
  }, [])

  const setTheme = React.useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme)
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
    applyTheme(nextTheme)
  }, [])

  const value = React.useMemo(
    () => ({ theme, setTheme }),
    [theme, setTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
