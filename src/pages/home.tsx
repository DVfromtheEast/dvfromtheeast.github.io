import { Typography } from '@mui/material'
import { useRouter } from 'next/router'

function Home() {
  const router = useRouter()

  return (
    <>
      <div className="container">
        <div className="banner">
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
          <div className="banner_text">
            <Typography variant="h1">
              I create visual for your product
            </Typography>

            <Typography variant="body1">
              As an independent designer, I love to make innovative and meaningful things.
            </Typography>

            <button
              className="b"
              onClick={() => router.push('/works')}
            >
              Check out my works
            </button>
          </div>
        </div>
      </div>

      {/* decorative background */}
      <div className="dec">
        <img src="/images/DV_BG.svg" alt="DV Background" />
      </div>
    </>
  )
}

export default Home
