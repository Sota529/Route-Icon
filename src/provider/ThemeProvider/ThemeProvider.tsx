import React from 'react'
import { ThemeType } from '../../types/ThemeType'

const ThemeContext = React.createContext<ThemeType>('light')
const SetThemeContext = React.createContext<(theme: ThemeType) => void>(() => {
  return
})

type ThemeProviderProps = {
  children: React.ReactNode
}
export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const [currentTheme, setCurrentTheme] = React.useState<'dark' | 'light'>(checkCurrentTheme())

  // テーマ初期化
  setThemeToHtmlAndSaveToLocalStorage(currentTheme)
  const setTheme = (theme: ThemeType) => {
    checkCurrentTheme()
    setThemeToHtmlAndSaveToLocalStorage(theme)
    setCurrentTheme(theme)
  }
  return (
    <ThemeContext.Provider value={currentTheme}>
      <SetThemeContext.Provider value={setTheme}>{props.children}</SetThemeContext.Provider>
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => {
  return React.useContext(ThemeContext)
}

export const useSetThemeContext = () => {
  return React.useContext(SetThemeContext)
}

const checkCurrentTheme = (): 'dark' | 'light' => {
  if (
    localStorage.getItem('theme') === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    return 'dark'
  } else {
    return 'light'
  }
}

//
const setThemeToHtmlAndSaveToLocalStorage = (currentTheme: 'dark' | 'light'): void => {
  if (currentTheme === 'dark') {
    document.documentElement.classList.add('dark')
    localStorage.theme = 'dark'
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.theme = 'light'
  }
}
