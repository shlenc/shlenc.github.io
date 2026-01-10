import { PROJECTS } from "./projects-data.js";
import { icon, setActiveNav } from "./main.js";

function getProjectId(){
  const params = new URLSearchParams(location.search);
  return params.get("id");
}
function byId(id){ return PROJECTS.find(p => p.id === id); }
function setText(sel, value){ const el = document.querySelector(sel); if (el) el.textContent = value ?? ""; }
function setHtml(sel, html){ const el = document.querySelector(sel); if (el) el.innerHTML = html ?? ""; }

function list(items){
  if (!items?.length) return `<p class="muted">—</p>`;
  return `<ul class="list">${items.map(x => `<li>${x}</li>`).join("")}</ul>`;
}

function renderLinks(links){
  const row = document.querySelector("#linkRow");
  row.innerHTML = "";

  const btn = (label, href, primary=false) => {
    if (!href || href === "#") return null;
    const a = document.createElement("a");
    a.className = "btn" + (primary ? " primary" : "");
    a.href = href; a.target = "_blank"; a.rel = "noopener noreferrer";
    a.appendChild(icon("link"));
    a.appendChild(document.createTextNode(label));
    return a;
  };

  const a1 = btn("GitHub", links?.github, false);
  const a2 = btn("Report / Write-up", links?.report, true);
  [a2, a1].filter(Boolean).forEach(a => row.appendChild(a));

  if (!row.children.length){
    row.innerHTML = `<span class="muted">Add links in <code>js/projects-data.js</code> to show buttons here.</span>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();

  const id = getProjectId() || PROJECTS[0]?.id;
  const p = byId(id);

  if (!p){
    document.querySelector("main").innerHTML = `
      <div class="container">
        <div class="card pad">
          <h2 style="margin-top:0;">Project not found</h2>
          <p class="muted">The project id in the URL doesn't match any entries in <code>js/projects-data.js</code>.</p>
          <a class="btn primary" href="projects.html">Back to Projects</a>
        </div>
      </div>`;
    return;
  }

  setText("#projectTitle", p.title);
  setText("#projectSubtitle", p.subtitle);

  const heroImg = document.querySelector("#projectHeroImg");
  heroImg.src = p.heroImage;
  heroImg.alt = `Hero image for ${p.title}`;

  setText("#projectYear", p.year);
  setText("#projectRole", p.role);
  setHtml("#projectTags", (p.tags || []).map(t => `<span class="chip">${t}</span>`).join(""));

  setText("#summaryText", p.summary);
  setText("#problemText", p.problem);
  setHtml("#solutionList", list(p.solutionBullets));
  setHtml("#resultsList", list(p.resultsBullets));
  setHtml("#toolsList", list(p.tools));

  const gal = document.querySelector("#gallery");
  gal.innerHTML = "";
  (p.gallery || []).slice(0,9).forEach((src, idx) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Gallery image ${idx+1} for ${p.title}`;
    gal.appendChild(img);
  });

  renderLinks(p.links);
});
