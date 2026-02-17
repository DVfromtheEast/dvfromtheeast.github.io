import { Grow } from '@mui/material'
import { useLanguage } from '../context/LanguageContext'

export const TextTransition = ({ children }: { children: React.ReactNode }) => {
    const { language } = useLanguage()

    return (
        <Grow in timeout={200} key={language}>
            <div>{children}</div>
        </Grow>
    )
}
