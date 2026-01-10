import { PROJECTS } from "./projects-data.js";
import { getAllTags, setActiveNav } from "./main.js";

function matches(project, query, tag) {
  const q = (query || "").trim().toLowerCase();
  const hay = [project.title, project.subtitle, project.summary, (project.tags || []).join(" ")].join(" ").toLowerCase();
  const qOk = !q || hay.includes(q);
  const tOk = !tag || tag === "All" || (project.tags || []).includes(tag);
  return qOk && tOk;
}

function card(project){
  const a = document.createElement("a");
  a.className = "project-card";
  a.href = `project.html?id=${encodeURIComponent(project.id)}`;
  a.innerHTML = `
    <div class="thumb"><img src="${project.heroImage}" alt="Preview image for ${project.title}"></div>
    <div class="body">
      <div class="title">${project.title}</div>
      <div class="sub">${project.subtitle}</div>
      <div class="meta">${(project.tags || []).slice(0,4).map(t => `<span class="chip">${t}</span>`).join("")}</div>
    </div>`;
  return a;
}

function renderCards({query="", tag="All"} = {}) {
  const wrap = document.querySelector("#projectCards");
  wrap.innerHTML = "";
  const filtered = PROJECTS.filter(p => matches(p, query, tag));
  if (!filtered.length){
    wrap.innerHTML = `<div class="card pad"><p class="muted" style="margin:0;">No projects match your filters.</p></div>`;
    return;
  }
  filtered.forEach(p => wrap.appendChild(card(p)));
}

function renderPills(){
  const pills = document.querySelector("#tagPills");
  const tags = ["All", ...getAllTags()];
  pills.innerHTML = "";
  tags.forEach((t, idx) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "pill" + (idx === 0 ? " active" : "");
    b.textContent = t;
    b.addEventListener("click", () => {
      pills.querySelectorAll(".pill").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      const q = document.querySelector("#searchInput").value;
      renderCards({query: q, tag: t});
    });
    pills.appendChild(b);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  renderPills();
  renderCards();
  const input = document.querySelector("#searchInput");
  input.addEventListener("input", () => {
    const q = input.value;
    const active = document.querySelector("#tagPills .pill.active")?.textContent || "All";
    renderCards({query: q, tag: active});
  });
});
