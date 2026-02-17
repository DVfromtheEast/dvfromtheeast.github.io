import { useState } from 'react'
import type { NextPage } from 'next'
import { Box } from '@mui/material';
import Header from '../components/Header';
import Home from '../components/sections/Home'


const IndexPage: NextPage = () => {
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
    <Box sx={{ display: 'flex', flexDirection: 'column', width: 1, height: '100vh', alignItems: 'center', pb: 4 }}>
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      {renderSection()}
    </Box>
  )
}

export default IndexPage
