/* ASELab shared branding and navigation. All navigation is local, relative HTML. */
(() => {
  "use strict";
  const config = window.ASE_CONFIG || {};
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const clean = (value) => String(value ?? "").normalize("NFC").replace(/\s+/g, " ").trim();
  const labName = clean(config.name) || "ASELab";
  const englishName = clean(config.englishName) || "AI and Security Engineering Lab";
  const koreanName = clean(config.koreanName) || "지능형 보안공학 연구실";

   $$(".ase-wordmark, .ase-hero-title").forEach((element) => {
    if (labName.endsWith("Lab")) {
      const accent = document.createElement("span");
      accent.textContent = labName.slice(0, -3);
      element.replaceChildren(accent, document.createTextNode("Lab"));
    } else {
      element.textContent = labName;
    }
  });
  $$("[data-lab-name]").forEach((element) => { element.textContent = labName; });
  $$("[data-korean-name]").forEach((element) => { element.textContent = koreanName; });
  const brandSub = $(".ase-brand-sub");
  if (brandSub) {
    brandSub.textContent = englishName.replace(" Engineering", "\nEngineering");
    brandSub.style.whiteSpace = "pre-line";
  }
  const brand = $(".ase-brand");
  if (brand) brand.setAttribute("aria-label", `${labName} 홈`);
  const pageTitle = document.body.dataset.pageTitle;
  document.title = pageTitle ? `${pageTitle} — ${labName}` : `${labName} — ${koreanName}`;
  $$("[data-english-name]").forEach(el => { el.textContent = englishName; });
  $$("[data-github-link]").forEach(el => {
    try {
      const url = new URL(config.githubUrl);
      if (url.protocol !== "https:" || url.hostname !== "github.com") return;
      el.href = url.href; el.hidden = false;
    } catch (_) { el.hidden = true; }
  });
  const year = $("#ase-year");
  if (year) year.textContent = String(new Date().getFullYear());

  const email = clean(config.email) || "geumhwan@korea.ac.kr";
  $$("[data-email-link]").forEach((element) => { element.href = `mailto:${email}`; });
  $$("[data-email-label]").forEach((element) => { element.textContent = email; });
  const universityName = $(".ase-university-name");
  const universityCampus = $(".ase-university-campus");
  if (universityName && clean(config.universityName)) universityName.textContent = config.universityName;
  if (universityCampus && clean(config.universityCampus)) universityCampus.textContent = config.universityCampus;

  // A configured root-relative asset also works from members/*.html.
  const logo = $("[data-university-logo]");
  const label = $("[data-university-label]");
  if (logo && label && clean(config.universityLogo)) {
    logo.addEventListener("load", () => { logo.hidden = false; label.hidden = true; });
    logo.addEventListener("error", () => { logo.hidden = true; label.hidden = false; });
    logo.classList.toggle("is-light", config.universityLogoBackground === "light");
    try {
      const root = new URL(document.body.dataset.siteRoot || "./", document.baseURI);
      const url = new URL(clean(config.universityLogo), root);
      if (["https:", "http:", "file:"].includes(url.protocol)) logo.src = url.href;
    } catch (_) {
      // Invalid or unavailable logo: the affiliation text remains visible.
    }
  }

  function initPortraits() {
    $$("[data-member-portrait]").forEach((img) => {
      if (img.dataset.portraitReady) return;
      img.dataset.portraitReady = "true";
      const fallback = img.parentElement.querySelector(".ase-portrait-fallback");
      const update = (failed) => {
        img.hidden = failed;
        if (fallback) fallback.hidden = !failed;
      };
      img.addEventListener("load", () => update(false));
      img.addEventListener("error", () => update(true));
      if (img.complete) update(img.naturalWidth === 0);
    });
  }
  initPortraits();
  document.addEventListener("ase:page-render", initPortraits);

  // Graceful fallback: all links stay visible when JavaScript is disabled.
  const menu = $("#main-nav");
  const menuButton = $(".ase-menu-button");
  if (!menu || !menuButton) return;
  const narrow = window.matchMedia("(max-width: 700px)");
  function setMenu(open, returnFocus = false) {
    menu.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    if (returnFocus) menuButton.focus();
  }
  function updateLayout() {
    menuButton.hidden = !narrow.matches;
    setMenu(false);
  }
  menuButton.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", (event) => { if (event.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") setMenu(false, true);
  });
  document.addEventListener("click", (event) => {
    if (narrow.matches && !event.target.closest(".ase-header")) setMenu(false);
  });
  if (narrow.addEventListener) narrow.addEventListener("change", updateLayout);
  else narrow.addListener(updateLayout);
  updateLayout();
  document.documentElement.classList.add("ase-js");
})();
