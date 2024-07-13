import { Typography } from '@mui/material';

function Home() {
  return (
    <>
      <div class="container">
        <div class="banner">
          <div class="illustration">
            <img class="moon" src="./images/Banner/moon.png" loading="lazy" />
            <img class="sun" src="./images/Banner/sun.png" loading="lazy" />
            <img
              class="cloud1"
              src="./images/Banner/cloud1.png"
              loading="lazy"
            />
            <img
              class="cloud2"
              src="./images/Banner/cloud2.png"
              loading="lazy"
            />
            <img
              class="cloud3"
              src="./images/Banner/cloud3.png"
              loading="lazy"
            />
            <img
              class="balloon"
              src="./images/Banner/hotairballoon.png"
              loading="lazy"
            />
            <div class="platform">
              <img
                class="layer4"
                id="layer4"
                src="./images/Banner/night4.png"
              />
              <img
                class="layer3"
                id="layer3"
                src="./images/Banner/night3.png"
              />
              <img
                class="layer2"
                id="layer2"
                src="./images/Banner/night2.png"
                loading="lazy"
              />
              <img
                class="layer1"
                id="layer1"
                src="./images/Banner/night1.png"
                loading="lazy"
              />
              <img class="layer" id="layer" src="./images/Banner/night.png" />
            </div>
          </div>
          <div class="banner_text">
            <Typography variant="h1">
              I create visual for your product
            </Typography>
            <Typography variant="body1">
              As an independent designer, I love to make innovative and
              meaningful things.
            </Typography>
            <button class="b" onclick="location.href='/works'">
              Check out my works
            </button>
          </div>
        </div>
      </div>
      {/* dec */}
      <div class="dec">
        <img src="./images/DV_BG.svg" alt="DV BG" />
      </div>
    </>
  );
}

export default Home;
