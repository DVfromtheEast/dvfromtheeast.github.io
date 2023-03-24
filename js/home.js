// Menu
const menu = document.querySelector('.navbar_links');
const menuButton = document.querySelector('.navbar_icon1');
const overlay = document.querySelector('#overlay');

menuButton.addEventListener('click', () => {
  menu.classList.toggle('navbar_open');
  menuButton.classList.toggle('open');
  overlay.classList.toggle('show');
});

overlay.addEventListener('click', () => {
  menu.classList.toggle('navbar_open');
  menuButton.classList.toggle('open');
  overlay.classList.toggle('show');
});

// Switches
var slider = document.getElementById('slider');
var layer = document.getElementById('layer');
var layer1 = document.getElementById('layer1');
var layer2 = document.getElementById('layer2');
var layer3 = document.getElementById('layer3');
var layer4 = document.getElementById('layer4');

if (localStorage.getItem('theme') == null) {
  localStorage.setItem('theme', 'dark');
}
let localData = localStorage.getItem('theme');
if (localData == 'dark') {
  layer.src = './images/Banner/night.png';
  layer1.src = './images/Banner/night1.png';
  layer2.src = './images/Banner/night2.png';
  layer3.src = './images/Banner/night3.png';
  layer4.src = './images/Banner/night4.png';
  document.body.classList.remove('light-theme');
} else if (localData == 'light') {
  layer.src = './images/Banner/day.png';
  layer1.src = './images/Banner/day1.png';
  layer2.src = './images/Banner/day2.png';
  layer3.src = './images/Banner/day3.png';
  layer4.src = './images/Banner/day4.png';
  document.body.classList.add('light-theme');
}

slider.onclick = function () {
  document.body.classList.toggle('light-theme');
  if (document.body.classList.contains('light-theme')) {
    layer.src = './images/Banner/day.png';
    layer1.src = './images/Banner/day1.png';
    layer2.src = './images/Banner/day2.png';
    layer3.src = './images/Banner/day3.png';
    layer4.src = './images/Banner/day4.png';
    localStorage.setItem('theme', 'light');
  } else {
    layer.src = './images/Banner/night.png';
    layer1.src = './images/Banner/night1.png';
    layer2.src = './images/Banner/night2.png';
    layer3.src = './images/Banner/night3.png';
    layer4.src = './images/Banner/night4.png';
    localStorage.setItem('theme', 'dark');
  }
};
