// deno-lint-ignore-file

const $navbar = document.querySelector("nav.navbar");
const $intro = document.querySelector("#intro");

// navbar UI updates when scrolling
(function () {
  function update (event) {
    const offset = $intro.scrollTop 
      + $intro.offsetHeight
      - $navbar.offsetHeight;

    $intro.querySelector(".wreath").classList.toggle("is-hidden", window.scrollY > 200);
    $navbar.classList.toggle("has-scrolled", window.scrollY > 1);
    $navbar.classList.toggle("is-overlay", window.scrollY < offset);
    $navbar.classList.toggle("is-inverted", window.scrollY >= offset);
  }
  window.addEventListener("scroll", update);
  document.addEventListener("DOMContentLoaded", update);
})();

// smooth scrolling on click
(function () {
  function scroll (event) {
    event.preventDefault();
    const ref = event.currentTarget.getAttribute("href");
    document.querySelector(ref).scrollIntoView({
      behavior: "smooth",
    });
  };
  document.querySelectorAll("a.--fx-scroll").forEach(function (elem) {
    elem.addEventListener("click", scroll);
  });
})();

// intro animations
(function () {
  let __animation;

  function update_move (event) {
    if (window.scrollY > 200) {
      $intro.classList.toggle("--hover-left", false);
      $intro.classList.toggle("--hover-right", false);
      return;
    }

		__animation = window.requestAnimationFrame(function () {
      const th = 100;
      const rect = $intro.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      const posX = (mouseX - rect.left);
      const posY = (mouseY - rect.top);

			$intro.firstElementChild.style.transformOrigin = posX + 'px' + ' ' + posY + 'px';
      $intro.classList.toggle("--hover-left", mouseX < centerX - th);
      $intro.classList.toggle("--hover-right", mouseX > centerX + th);
		});
  }

  function update_orientation (event) {
    if (window.scrollY > (window.innerHeight || window.screen.height))
      return;
    
		__animation = window.requestAnimationFrame(function () {
      const th = 10;
      const ratio = 3;
      const rect = $intro.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const beta = event.beta - 60; // y
      const gamma = event.gamma; // x
      let posX = centerX + (gamma/rect.width * 1000 * ratio);
      let posY = centerY + (beta/rect.width * 500 * ratio);

      if (posX < 0)
        posX = 0;
      if (posX > rect.width)
        posX = rect.width;

      if (posY < 0)
        posY = 0;
      if (posY > rect.height)
        posY = rect.height;

      $intro.firstElementChild.style.transformOrigin = posX + 'px' + ' ' + posY + 'px';
      $intro.classList.toggle("--hover-left", gamma < 0 - th);
      $intro.classList.toggle("--hover-right", gamma > 0 + th);
		});
  }

  window.addEventListener("mousemove", update_move);
  window.addEventListener("deviceorientation", update_orientation, true);
})();
