// LOADING ANIMATION
let distancePerPoint = 0.3;
let drawFPS = 60;
var paths = document.querySelectorAll(".p"),
  length,
  timer;

const sv = document.querySelector(".sv");

// Drawing logo Loading
(function () {
  paths.forEach((path) => {
    let pathLength = path.getTotalLength();
    (function startDrawing() {
      length = 0;
      timer = setInterval(increseLength, 1000 / drawFPS);
      path.style.strokeDasharray = [length, pathLength].join(" ");
    })();

    function increseLength() {
      length += distancePerPoint;
      path.style.strokeDasharray = [length, pathLength].join(" ");
      if (length >= pathLength) {
        setTimeout(() => {
          stopDrawingPath();
        }, 2000);
        clearTimeout(timer);
      }
    }

    const overlay = document.getElementById("overlay");

    function stopDrawingPath() {
      clearTimeout(timer);
      path.style.stroke = "";
      path.style.strokeDasharray = "";
      overlay.style.opacity = 0;

      // document.body.style.overflow = "auto";
      setTimeout(() => {
        overlay.remove();
      }, 1300);
    }
  });
})();

//  NAVBAR
const navBtn = document.querySelector(".navLineContainer");
const navLinks = document.querySelector(".navLinkWrapper");
const toggleThemeBtn = document.querySelector(".toggleContainer");
const dot = document.querySelector(".dot");
const logo = document.querySelector(".logo");
const target = document.querySelectorAll(".paralax");

// OPEN / CLOSE NAVBAR
const toggleNav = () => {
  navBtn.classList.toggle("activeNav");
  navLinks.classList.toggle("active");
  // Change color of toggle theme btn when opening nav
  toggleThemeBtn.classList.toggle("navActive");
  logo.classList.toggle("logoActive");
  if (navBtn.classList.contains("activeNav")) {
    document.body.scroll = "no";
    document.body.style.overflow = "hidden";
  } else {
    document.body.scroll = "yes";
    document.body.style.overflow = "auto";
  }
};

// THEME
const toggleTheme = () => {
  dot.classList.toggle("activeTheme");
  document.body.classList.toggle("darkTheme");
};

navBtn.addEventListener("click", toggleNav);
toggleThemeBtn.addEventListener("click", toggleTheme);

// Hie navbar on scroll
const nav = document.querySelector("nav");
let prevScroll = window.pageYOffset;
let distance = 0;
let offset = 200;

window.onscroll = () => {
  let currentScrollPos = window.pageYOffset;

  if (prevScroll < currentScrollPos) {
    if (currentScrollPos > distance + offset) {
      nav.style.top = "-100px";
    }
  } else {
    nav.style.top = "0px";
    distance = window.pageYOffset;
  }

  prevScroll = currentScrollPos;
};

// Draws svg middle line
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

// Close nav on link click
const links = document.querySelectorAll(".navLink");

links.forEach((link) => {
  console.log(link);
  link.addEventListener("click", toggleNav);
  nav.style.top = "-100px";
  toggleNav();
});

const blocks = document.querySelectorAll(".container .block");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  },
  {
    threshold: 1,
  }
);

blocks.forEach((block) => {
  observer.observe(block);
});
