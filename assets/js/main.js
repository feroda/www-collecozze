(() => {
  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Chiudi il menu" : "Apri il menu");
      links.classList.toggle("is-open", open);
    });

    links.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Apri il menu");
      }
    });
  }

  const carousel = document.querySelector(".carousel");
  if (carousel) {
    const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
    const indicators = Array.from(carousel.querySelectorAll(".carousel-indicator"));
    const previous = carousel.querySelector(".carousel-prev");
    const next = carousel.querySelector(".carousel-next");
    const status = carousel.querySelector(".carousel-status");
    let current = 0;
    let touchStart = null;

    const showSlide = (index) => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        slide.hidden = slideIndex !== current;
        indicators[slideIndex].setAttribute("aria-current", String(slideIndex === current));
      });

      const title = slides[current].querySelector("figcaption span:last-child").textContent.trim();
      status.textContent = `Illustrazione ${current + 1} di ${slides.length}: ${title}`;
    };

    previous.addEventListener("click", () => showSlide(current - 1));
    next.addEventListener("click", () => showSlide(current + 1));
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => showSlide(index));
    });

    carousel.addEventListener("keydown", (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showSlide(current - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showSlide(current + 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        showSlide(0);
      } else if (event.key === "End") {
        event.preventDefault();
        showSlide(slides.length - 1);
      }
    });

    carousel.addEventListener("touchstart", (event) => {
      const touch = event.changedTouches[0];
      touchStart = { x: touch.clientX, y: touch.clientY };
    }, { passive: true });

    carousel.addEventListener("touchend", (event) => {
      if (!touchStart) return;
      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - touchStart.x;
      const deltaY = touch.clientY - touchStart.y;
      if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY)) {
        showSlide(current + (deltaX < 0 ? 1 : -1));
      }
      touchStart = null;
    }, { passive: true });
  }

  const year = document.querySelector("#anno");
  if (year) year.textContent = String(new Date().getFullYear());
})();
