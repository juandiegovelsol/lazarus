const el = (sel, par) => (par || document).querySelector(sel);
const els = (sel, par) => (par || document).querySelectorAll(sel);
const elNew = (tag, prop) => Object.assign(document.createElement(tag), prop);

// Helper functions:

const mod = (n, m) => ((n % m) + m) % m;

// Task: Carousel:

const carousel = (elCarousel) => {
  const animation = 666;
  // const pause = 5000;
  // Or use something like: const animation = Math.abs(elCarousel.dataset.carouselAnimation ?? 500);

  const elCarouselSlider = el(".product-slider", elCarousel);
  const elsSlides = els(".product-card", elCarouselSlider);
  const elsBtns = [];

  let itv; // Autoslide interval
  let tot = elsSlides.length; // Total slides
  let c = 0;

  // Methods:
  const anim = (ms = animation) => {
    const cMod = mod(c, tot);
    console.log("hello");
    console.log(c);
    console.log(cMod);
    // Move slider
    elCarouselSlider.style.transitionDuration = `${ms}ms`;
    elCarouselSlider.style.transform = `translateX(${(-c - 1) * 25}%)`;
    // Handle active classes (slide and bullet)
    elsSlides.forEach((elSlide, i) =>
      elSlide.classList.toggle("is-active", cMod === i)
    );
    elsBtns.forEach((elBtn, i) =>
      elBtn.classList.toggle("is-active", cMod === i)
    );
  };

  const prev = () => {
    c -= 1;
    anim();
  };

  const next = () => {
    c += 1;
    anim();
  };

  // Buttons:

  const elPrev = elNew("button", {
    type: "button",
    className: "carousel-prev",
    innerHTML: "<span>&lt;</span>",
    onclick: () => prev(),
  });

  const elNext = elNew("button", {
    type: "button",
    className: "carousel-next",
    innerHTML: "<span>&gt;</span>",
    onclick: () => next(),
  });

  // Events:

  // Infinite slide effect:
  elCarouselSlider.addEventListener("transitionend", () => {
    if (c <= -1) c = tot - 1;
    if (c >= tot) c = 0;
    anim(0); // quickly switch to "c" slide (with animation duration 0)
  });

  // Init:

  // Insert UI elements:
  // elNavigation.append(...elsBtns);
  elCarousel.append(elPrev, elNext);

  // Clone first and last slides (for "infinite" slider effect)
  elCarouselSlider.prepend(elsSlides[tot - 1].cloneNode(true));
  elCarouselSlider.prepend(elsSlides[tot - 2].cloneNode(true));
  elCarouselSlider.append(elsSlides[0].cloneNode(true));
  elCarouselSlider.append(elsSlides[1].cloneNode(true));
  elCarouselSlider.append(elsSlides[2].cloneNode(true));

  // Initial slide
  anim(0);
};

// Allows to use multiple carousels on the same page:
els(".product-scroll-container").forEach(carousel);
