import { PROJECTS } from "./projects-data.js";
import { setActiveNav } from "./main.js";

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  const mosaic = document.querySelector("#mosaic");
  if (!mosaic) return;

  const p1 = PROJECTS[0];
  const p2 = PROJECTS[1] || PROJECTS[0];
  const p3 = PROJECTS[2] || PROJECTS[0];

  const tiles = [
    { cls: "tile hero1", project: p1, img: p1.heroImage, label: p1.title, sub: p1.subtitle },
    // { cls: "tile gal1",  project: p2, img: (p2.gallery?.[0] || p2.heroImage), label: p2.title, sub: p2.subtitle },
    // { cls: "tile gal2",  project: p3, img: (p3.gallery?.[1] || p3.heroImage), label: p3.title, sub: p3.subtitle },
    { cls: "tile hero2", project: p2, img: p2.heroImage, label: p2.title, sub: p2.subtitle },
  ];

  mosaic.innerHTML = "";
  tiles.forEach(t => {
    const a = document.createElement("a");
    a.className = t.cls;
    a.href = `project.html?id=${encodeURIComponent(t.project.id)}`;
    a.innerHTML = `
      <img src="${t.img}" alt="Preview for ${t.label}">
      <div class="cap"><strong>${t.label}</strong><span>${t.sub}</span></div>
    `;
    mosaic.appendChild(a);
  });
});
