import { Box, Typography } from '@mui/material'
import { translations } from '../translation'
import { Switch } from '@mui/material'
import { alpha } from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { useThemeMode } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import { Language } from '../context/LanguageContext'

type Section = 'home' | 'about' | 'works' | 'abilities' | 'contact';
type HeaderProps = {
  activeSection: Section
  setActiveSection: (section: Section) => void
}

function Header({ activeSection, setActiveSection }: HeaderProps) {
  const { language, setLanguage } = useLanguage()
  const t = translations[language]
  const languages: Language[] = ['en', 'de', 'vi']

  const nextLanguage = () => {
    const currentIndex = languages.indexOf(language)
    const nextIndex = (currentIndex + 1) % languages.length
    setLanguage(languages[nextIndex])
  }

  const { mode, toggleTheme } = useThemeMode()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '70%',
        py: 3,
        gap: 1
      }}
    >
      {/* Logo */}
      <Box sx={{ width: '3.5rem', height: '3.5rem', cursor: 'pointer', transition: 'all 0.15s ease-in', '&:hover': { transform: 'scale(0.9)', filter: 'brightness(1.2)' } }} onClick={() => setActiveSection('home')} >
        <img src="https://res.cloudinary.com/da7poid94/image/upload/v1774790101/DVLogo_p6vnwu.svg" alt="DV Logo" />
      </Box>
      {/* Navigation */}
      <Box sx={{
        display: 'flex', flexDirection: 'row', gap: '2rem', width: 'fit-content', justifyContent: 'center', px: 5, backgroundColor: mode === 'dark' ? alpha('#000000', 0.8) : alpha('#ffffff', 0.8), border: theme => `1px solid ${theme.palette.divider}`, borderRadius: 8, backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}>
        <Typography onClick={() => setActiveSection('about')} sx={{
          cursor: 'pointer', py: 2, color: activeSection === 'about'
            ? 'primary.main'
            : 'text.primary,', background: activeSection === 'about'
              ? `radial-gradient(
      60% 60% at 50% 0%,
      rgba(86, 219, 35, 0.25) 0%,
      rgba(86, 219, 35, 0) 65%
    )`
              : 'transparent', transition: '0.3s ease', '&:hover': { color: 'primary.main' }
        }} variant="body2">
          {t.about.navigation}
        </Typography>

        <Typography onClick={() => setActiveSection('works')} sx={{
          cursor: 'pointer', py: 2, color: activeSection === 'works'
            ? 'primary.main'
            : 'text.primary', background: activeSection === 'works'
              ? `radial-gradient(
      60% 60% at 50% 0%,
      rgba(86, 219, 35, 0.25) 0%,
      rgba(86, 219, 35, 0) 65%
    )`
              : 'transparent', transition: '0.3s ease', '&:hover': { color: 'primary.main' }
        }} variant="body2">
          {t.works.navigation}
        </Typography>

        <Typography onClick={() => setActiveSection('abilities')} sx={{
          cursor: 'pointer', py: 2, color: activeSection === 'abilities'
            ? 'primary.main'
            : 'text.primary', background: activeSection === 'abilities'
              ? `radial-gradient(
      60% 60% at 50% 0%,
      rgba(86, 219, 35, 0.25) 0%,
      rgba(86, 219, 35, 0) 65%
    )`
              : 'transparent', transition: '0.3s ease', '&:hover': { color: 'primary.main' }
        }} variant="body2">
          {t.skills.navigation}
        </Typography>

        <Typography onClick={() => setActiveSection('contact')} sx={{
          cursor: 'pointer', py: 2, color: activeSection === 'contact'
            ? 'primary.main'
            : 'text.primary', background: activeSection === 'contact'
              ? `radial-gradient(
      60% 60% at 50% 0%,
      rgba(86, 219, 35, 0.25) 0%,
      rgba(86, 219, 35, 0) 65%
    )`
              : 'transparent', transition: '0.3s ease', '&:hover': { color: 'primary.main' }
        }} variant="body2">
          {t.contact.navigation}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} >
        {/* Language */}
        <Typography
          onClick={nextLanguage}
          sx={{
            cursor: 'pointer', fontWeight: 600, color: 'text.primary', userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
        >
          {language.toUpperCase()}
        </Typography>
        {/* Theme Switch */}
        <Switch
          checked={mode === 'dark'}
          onChange={toggleTheme}
          checkedIcon={<LightModeIcon fontSize="small" sx={{ color: 'text.secondary', p: 0 }} />}
          icon={<DarkModeIcon fontSize="small" sx={{ color: 'text.secondary', p: 0 }} />}
          sx={{
            alignItems: 'center', px: 0.75, width: 'auto', transition: 'ease-in-out 0.3s',
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              bgcolor: 'background.paper',
              opacity: 1,
              border: theme => `1px solid ${theme.palette.divider}`,
            },
            '& .MuiSwitch-track': {
              borderRadius: 4,
              width: '3rem',
              height: '1.5rem',
              bgcolor: 'background.paper',
              opacity: 1,
              border: theme => `1px solid ${theme.palette.divider}`,
            },
            '& .MuiSwitch-input': {
              left: '0!important',
              right: '0!important',
              width: '100%!important',
            },
          }}
        />
      </Box>
      {/* Menu Icon */}
      <div className="navbar_icon1">
        <div className="navbar_icon2"></div>
      </div>
    </Box>
  )
}

export default Header
