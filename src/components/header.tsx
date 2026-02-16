import { Box, Typography } from '@mui/material'
import { translations } from '../translation'
import { Switch } from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { useThemeMode } from '../context/ThemeContext'

type Section = 'home' | 'about' | 'works' | 'skills' | 'contact';
type Language = 'en' | 'de' | 'vi';
type HeaderProps = {
  activeSection: Section;
  setActiveSection: (section: 'home' | 'about' | 'works' | 'skills' | 'contact') => void
  language: Language;
  setLanguage: (lang: Language) => void;
}

function Header({ activeSection, setActiveSection, language,
  setLanguage, }: HeaderProps) {
  const t = translations[language];
  const nextLanguage = () => {
    if (language === 'en') setLanguage('de');
    else if (language === 'de') setLanguage('vi');
    else setLanguage('en');
  };

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
      <Box className="header_logo" onClick={() => setActiveSection('home')} sx={{ cursor: 'pointer' }}>
        <img src="/images/Logo_DV.svg" alt="DV Logo" />
      </Box>

      {/* Navigation */}
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '2rem', width: '80%', justifyContent: 'center' }}>
        <Typography onClick={() => setActiveSection('about')} sx={{
          cursor: 'pointer', color: activeSection === 'about'
            ? '#ffffff'
            : '#ff0000', transition: '0.3s ease',
        }} variant="body1">
          {t.about.navigation}
        </Typography>

        <Typography onClick={() => setActiveSection('works')} sx={{
          cursor: 'pointer', color: activeSection === 'works'
            ? '#ffffff'
            : '#ff0000', transition: '0.3s ease',
        }} variant="body1">
          {t.works.navigation}
        </Typography>

        <Typography onClick={() => setActiveSection('skills')} sx={{
          cursor: 'pointer', color: activeSection === 'skills'
            ? '#ffffff'
            : '#ff0000', transition: '0.3s ease',
        }} variant="body1">
          {t.skills.navigation}
        </Typography>

        <Typography onClick={() => setActiveSection('contact')} sx={{
          cursor: 'pointer', color: activeSection === 'contact'
            ? '#ffffff'
            : '#ff0000', transition: '0.3s ease',
        }} variant="body1">
          {t.contact.navigation}
        </Typography>
      </Box>

      {/* Language */}
      <Typography
        onClick={nextLanguage}
        sx={{ cursor: 'pointer', fontWeight: 600, color: '#ffffff' }}
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
            border: 'solid 1px',
            borderColor: 'text.secondary'
          },
          '& .MuiSwitch-track': {
            borderRadius: 4,
            width: '3rem',
            height: '1.5rem',
            bgcolor: 'background.paper',
            opacity: 1,
            border: 'solid 1px',
            borderColor: 'text.secondary'
          },
          '& .MuiSwitch-input': {
            left: '0!important',
            right: '0!important',
            width: '100%!important',
          },
        }}
      />
      {/* Menu Icon */}
      <div className="navbar_icon1">
        <div className="navbar_icon2"></div>
      </div>
    </Box>
  )
}

export default Header
