// LOADING ANIMATION
let distancePerPoint = 0.3;
let drawFPS = 60;
var paths = document.querySelectorAll(".p"),
  length,
  timer;

// Overlay loading
const overlay = document.getElementById("overlay");
document.body.style.overflow = "hidden";
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

    function stopDrawingPath() {
      clearTimeout(timer);
      path.style.stroke = "";
      path.style.strokeDasharray = "";
      overlay.style.top = "-100%";
      document.body.style.overflow = "";

      setTimeout(() => {
        overlay.remove();
      }, 1300);
    }
  });
})();

/* ALL VERIABLES */

// Navbar
const nav = document.querySelector("nav");
const navBtn = document.querySelector(".navLineContainer");
const navLinksWrapper = document.querySelector(".navLinkWrapper");
const toggleThemeBtn = document.querySelector(".toggleContainer");
const logo = document.querySelector(".logo");
const links = document.querySelectorAll(".navLink");
const dot = document.querySelector(".dot");

// Parallax
const target = document.querySelectorAll(".paralax");

// Cursor
const mouseCursor = document.querySelector(".cursor");
const cursorText = document.querySelector(".cursorDot");

// Section two projce containers animation
const blocks = document.querySelectorAll(".block");

// Images container
const imgContainer = document.querySelectorAll(".projectImageContainer");

// Images
const images = document.querySelectorAll(".projectImage");

// Buttons
const btns = document.querySelectorAll("button");

/* FUNCTIONS */

// Open / Close Navbar
const toggleNav = () => {
  // Toggles navbar lines
  navBtn.classList.toggle("activeNav");
  // Opens navbar
  navLinksWrapper.classList.toggle("active");
  // Change color of toggle theme btn when opening nav
  toggleThemeBtn.classList.toggle("navActive");
  logo.classList.toggle("logoActive");
  mouseCursor.classList.toggle("navActive");

  // Stops scrolling if nav is active
  if (navBtn.classList.contains("activeNav")) {
    document.body.scroll = "no";
    // document.body.style.overflow = "hidden";
    document.body.classList.add("hidden");
  } else {
    document.body.scroll = "yes";
    // document.body.style.overflow = "unset";
    document.body.classList.remove("hidden");
  }
};

// Theme
let theme = JSON.parse(localStorage.getItem("theme"));

if (theme) {
  document.body.classList.add("darkTheme");
} else {
  document.body.classList.remove("darkTheme");
}

const toggleTheme = () => {
  // Changes root styles in body
  document.body.classList.toggle("darkTheme");

  // Moves toggle dot
  dot.classList.toggle("activeTheme");

  // If body contains dark theme set it in local, else remove it
  if (document.body.classList.contains("darkTheme")) {
    localStorage.setItem("theme", JSON.stringify("darkTheme"));
  } else {
    localStorage.removeItem("theme");
  }
};

// Hie navbar on scroll
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

// parallax text
const parallax = () => {
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

// Close nav on link click
links.forEach((link) => {
  link.addEventListener("click", toggleNav);
  nav.style.top = "-100px";
  toggleNav();
});

// Observer for section two container animations
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  },
  {
    threshold: 0.5,
  }
);

blocks.forEach((block) => {
  observer.observe(block);
});

// Lazy Loading for images
const lazyLoad = (target) => {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute("data-lazy");

        img.setAttribute("src", src);

        observer.disconnect();
      }
    });
  });

  io.observe(target);
};

// Cursor Positioning
const cursorCircle = (e) => {
  mouseCursor.style.top = e.clientY + "px";
  mouseCursor.style.left = e.clientX + "px";
};

// Crusor grow on hover
const aTags = document.querySelectorAll("a");

aTags.forEach((link) => {
  link.addEventListener("mouseover", () => {
    mouseCursor.classList.add("cursor-grow");
    cursorText.style.scale = 1;
  });

  link.addEventListener("mouseleave", () => {
    mouseCursor.classList.remove("cursor-grow");
    cursorText.style.scale = 0;
  });
});

/* FUNCTION CALLS */

// Move cursor
window.addEventListener("mousemove", cursorCircle);

// Navbar toggle
navBtn.addEventListener("click", toggleNav);
toggleThemeBtn.addEventListener("click", toggleTheme);

// Text parallax
window.addEventListener("scroll", parallax);

// Lazy load images
images.forEach(lazyLoad);
