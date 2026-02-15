import { Box, Typography } from '@mui/material';
import { translations } from '../translation';

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

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '75%',
      }}
    >
      {/* Logo */}
      <Box className="header_logo" onClick={() => setActiveSection('home')} sx={{ cursor: 'pointer' }}>
        <img src="/images/Logo_DV.svg" alt="DV Logo" />
      </Box>

      {/* Navigation */}
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
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
      <label className="switch">
        <input type="checkbox" />
        <span className="slider round" id="slider">
          <i className="material-icons dark">dark_mode</i>
          <i className="material-icons light">light_mode</i>
        </span>
      </label>

      {/* Menu Icon */}
      <div className="navbar_icon1">
        <div className="navbar_icon2"></div>
      </div>
    </Box>
  )
}

export default Header
