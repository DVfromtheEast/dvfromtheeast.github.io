import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { translations } from '../../translation'
import { useLanguage } from '../../context/LanguageContext'
import { TextTransition } from '../TextTransition'
import DVButton from '../Button'


function Home() {
  const router = useRouter()
  const { language, setLanguage } = useLanguage()
  const t = translations[language]
  return (
    <Box sx={{ width: '70%', height: '100%' }}>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'row-reverse', gap: 3, alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="illustration">
          <img className="moon" src="/images/Banner/moon.png" alt="Moon" loading="lazy" />
          <img className="sun" src="/images/Banner/sun.png" alt="Sun" loading="lazy" />
          <img className="cloud1" src="/images/Banner/cloud1.png" alt="Cloud" loading="lazy" />
          <img className="cloud2" src="/images/Banner/cloud2.png" alt="Cloud" loading="lazy" />
          <img className="cloud3" src="/images/Banner/cloud3.png" alt="Cloud" loading="lazy" />
          <img className="balloon" src="/images/Banner/hotairballoon.png" alt="Balloon" loading="lazy" />

          <div className="platform">
            <img className="layer4" id="layer4" src="/images/Banner/night4.png" alt="" />
            <img className="layer3" id="layer3" src="/images/Banner/night3.png" alt="" />
            <img className="layer2" id="layer2" src="/images/Banner/night2.png" alt="" loading="lazy" />
            <img className="layer1" id="layer1" src="/images/Banner/night1.png" alt="" loading="lazy" />
            <img className="layer" id="layer" src="/images/Banner/night.png" alt="" />
          </div>
        </div>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 2, maxWidth: '26rem' }}>
          <TextTransition>
            <Typography variant="h1" sx={{ color: 'text.primary', mb: 1 }}>
              {t.headline}
            </Typography>
          </TextTransition>
          <Typography variant="body1" sx={{ color: 'text.primary', mb: 2 }}>
            I'm a wanderer who loves to make innovative and meaningful things.
          </Typography>

          <button
            className="b"
            onClick={() => router.push('/works')}
          >
            Check out my works
          </button>
          <DVButton>Check out my works</DVButton>
          <DVButton customVariant="outline">Check out my works</DVButton>
          <DVButton customVariant="ghost">Check out my works</DVButton>
          <DVButton customVariant="danger">Check out my works</DVButton>
          <DVButton loading>
            Save
          </DVButton>
          <DVButton loading customVariant="outline">
            Save
          </DVButton>
          <DVButton loading customVariant="ghost">
            Save
          </DVButton>
          <DVButton loading customVariant="danger">
            Save
          </DVButton>
        </Box>
      </Box>
      {/* decorative background */}
      <div className="dec">
        <img src="/images/DV_BG.svg" alt="DV Background" />
      </div>
    </Box>
  )
}

export default Home
