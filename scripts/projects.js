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

async function initProjectsPage() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const projects = await loadProjects();
  grid.innerHTML = projects.map(renderProjectCard).join("");
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
  } catch (err) {
    console.error(err);
  }
});
