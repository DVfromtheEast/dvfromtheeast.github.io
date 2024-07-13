import { Box, Link } from '@mui/material';

const navItems = ['Home', 'About', 'Contact'];

function Header() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div class="header_logo">
          <a href="./index">
            <img src="./images/Logo_DV.svg" />
          </a>
        </div>
        {/* links */}
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
          <Link underline="none" variant="body1" href="./aboutme">
            About me
          </Link>
          <Link underline="none" variant="body1" href="./works">
            Works
          </Link>
          <Link underline="none" variant="body1" href="./skills">
            Skills
          </Link>
          <Link underline="none" variant="body1" href="./contact">
            Contact
          </Link>
        </Box>
        {/* language  */}
        <a href="#" class="language">
          EN
        </a>
        {/* themeswitch  */}
        <label class="switch">
          <input type="checkbox" />
          <span class="slider round" id="slider">
            <i class="material-icons dark">dark_mode</i>
            <i class="material-icons light">light_mode</i>
          </span>
        </label>
        {/* menu_icon  */}
        <div class="navbar_icon1">
          <div class="navbar_icon2"></div>
        </div>
      </Box>
    </>
  );
}

export default Header;
