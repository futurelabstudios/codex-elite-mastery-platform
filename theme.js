const THEME_KEY = "futurelab_theme_mode";

function prefersDark() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function resolveInitialTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return prefersDark() ? "dark" : "light";
}

function setTheme(theme) {
  const normalized = theme === "light" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", normalized);
  localStorage.setItem(THEME_KEY, normalized);

  document.querySelectorAll("[data-theme-set]").forEach((button) => {
    const active = button.dataset.themeSet === normalized;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

function initTheme() {
  setTheme(resolveInitialTheme());

  document.querySelectorAll("[data-theme-set]").forEach((button) => {
    button.addEventListener("click", () => {
      const theme = button.dataset.themeSet;
      setTheme(theme);
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTheme);
} else {
  initTheme();
}
