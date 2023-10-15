import React from 'react'
import { Icon } from '../Icon'
import { useSetThemeContext, useThemeContext } from '../../provider/ThemeProvider'

type ThemeToggleIconProps = React.ComponentProps<'div'>

export const ThemeToggleIcon: React.FC<ThemeToggleIconProps> = (props) => {
  const currentTheme = useThemeContext()
  const setTheme = useSetThemeContext()

  const toggleDarkMode = () => {
    if (currentTheme === 'dark') {
      setTheme('light')
      return
    } else {
      setTheme('dark')
    }
  }

  return (
    <div {...props}>
      {currentTheme === 'light' && <Icon src="sun.jpeg" alt="太陽の画像" className="mr-2 h-10 w-10" />}
      {currentTheme === 'dark' && <Icon src="moon.jpeg" alt="月の画像" className="mr-2 h-10 w-10" />}
      <label className="relative mt-2  flex cursor-pointer items-center">
        <input
          type="checkbox"
          aria-label='テーマ変更のためのトグルボタン'
          className="peer sr-only"
          defaultChecked={currentTheme === 'dark'}
          onClick={toggleDarkMode}
        />
        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
      </label>
    </div>
  )
}
