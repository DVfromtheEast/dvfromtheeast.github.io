function Header() {
  return (
    <>
      <header>
        <div class="container">
          <nav class="navbar">
            {/* logo  */}
            <div class="header_logo">
              <a href="./index">
                <img src="./images/Logo_DV.svg" />
              </a>
            </div>
            {/* links */}
            <ul class="navbar_links">
              <li class="link">
                <a href="./aboutme">About me</a>
              </li>
              <li class="link">
                <a href="./works">Works</a>
              </li>
              <li class="link">
                <a href="./skills">Skills</a>
              </li>
              <li class="link">
                <a href="./contact">Contact</a>
              </li>
            </ul>
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
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
