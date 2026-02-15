import { createContext, useContext, useMemo, useState } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import DVTheme from '../../theme'

type ThemeMode = 'light' | 'dark'

interface ThemeContextProps {
    mode: ThemeMode
    toggleTheme: () => void
}

const ThemeModeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeModeProvider = ({ children }: { children: React.ReactNode }) => {
    const [mode, setMode] = useState<ThemeMode>(() => {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem('themeMode') as ThemeMode) || 'dark'
        }
        return 'dark'
    })

    const theme = useMemo(() => DVTheme(mode), [mode])

    const toggleTheme = () => {
        setMode(prev => {
            const newMode = prev === 'light' ? 'dark' : 'light'
            localStorage.setItem('themeMode', newMode)
            return newMode
        })
    }

    return (
        <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeModeContext.Provider>
    )
}

export const useThemeMode = () => {
    const context = useContext(ThemeModeContext)
    if (!context) {
        throw new Error('useThemeMode must be used within ThemeModeProvider')
    }
    return context
}
