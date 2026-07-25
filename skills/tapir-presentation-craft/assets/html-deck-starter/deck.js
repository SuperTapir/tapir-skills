(() => {
  if (globalThis.lucide?.createIcons) globalThis.lucide.createIcons();

  const STAGE_WIDTH = 1920;
  const STAGE_HEIGHT = 1080;
  const stage = document.querySelector("[data-deck-stage]");
  const slides = [...document.querySelectorAll("[data-slide]")];
  const dots = document.querySelector("[data-dots]");
  const progress = document.querySelector("[data-progress]");
  const previous = document.querySelector("[data-prev]");
  const next = document.querySelector("[data-next]");

  if (!stage || slides.length === 0) return;

  let current = 0;
  let wheelLocked = false;

  const pad = (value) => String(value).padStart(2, "0");

  function scaleStage() {
    const scale = Math.min(
      window.innerWidth / STAGE_WIDTH,
      window.innerHeight / STAGE_HEIGHT,
    );
    stage.style.setProperty("--deck-scale", String(scale));
  }

  function restartSlide(slide) {
    slide.querySelectorAll("[data-animate]").forEach((element) => {
      element.getAnimations().forEach((animation) => animation.cancel());
    });
    void slide.offsetWidth;
  }

  function showSlide(index, { updateHash = true } = {}) {
    current = Math.max(0, Math.min(index, slides.length - 1));

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === current;
      slide.dataset.active = String(isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
      if (isActive) restartSlide(slide);
    });

    [...dots.querySelectorAll("button")].forEach((button, dotIndex) => {
      if (dotIndex === current) {
        button.setAttribute("aria-current", "page");
      } else {
        button.removeAttribute("aria-current");
      }
    });

    progress.value = `${pad(current + 1)} / ${pad(slides.length)}`;
    previous.disabled = current === 0;
    next.disabled = current === slides.length - 1;

    if (updateHash) history.replaceState(null, "", `#${current + 1}`);
  }

  slides.forEach((slide, index) => {
    slide.dataset.slide = slide.dataset.slide || String(index + 1);
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `跳到第 ${index + 1} 页`);
    button.addEventListener("click", () => showSlide(index));
    item.append(button);
    dots.append(item);
  });

  previous.addEventListener("click", () => showSlide(current - 1));
  next.addEventListener("click", () => showSlide(current + 1));

  window.addEventListener("keydown", (event) => {
    if (["ArrowRight", "PageDown", " "].includes(event.key)) {
      event.preventDefault();
      showSlide(current + 1);
    }
    if (["ArrowLeft", "PageUp"].includes(event.key)) {
      event.preventDefault();
      showSlide(current - 1);
    }
    if (event.key === "Home") showSlide(0);
    if (event.key === "End") showSlide(slides.length - 1);
  });

  window.addEventListener(
    "wheel",
    (event) => {
      if (wheelLocked || Math.abs(event.deltaY) < 24) return;
      wheelLocked = true;
      showSlide(current + Math.sign(event.deltaY));
      window.setTimeout(() => {
        wheelLocked = false;
      }, 520);
    },
    { passive: true },
  );

  window.addEventListener("resize", scaleStage);
  window.addEventListener("hashchange", () => {
    const requested = Number.parseInt(location.hash.slice(1), 10);
    if (Number.isFinite(requested)) showSlide(requested - 1, { updateHash: false });
  });

  scaleStage();
  const initial = Number.parseInt(location.hash.slice(1), 10);
  showSlide(Number.isFinite(initial) ? initial - 1 : 0);
})();
