import { useState } from 'react'
import type { NextPage } from 'next'
import { Box } from '@mui/material';
import Header from '../components/Header';
import Home from '../components/sections/Home';
import Bio from '../components/sections/Bio';
import Works from '../components/sections/Works';
import Skills from '../components/sections/Skills';
import Contact from '../components/sections/Contact';
import DVAgentChat from '../components/DvAgent';


const IndexPage: NextPage = () => {
  const [activeSection, setActiveSection] = useState<'home' | 'about' | 'works' | 'skills' | 'contact'>('home')

  const renderSection = () => {
    switch (activeSection) {
      case 'about':
        return <Bio />
      case 'works':
        return <Works />
      case 'skills':
        return <Skills />
      case 'contact':
        return <Contact />
      default:
        return <Home />
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: 1, height: '100vh', alignItems: 'center', pb: 4 }}>
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <DVAgentChat />
      {renderSection()}
      <div className="dec">
        <img src="./images/DV_BG.svg" alt="DV BG" />
      </div>
    </Box>
  )
}

export default IndexPage
