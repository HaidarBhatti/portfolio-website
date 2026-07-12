/*
  Reads portfolioData (from data.js) and renders every section.
  You shouldn't need to touch this file — edit data.js instead.
*/
(function () {
  const d = window.portfolioData;
  if (!d) {
    console.error(
      "portfolioData not found — make sure data.js is loaded before render.js",
    );
    return;
  }

  const esc = (str) =>
    String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  // ---------- Live experience calculation ----------
  // Computes years of experience from config.experienceStartDate, as of
  // right now. Updates automatically every time the page loads — no
  // manual "X years" edits needed ever again.
  function calcExperience(startDateStr) {
    const start = new Date(startDateStr + "T00:00:00");
    const now = new Date();
    const msPerYear = 1000 * 60 * 60 * 24 * 365.25;
    const years = Math.max(0, (now - start) / msPerYear);
    return {
      decimal: years.toFixed(1), // e.g. "7.4"
      rounded: Math.round(years), // e.g. 7
    };
  }
  const experience = calcExperience(d.config.experienceStartDate);

  // Replaces {{years}} -> "7.4" and {{yearsInt}} -> "7" in any string,
  // then escapes it. Use this instead of esc() for any text that should
  // reflect the live experience count.
  const t = (str) =>
    esc(
      String(str)
        .replace(/\{\{years\}\}/g, experience.decimal)
        .replace(/\{\{yearsInt\}\}/g, experience.rounded),
    );

  // ---------- Identity ----------
  document
    .querySelectorAll("[data-bind='identity.handle']")
    .forEach((el) => (el.textContent = d.identity.handle));

  // ---------- Hero ----------
  const hero = d.hero;
  document.getElementById("hero-terminal-line").textContent = hero.terminalLine;
  document.getElementById("hero-terminal-output").textContent =
    hero.terminalOutput;
  document.getElementById("hero-h1").innerHTML =
    `${t(hero.headlineLine1)}<br><span class="line2">${t(hero.headlineLine2)}</span><br>` +
    t(hero.headlineAccent).replace(
      /(now expanding into Flutter\.?)/i,
      '<span class="accent">$1</span>',
    );
  document.getElementById("hero-sub").textContent = t(hero.subtext);

  const statsEl = document.getElementById("hero-stats");
  statsEl.innerHTML = hero.stats
    .map(
      (s) => `
      <div>
        <div class="k">${esc(s.label)}</div>
        <div class="v">${t(s.value)}</div>
      </div>`,
    )
    .join("");

  const heroCta = document.getElementById("hero-cta");
  heroCta.innerHTML = `
    <a href="${esc(hero.primaryCta.href)}" class="btn btn-primary">${esc(hero.primaryCta.label)}</a>
    <a href="${esc(hero.secondaryCta.href)}" class="btn btn-ghost">${esc(hero.secondaryCta.label)}</a>
  `;

  // ---------- About + experience timeline ----------
  document.getElementById("about-heading").textContent = t(d.about.heading);
  document.getElementById("about-body").textContent = t(d.about.body);

  const epochWrap = document.getElementById("epoch-wrap");
  epochWrap.innerHTML = d.experience
    .map(
      (e) => `
      <div class="epoch">
        <div class="epoch-tag"><span class="yr">${esc(e.year)}</span>${esc(e.epoch)}${e.current ? " · current" : ""}</div>
        <div class="epoch-body">
          <h3>${esc(e.title)}${e.company ? ` <span class="epoch-company">— ${esc(e.company)}</span>` : ""}</h3>
          <p>${esc(e.description)}</p>
          <div class="epoch-tags">${e.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
        </div>
      </div>`,
    )
    .join("");

  // ---------- Skills ----------
  const skillsGrid = document.getElementById("skills-grid");
  skillsGrid.innerHTML = d.skills
    .map(
      (s) => `
      <div class="skill-card">
        <div class="icon-label">${esc(s.label)}</div>
        <h3>${esc(s.title)}</h3>
        <div class="skill-list">${s.items.map((i) => `<span>${esc(i)}</span>`).join("")}</div>
      </div>`,
    )
    .join("");

  // ---------- Projects (grouped by type: Company vs Personal) ----------
  const projectCard = (p) => `
      <div class="project">
        <div>
          <div class="project-head">
            <h3>${esc(p.title)}</h3>
            <span class="status">${esc(p.status)}</span>
          </div>
          <p>${esc(p.description)}</p>
          <div class="stack">${p.stack.map((s) => `<span>${esc(s)}</span>`).join("")}</div>
        </div>
        <div class="project-metrics">
          ${p.metrics
            .map(
              (m) =>
                `<div class="metric-row"><span class="k">${esc(m.label)}</span><span class="v">${esc(m.value)}</span></div>`,
            )
            .join("")}
          <a href="${esc(p.link)}" class="project-link">View writeup →</a>
        </div>
      </div>`;

  const companyProjects = d.projects.filter((p) => p.type === "Company");
  const personalProjects = d.projects.filter((p) => p.type === "Personal");
  const otherProjects = d.projects.filter(
    (p) => p.type !== "Company" && p.type !== "Personal",
  );

  const projectsList = document.getElementById("projects-list");
  let projectsHtml = "";
  if (companyProjects.length) {
    projectsHtml += `
      <div class="project-group-label">
        <span>With companies</span><span class="count">${companyProjects.length}</span>
      </div>
      <div class="projects-list">${companyProjects.map(projectCard).join("")}</div>`;
  }
  if (personalProjects.length) {
    projectsHtml += `
      <div class="project-group-label">
        <span>Personal projects</span><span class="count">${personalProjects.length}</span>
      </div>
      <div class="projects-list">${personalProjects.map(projectCard).join("")}</div>`;
  }
  if (otherProjects.length) {
    projectsHtml += `<div class="projects-list">${otherProjects.map(projectCard).join("")}</div>`;
  }
  projectsList.outerHTML = `<div id="projects-list">${projectsHtml}</div>`;

  // ---------- Contact ----------
  const c = d.contact;
  document.getElementById("contact-heading").textContent = c.heading;
  document.getElementById("contact-body").textContent = c.body;
  document.getElementById("contact-info").innerHTML = `
    <div class="row"><span class="k">Email</span><span class="v"><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></span></div>
    <div class="row"><span class="k">GitHub</span><span class="v"><a href="${esc(c.github.href)}">${esc(c.github.label)}</a></span></div>
    <div class="row"><span class="k">LinkedIn</span><span class="v"><a href="${esc(c.linkedin.href)}">${esc(c.linkedin.label)}</a></span></div>
    <div class="row"><span class="k">Location</span><span class="v">${esc(c.location)}</span></div>
  `;

  const form = document.getElementById("contact-form");
  form.addEventListener("submit", function (ev) {
    if (!c.formEndpoint) {
      ev.preventDefault();
      alert(
        "This form isn't wired up yet. Set contact.formEndpoint in data.js (e.g. a Formspree URL) to start receiving messages.",
      );
    }
    // If formEndpoint is set, the form's action/method (set below) handle the real submit.
  });
  if (c.formEndpoint) {
    form.setAttribute("action", c.formEndpoint);
    form.setAttribute("method", "POST");
  }

  // ---------- Footer ----------
  document.getElementById("footer-copyright").textContent = d.footer.copyright;
  document.getElementById("footer-socials").innerHTML = d.footer.socials
    .map((s) => `<a href="${esc(s.href)}">${esc(s.label)}</a>`)
    .join("");
})();
