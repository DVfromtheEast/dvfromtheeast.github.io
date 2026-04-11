import { useState } from 'react'
import type { NextPage } from 'next'
import { Box } from '@mui/material';
import Header from '../components/Header';
import Home from '../components/sections/Home';
import Bio from '../components/sections/Bio';
import Works from '../components/sections/Works';
import Skills from '../components/sections/Skills';
import Contact from '../components/sections/Contact';
import WorkItem from '../components/sections/WorkItem';
import WorkDetails from '../components/sections/WorkDetails';
import DVAgentChat from '../components/DvAgent';


const IndexPage: NextPage = () => {
  const [activeSection, setActiveSection] = useState<'home' | 'about' | 'works' | 'work-item' | 'work-details' | 'abilities' | 'contact'>(() => {
    if (typeof window === 'undefined') return 'home'
    return (localStorage.getItem('activeSection') as typeof activeSection) || 'home'
  })
  const [activeCategory, setActiveCategory] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('activeCategory') || null
  })
  const [activeWorkId, setActiveWorkId] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('activeWorkId') || null
  })

  function handleSectionChange(section: typeof activeSection) {
    setActiveSection(section)
    localStorage.setItem('activeSection', section)
  }

  function handleCategoryChange(id: string) {
    setActiveCategory(id)
    localStorage.setItem('activeCategory', id)
  }
  function handleWorkIdChange(id: string) {
    setActiveWorkId(id)
    localStorage.setItem('activeWorkId', id)
  }
  const renderSection = () => {
    switch (activeSection) {
      case 'about':
        return <Bio />
      case 'works':
        return <Works setActiveSection={handleSectionChange} setActiveCategory={handleCategoryChange} />
      case 'work-item':
        return <WorkItem categoryId={activeCategory} setActiveSection={handleSectionChange} setActiveWorkId={handleWorkIdChange} />
      case 'work-details':
        return <WorkDetails workId={activeWorkId} categoryId={activeCategory} setActiveSection={handleSectionChange} />
      case 'abilities':
        return <Skills />
      case 'contact':
        return <Contact />
      default:
        return <Home setActiveSection={handleSectionChange} />
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: 1, height: '100vh', alignItems: 'center', pb: 4 }}>
      <Header activeSection={activeSection} setActiveSection={handleSectionChange} />
      <DVAgentChat />
      {renderSection()}
      <Box sx={{
        position: 'absolute', top: 0, right: 0, width: '50rem', height: 'auto', zIndex: -2, userSelect: 'none',
        WebkitUserSelect: 'none', PointerEvents: 'none'
      }}>
        <img src="https://res.cloudinary.com/da7poid94/image/upload/v1775329018/DVBG_ekfaqh.svg" alt="DVBG" />
      </Box>
    </Box>
  )
}

export default IndexPage
