import { setActiveNav, icon } from "./main.js";

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  const dl = document.querySelector("#downloadBtn");
  if (dl) dl.prepend(icon("download"));
});
