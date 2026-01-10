async function loadProjects() {
  const res = await fetch("../data/projects.json").catch(() => null);

  // If the page is not in /projects/, the relative path above may fail.
  // Try the root-relative alternative for pages at the root.
  if (!res || !res.ok) {
    const res2 = await fetch("data/projects.json");
    if (!res2.ok) throw new Error("Could not load projects.json");
    return await res2.json();
  }

  return await res.json();
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderProjectCard(project) {
  const tags = (project.tags || [])
    .map(t => `<span class="tag">${escapeHtml(t)}</span>`)
    .join("");

  const codeBtn = project.links?.code
    ? `<a class="btn" href="${escapeHtml(project.links.code)}" target="_blank" rel="noopener">Code</a>`
    : "";

  const demoBtn = project.links?.demo
    ? `<a class="btn" href="${escapeHtml(project.links.demo)}" target="_blank" rel="noopener">Demo</a>`
    : "";

  return `
    <article class="card project-card">
      <div class="project-thumb" aria-hidden="true">
        <div class="thumb-text">${escapeHtml(project.thumbnailText || "")}</div>
      </div>
      <div class="card-inner">
        <h3>${escapeHtml(project.title)}</h3>
        <p class="muted">${escapeHtml(project.summary || "")}</p>

        <div class="project-meta">
          ${tags}
        </div>

        <div class="actions" style="margin-top: 12px;">
          <a class="btn primary" href="${escapeHtml(project.links?.details || "#")}">Details</a>
          ${codeBtn}
          ${demoBtn}
        </div>
      </div>
    </article>
  `;
}

function renderProjectDetail(project) {
  const tags = (project.tags || [])
    .map(t => `<span class="pill">${escapeHtml(t)}</span>`)
    .join("");

  const approach = (project.content?.approach || [])
    .map(x => `<li>${escapeHtml(x)}</li>`)
    .join("");

  const results = (project.content?.results || [])
    .map(x => `<li>${escapeHtml(x)}</li>`)
    .join("");

  const tools = (project.content?.tools || [])
    .map(x => `<span class="tag">${escapeHtml(x)}</span>`)
    .join("");

  const codeLink = project.links?.code
    ? `<a class="btn" href="${escapeHtml(project.links.code)}" target="_blank" rel="noopener">View Code</a>`
    : "";

  const demoLink = project.links?.demo
    ? `<a class="btn" href="${escapeHtml(project.links.demo)}" target="_blank" rel="noopener">View Demo</a>`
    : "";

  return `
    <div class="card">
      <div class="card-inner">
        <p class="kicker">${escapeHtml(project.date || "")} • ${escapeHtml(project.role || "")}</p>
        <h1>${escapeHtml(project.title)}</h1>
        <p class="muted">${escapeHtml(project.summary || "")}</p>

        <div class="pills" style="margin-top: 12px;">
          ${tags}
        </div>

        <div class="actions" style="margin-top: 14px;">
          <a class="btn" href="../projects.html">← Back to Projects</a>
          ${codeLink}
          ${demoLink}
        </div>
      </div>

      <div class="section">
        <h2>Problem</h2>
        <p class="muted">${escapeHtml(project.content?.problem || "")}</p>
      </div>

      <div class="section">
        <h2>Approach</h2>
        <ul class="bullets">
          ${approach}
        </ul>
      </div>

      <div class="section">
        <h2>Results</h2>
        <ul class="bullets">
          ${results}
        </ul>
      </div>

      <div class="section">
        <h2>Tools</h2>
        <div class="project-meta">
          ${tools}
        </div>
      </div>
    </div>
  `;
}

function parseProjectDate(p) {
  // Accepts "YYYY-MM" or "YYYY-MM-DD"; fallback to 0 if missing
  const s = String(p?.date ?? "");
  if (!s) return 0;
  const d = new Date(s.length === 7 ? `${s}-01` : s);
  return Number.isFinite(d.getTime()) ? d.getTime() : 0;
}

function getHeroImage(project) {
  return project?.images?.hero || "";
}

function getGalleryImages(project) {
  const items = normalizeGallery(project?.images?.gallery);
  return items.map(x => x.src).filter(Boolean);
}

function renderMosaicTile({ imgSrc, title, subtitle, href, span2 = false, tall = false }) {
  const resolved = imgSrc ? resolveAssetPath(imgSrc) : "";
  return `
    <a class="mosaic-tile ${span2 ? "span-2" : ""}" href="${escapeHtml(href)}">
      <div class="mosaic-media ${tall ? "tall" : ""}">
        ${resolved ? `<img src="${escapeHtml(resolved)}" alt="${escapeHtml(title)}" loading="lazy" />` : ""}
        <div class="mosaic-overlay" aria-hidden="true"></div>
        <div class="mosaic-text">
          <div class="mosaic-title">${escapeHtml(title)}</div>
          ${subtitle ? `<div class="mosaic-sub">${escapeHtml(subtitle)}</div>` : ""}
        </div>
      </div>
    </a>
  `;
}

async function initHomeMosaic() {
  const mount = document.getElementById("home-mosaic");
  if (!mount) return;

  const projects = await loadProjects();

  // Prefer featured projects if you use that flag; otherwise use all.
  const pool = projects.some(p => p.featured) ? projects.filter(p => p.featured) : projects;

  // Sort by date descending (newest first) so the mosaic feels current.
  const sorted = [...pool].sort((a, b) => parseProjectDate(b) - parseProjectDate(a));

  // Pick Row 1 hero: first project that has a hero image
  const hero1Project = sorted.find(p => getHeroImage(p));
  // Pick Row 3 hero: next project with a hero image (different from hero1)
  const hero2Project = sorted.find(p => getHeroImage(p) && p.id !== hero1Project?.id);

  // Pick two gallery images for Row 2, across projects (skip hero images if they match)
  const galleryCandidates = [];
  for (const p of sorted) {
    const hero = getHeroImage(p);
    for (const g of getGalleryImages(p)) {
      if (g && g !== hero) {
        galleryCandidates.push({ project: p, src: g });
      }
      if (galleryCandidates.length >= 2) break;
    }
    if (galleryCandidates.length >= 2) break;
  }

  // Build tiles in the exact pattern:
  // Row 1: 1 hero (span-2)
  // Row 2: 2 gallery (normal)
  // Row 3: 1 hero (span-2)
  const tiles = [];

  if (hero1Project) {
    tiles.push(renderMosaicTile({
      imgSrc: getHeroImage(hero1Project),
      title: hero1Project.title,
      subtitle: hero1Project.summary || "",
      href: hero1Project.links?.details || "projects.html",
      span2: true,
      tall: true
    }));
  }

  for (const g of galleryCandidates) {
    tiles.push(renderMosaicTile({
      imgSrc: g.src,
      title: g.project.title,
      subtitle: "Gallery highlight",
      href: g.project.links?.details || "projects.html",
      span2: false,
      tall: false
    }));
  }

  if (hero2Project) {
    tiles.push(renderMosaicTile({
      imgSrc: getHeroImage(hero2Project),
      title: hero2Project.title,
      subtitle: hero2Project.summary || "",
      href: hero2Project.links?.details || "projects.html",
      span2: true,
      tall: true
    }));
  }

  // If images are missing (early setup), show a friendly fallback.
  if (tiles.length === 0) {
    mount.innerHTML = `<p class="muted">Add hero/gallery images in <code>data/projects.json</code> to populate highlights.</p>`;
    return;
  }

  mount.innerHTML = tiles.join("");
}

async function initProjectsPage() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const projects = await loadProjects();
  grid.innerHTML = projects.map(renderProjectCard).join("");
}

