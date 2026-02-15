import { useState } from 'react'
import type { NextPage } from 'next'
import { Box } from '@mui/material';
import Header from '../components/Header';
import Home from '../components/sections/Home'

type Language = 'en' | 'de' | 'vi';



const IndexPage: NextPage = () => {

  const [language, setLanguage] = useState<Language>('en');
  const [activeSection, setActiveSection] = useState<'home' | 'about' | 'works' | 'skills' | 'contact'>('home')

  const renderSection = () => {
    switch (activeSection) {
      case 'about':
        return <div style={{ color: '#ff0000' }}>About Section</div>
      case 'works':
        return <div style={{ color: '#ff0000' }}>Works Section</div>
      case 'skills':
        return <div style={{ color: '#ff0000' }}>Skills Section</div>
      case 'contact':
        return <div style={{ color: '#ff0000' }}>Contact Section</div>
      default:
        return <Home />
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: 1, alignItems: 'center' }}>
      <Header activeSection={activeSection} setActiveSection={setActiveSection} language={language}
        setLanguage={setLanguage} />
      {renderSection()}
    </Box>
  )
}

export default IndexPage
