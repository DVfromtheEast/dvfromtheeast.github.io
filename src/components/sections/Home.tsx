import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { translations } from '../../translation'
import { useLanguage } from '../../context/LanguageContext'
import { TextTransition } from '../TextTransition'
import DVButton from '../Button'
import { useThemeMode } from '../../context/ThemeContext'

const bannerAssets = {
  dark: {
    layer: "https://res.cloudinary.com/da7poid94/image/upload/v1775328963/night_hn3lly.png",
    layer1: "https://res.cloudinary.com/da7poid94/image/upload/v1775328965/night1_x6cswy.png",
    layer2: "https://res.cloudinary.com/da7poid94/image/upload/v1775328966/night2_kxbzib.png",
    layer3: "https://res.cloudinary.com/da7poid94/image/upload/v1775328967/night3_qv6du5.png",
    layer4: "https://res.cloudinary.com/da7poid94/image/upload/v1775328968/night4_pvcr6h.png",

  },
  light: {
    layer: "https://res.cloudinary.com/da7poid94/image/upload/v1775328955/day_umprpf.png",
    layer1: "https://res.cloudinary.com/da7poid94/image/upload/v1775328956/day1_mftmzx.png",
    layer2: "https://res.cloudinary.com/da7poid94/image/upload/v1775328957/day2_zl11qa.png",
    layer3: "https://res.cloudinary.com/da7poid94/image/upload/v1775328958/day3_fsib5r.png",
    layer4: "https://res.cloudinary.com/da7poid94/image/upload/v1775328959/day4_qlms7r.png",
  }
}
export default function Home() {
  const router = useRouter()
  const { language, setLanguage } = useLanguage()
  const t = translations[language]
  const { mode } = useThemeMode()
  const layers = ['layer', 'layer1', 'layer2', 'layer3', 'layer4']
  const isLight = mode === 'light'
  const theme = isLight ? 'light' : 'dark'

  return (
    <Box sx={{ width: '70%', height: '100%' }}>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'row-reverse', gap: 3, alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="illustration">
          <img className={`moon ${isLight ? 'moon_close' : ''}`} src="https://res.cloudinary.com/da7poid94/image/upload/v1775328962/moon_vcjvnk.png" alt="Moon" loading="lazy" />
          <img className={`sun ${isLight ? 'sun_open' : ''}`} src="https://res.cloudinary.com/da7poid94/image/upload/v1775328970/sun_falewt.png" alt="Sun" loading="lazy" />
          <img className="cloud1" src="https://res.cloudinary.com/da7poid94/image/upload/v1775328951/cloud1_q6ueai.png" alt="Cloud" loading="lazy" />
          <img className="cloud2" src="https://res.cloudinary.com/da7poid94/image/upload/v1775328952/cloud2_zv6yor.png" alt="Cloud" loading="lazy" />
          <img className="cloud3" src="https://res.cloudinary.com/da7poid94/image/upload/v1775328953/cloud3_c5menc.png" alt="Cloud" loading="lazy" />
          <img className="balloon" src="https://res.cloudinary.com/da7poid94/image/upload/v1775328961/hotairballoon_algad1.png" alt="Balloon" loading="lazy" />
          <div className="platform">
            {layers.map(key => (
              <img
                key={key}
                className={key}
                id={key}
                src={bannerAssets[theme][key]}
                loading="lazy"
              />
            ))}
          </div>
        </div>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 2, maxWidth: '26rem' }}>
          <TextTransition>
            <Typography variant="h1" sx={{ color: 'text.primary', mb: 1 }}>
              {t.headline}
            </Typography>
          </TextTransition>
          <Typography variant="body1" sx={{ color: 'text.primary', mb: 2 }}>
            I love to make innovative and meaningful things.
          </Typography>
          <DVButton onClick={() => router.push('/works')} >Check out my works</DVButton>
        </Box>
      </Box>
    </Box>
  )
}