function renderFeaturedTile(project) {
  const imgPath = getCardImage(project); // uses hero -> gallery[0] -> none
  const imgHtml = imgPath
    ? `<img src="${escapeHtml(resolveAssetPath(imgPath))}" alt="${escapeHtml(project.title)}" loading="lazy" />`
    : "";

  const tags = (project.tags || []).slice(0, 3)
    .map(t => `<span class="tag">${escapeHtml(t)}</span>`)
    .join("");

  return `
    <a class="card featured-tile" href="${escapeHtml(project.links?.details || "projects.html")}">
      <div class="featured-media">
        ${imgHtml}
        <div class="featured-overlay" aria-hidden="true"></div>
        <div class="featured-text">
          <div class="featured-title">${escapeHtml(project.title)}</div>
          <div class="featured-meta">
            ${tags}
          </div>
        </div>
      </div>
    </a>
  `;
}

async function initHomeFeaturedSection() {
  const mount = document.getElementById("featured-projects");
  if (!mount) return;

  const projects = await loadProjects();

  // Pick first N projects; you can sort here if you want.
  const featured = projects.slice(0, 6);

  mount.innerHTML = featured.map(renderFeaturedTile).join("");
}

async function initProjectDetailPage() {
  const mount = document.getElementById("project-detail");
  if (!mount) return;

  const projectId = mount.getAttribute("data-project-id");
  if (!projectId) {
    mount.innerHTML = `<p class="muted">Missing data-project-id.</p>`;
    return;
  }

  const projects = await loadProjects();
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    mount.innerHTML = `<p class="muted">Project not found: ${escapeHtml(projectId)}</p>`;
    return;
  }

  mount.innerHTML = renderProjectDetail(project);
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await initProjectsPage();
    await initProjectDetailPage();
    await initHomeMosaic();
  } catch (err) {
    console.error(err);
  }
});
