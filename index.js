const navBtn = document.querySelector(".navLineContainer");
const navLinks = document.querySelector(".navLinkWrapper");
const toggleThemeBtn = document.querySelector(".toggleContainer");
const dot = document.querySelector(".dot");
const logo = document.querySelector(".logo");
const target = document.querySelectorAll(".paralax");

const toggleTheme = () => {
  dot.classList.toggle("activeTheme");
  document.body.classList.toggle("darkTheme");
};

toggleThemeBtn.addEventListener("click", toggleTheme);

const toggleNav = () => {
  navBtn.classList.toggle("activeNav");
  navLinks.classList.toggle("active");
  // Change color of toggle theme btn when opening nav
  toggleThemeBtn.classList.toggle("navActive");
  logo.classList.toggle("logoActive");
};

navBtn.addEventListener("click", toggleNav);

// Hie navbar on scroll
let prevScroll = window.scrollY;
const nav = document.querySelector("nav");

window.onscroll = () => {
  let currentScrollPos = window.scrollY;

  if (prevScroll > currentScrollPos) {
    nav.style.top = "0";
  } else {
    nav.style.top = "-100px";
  }

  prevScroll = window.scrollY;
};

// Draw line on scroll
console.log(path);

const drawLine = () => {
  let path = document.getElementById("path");
  let pathLength = path.getTotalLength();

  path.style.strokeDasharray = pathLength + " " + pathLength;
  path.style.strokeDashoffset = pathLength;

  // % of line
  const scrollPrecentage =
    (document.documentElement.scrollTop + document.body.scrollTop) /
    (document.documentElement.scrollHeight -
      document.documentElement.clientHeight);

  const drawLength = pathLength * scrollPrecentage;

  path.style.strokeDashoffset = pathLength - drawLength + 45;

  // When complete, remove the dash array, otherwise shapte isn't quite sharp
  if (scrollPrecentage >= 0.99) {
    path.style.strokeDasharray = "none";
  } else {
    path.style.strokeDasharray = pathLength + " " + pathLength;
  }

  // PARALAX
  let length = target.length;

  for (let i = 0; i < length; i++) {
    let pos = window.pageYOffset * target[i].dataset.rate;

    if (target[i].dataset.direction === "vertical") {
      target[i].style.transform = "translate3d(0px, " + pos + "px, 0px)";
    } else {
      let posX = window.pageYOffset * target[i].dataset.ratex;
      let posY = window.pageYOffset * target[i].dataset.ratey;

      target[i].style.transform =
        "translate3d(" + posX + "px," + posY + "px, 0px )";
    }
  }
};

window.addEventListener("scroll", drawLine);
