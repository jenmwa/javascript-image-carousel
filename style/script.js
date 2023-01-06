// ****************************************************************************************************
// -------------------------------------------------- DECLARE VARIABLES -------------------------------
// ****************************************************************************************************
const images = [
  {
    url: 'assets/myles-kennedy_photoBy_Jenny-Waller.webp',
    alt: 'Alter Bridge live photo by Jenny Waller',
  },
  {
    url: 'assets/avatar_photoBy_Jenny-Waller.webp',
    alt: 'Avatar live photo by Jenny Waller',
  },
  {
    url: 'assets/hank_photoBy_Jenny-Waller.webp',
    alt: 'Hank von Hell live photo by Jenny Waller',
  },
  {
    url: 'assets/ghost_photoBy_Jenny-Waller.webp',
    alt: 'Ghost live photo by Jenny Waller',
  },
  {
    url: 'assets/gerstner_photoBy_Jenny-Waller.webp',
    alt: 'Helloween live photo by Jenny Waller',
  },
  {
    url: 'assets/rammstein_photoBy_Jenny-Waller.webp',
    alt: 'Rammstein live photo by Jenny Waller',
  },
  {
    url: 'assets/myrkur_photoBy_Jenny-Waller.webp',
    alt: 'Myrkur live photo by Jenny Waller',
  },
  {
    url: 'assets/behemoth_photoBy_Jenny-Waller.webp',
    alt: 'Behemoth live photo by Jenny Waller',
  },
  {
    url: 'assets/in-flames_photoBy_Jenny-Waller.webp',
    alt: 'In Flames live photo by Jenny Waller',
  },
  {
    url: 'assets/tobias-sammet_photoBy_Jenny-Waller.webp',
    alt: 'Avantasia live photo by Jenny Waller',
  },
];

const img1 = document.querySelector('#img1');
const img2 = document.querySelector('#img2');

const nextBtn = document.querySelector('#nextImage');
const prevBtn = document.querySelector('#prevImage');

const slideshow = document.querySelector('#slideshow');

let currentImgIndex = 0;

let indicatorDots;

let moveForwardTimer = null;

let opacityTimer = null;
let opacity = 100;
let firstImageOnTop = true;
const fadeTimeInSec = 0.5;

// ****************************************************************************************************
// -------------------------------------------------- DECLARE FUNCTIONS -------------------------------
// ****************************************************************************************************

function highlightDot() {
  // Reset all dots
  indicatorDots.forEach((dot, index) => {
    if (index === currentImgIndex) {
      dot.classList.add('selected');
    } else {
      dot.classList.remove('selected');
    }
  });
}

function changeOpacity() {
  opacity -= 10;

  if (opacity <= -10) {
    clearInterval(opacityTimer);
    firstImageOnTop = !firstImageOnTop;
    opacity = 100;
  } else if (firstImageOnTop) {
    img1.style.opacity = `${opacity}%`;
    img2.style.opacity = `${100 - opacity}%`;
  } else {
    img2.style.opacity = `${opacity}%`;
    img1.style.opacity = `${100 - opacity}%`;
  }
}

function swapImages(fadeOut, fadeIn) {
  const img1X = firstImageOnTop ? img1 : img2;
  const img2X = firstImageOnTop ? img2 : img1;

  img1X.setAttribute('src', images[fadeOut].url);
  img1X.setAttribute('alt', images[fadeOut].alt);

  img2X.setAttribute('src', images[fadeIn].url);
  img2X.setAttribute('alt', images[fadeIn].alt);

  if (firstImageOnTop) {
    img1.setAttribute('src', images[fadeOut].url);
    img1.setAttribute('alt', images[fadeOut].alt);

    img2.setAttribute('src', images[fadeIn].url);
    img2.setAttribute('alt', images[fadeIn].alt);
  } else {
    img2.setAttribute('src', images[fadeOut].url);
    img2.setAttribute('alt', images[fadeOut].alt);

    img1.setAttribute('src', images[fadeIn].url);
    img1.setAttribute('alt', images[fadeIn].alt);
  }

  opacityTimer = setInterval(changeOpacity, (fadeTimeInSec * 1000) / 10);
}

function nextImage() {
  if (currentImgIndex + 1 > images.length - 1) {
    // Restart from beginning
    currentImgIndex = 0;
    swapImages(images.length - 1, currentImgIndex);
  } else {
    currentImgIndex += 1;
    swapImages(currentImgIndex - 1, currentImgIndex);
  }
  highlightDot();
}

function prevImage() {
  if (currentImgIndex - 1 < 0) {
    // Restart from end
    currentImgIndex = images.length - 1;
    swapImages(0, currentImgIndex);
  } else {
    currentImgIndex -= 1;
    swapImages(currentImgIndex + 1, currentImgIndex);
  }
  highlightDot();
}

function goToImageIndex(e) {
  let { index } = e.currentTarget.dataset;
  index = Number(index);

  if (currentImgIndex === index) {
    return;
  }

  swapImages(currentImgIndex, index);
  currentImgIndex = index;
  highlightDot();
}

function createDots() {
  const dotsContainer = document.querySelector('#indicatorDots');
  for (let i = 0; i < images.length; i++) {
    dotsContainer.innerHTML += `
    <span class="dot" tabindex="0" data-index="${i}"></span>`;
  }
  indicatorDots = document.querySelectorAll('.dot');

  indicatorDots.forEach((dot) => {
    dot.addEventListener('click', goToImageIndex);
    dot.addEventListener('keypress', goToImageIndex);
  });

  highlightDot();
}

function autoPlay() {
  moveForwardTimer = setInterval(nextImage, 5000);
}

function pauseAutoplay() {
  clearInterval(moveForwardTimer);
}

function init() {
  img1.setAttribute('src', images[0].url);
  img1.setAttribute('alt', images[0].alt);

  img2.setAttribute('src', images[1].url);
  img2.setAttribute('alt', images[1].alt);
}

// ****************************************************************************************************
// -------------------------------------------------- EVENTLISTERS  -----------------------------------
// ****************************************************************************************************

nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

slideshow.addEventListener('mouseover', pauseAutoplay);
slideshow.addEventListener('mouseout', autoPlay);

createDots();
init();

nextImage();
autoPlay();
