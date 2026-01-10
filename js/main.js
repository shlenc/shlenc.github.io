import { PROJECTS } from "./projects-data.js";

/** Mark the current page active in the nav */
export function setActiveNav() {
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("[data-nav]").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    const isActive =
      (path === "" && href.includes("index.html")) ||
      (path === "index.html" && href.includes("index.html")) ||
      (path === "projects.html" && href.includes("projects.html")) ||
      (path === "resume.html" && href.includes("resume.html")) ||
      (path === "project.html" && href.includes("projects.html")); // detail highlights Projects
    a.classList.toggle("active", isActive);
  });
}

/** Utility: unique tags across all projects */
export function getAllTags() {
  const s = new Set();
  PROJECTS.forEach(p => (p.tags || []).forEach(t => s.add(t)));
  return Array.from(s).sort((a,b) => a.localeCompare(b));
}

/** Utility: inline SVG icons */
export function icon(name) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  svg.innerHTML = ({
    "download": '<path fill="currentColor" d="M12 3a1 1 0 0 1 1 1v9.6l2.3-2.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L11 13.6V4a1 1 0 0 1 1-1Z"/><path fill="currentColor" d="M5 20a1 1 0 0 1-1-1v-2a1 1 0 1 1 2 0v1h12v-1a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1H5Z"/>',
    "link": '<path fill="currentColor" d="M10.6 13.4a1 1 0 0 1 0-1.4l3.4-3.4a1 1 0 1 1 1.4 1.4l-3.4 3.4a1 1 0 0 1-1.4 0Z"/><path fill="currentColor" d="M8.5 16.5a4 4 0 0 1 0-5.7l1.4-1.4a1 1 0 1 1 1.4 1.4L9.9 12.2a2 2 0 0 0 0 2.9a2 2 0 0 0 2.9 0l1.4-1.4a1 1 0 1 1 1.4 1.4l-1.4 1.4a4 4 0 0 1-5.7 0Z"/><path fill="currentColor" d="M15.5 7.5a4 4 0 0 1 0 5.7l-1.4 1.4a1 1 0 0 1-1.4-1.4l1.4-1.4a2 2 0 0 0 0-2.9a2 2 0 0 0-2.9 0l-1.4 1.4a1 1 0 1 1-1.4-1.4l1.4-1.4a4 4 0 0 1 5.7 0Z"/>'
  })[name] || "";
  return svg;
}
