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
      /(AI engineer\.?)/i,
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

  const roadmapEl = document.getElementById("hero-roadmap");
  if (roadmapEl && hero.roadmap) {
    roadmapEl.innerHTML = hero.roadmap
      .map((step, i) => {
        const isLast = i === hero.roadmap.length - 1;
        const stepHtml = `
          <div class="roadmap-step roadmap-${step.state}">
            <div class="roadmap-dot"></div>
            <div class="roadmap-label">${esc(step.label)}</div>
            <div class="roadmap-note">${esc(step.note)}</div>
          </div>`;
        const lineHtml = isLast
          ? ""
          : `<div class="roadmap-line roadmap-line-${step.state}"></div>`;
        return stepHtml + lineHtml;
      })
      .join("");
  }

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
          <div class="epoch-tags">${e.tags.map((tag) => `<span>${esc(tag)}</span>`).join("")}</div>
        </div>
      </div>`,
    )
    .join("");

  // ---------- Skills ----------
  document.getElementById("skills-intro").textContent = t(
    d.skillsSection.intro,
  );

  const skillsGrid = document.getElementById("skills-grid");
  skillsGrid.innerHTML = d.skillsSection.categories
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
  // ---------- Custom modal (replaces browser alert/confirm) ----------
  const modalOverlay = document.getElementById("app-modal");
  const modalTitle = document.getElementById("app-modal-title");
  const modalMessage = document.getElementById("app-modal-message");
  const modalClose = document.getElementById("app-modal-close");

  window.showAppModal = function (title, message) {
    if (!modalOverlay) return;
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modalOverlay.hidden = false;
  };
  function hideAppModal() {
    if (modalOverlay) modalOverlay.hidden = true;
  }
  if (modalClose) modalClose.addEventListener("click", hideAppModal);
  if (modalOverlay) {
    modalOverlay.addEventListener("click", function (ev) {
      if (ev.target === modalOverlay) hideAppModal();
    });
  }
  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape") hideAppModal();
  });

  // Shown when someone taps a "coming soon" link button.
  window.showComingSoon = function (label) {
    window.showAppModal(
      "Coming soon",
      label + " is coming soon — currently in progress. Check back shortly!",
    );
  };

  // Shown when someone taps a link for an app/platform that's no longer
  // active (e.g. pulled from the store). Reuses the same modal as "soon".
  window.showInactiveApp = function (label) {
    window.showAppModal(
      "No longer active",
      label + " is no longer active and isn't available to download anymore.",
    );
  };

  // Expands/collapses a truncated project description (See more / See less).
  window.toggleProjectDesc = function (btn) {
    const id = btn.getAttribute("data-target");
    const desc = document.getElementById(id);
    if (!desc) return;
    const expanded = desc.classList.toggle("expanded");
    btn.textContent = expanded ? "See less" : "See more";
  };

  // Small platform icons for link buttons. Generic device-style glyphs,
  // not literal brand logos, to keep things safe and lightweight.
  const platformIcon = (label) => {
    const key = label.toLowerCase();
    if (key.includes("android")) {
      return `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18c0 .55.45 1 1 1h1v3.5a1.5 1.5 0 0 0 3 0V19h2v3.5a1.5 1.5 0 0 0 3 0V19h1c.55 0 1-.45 1-1V9H6v9zM3.5 9A1.5 1.5 0 0 0 2 10.5v6a1.5 1.5 0 0 0 3 0v-6A1.5 1.5 0 0 0 3.5 9zm17 0a1.5 1.5 0 0 0-1.5 1.5v6a1.5 1.5 0 0 0 3 0v-6a1.5 1.5 0 0 0-1.5-1.5zM15.53 3.83l1.3-1.3a.5.5 0 0 0-.7-.7l-1.42 1.42a5.94 5.94 0 0 0-4.42 0L8.87 1.83a.5.5 0 1 0-.7.7l1.3 1.3A6 6 0 0 0 6 9h12a6 6 0 0 0-2.47-5.17zM9.5 6.5a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0zm5 0a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0z"/></svg>`;
    }
    if (
      key.includes("ios") ||
      key.includes("apple") ||
      key.includes("app store")
    ) {
      return `<svg width="12" height="12" viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>`;
    }
    if (key.includes("web") || key.includes("site")) {
      return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"></circle><line x1="3" y1="12" x2="21" y2="12"></line><path d="M12 3a14.5 14.5 0 0 1 0 18 14.5 14.5 0 0 1 0-18z"></path></svg>`;
    }
    return "";
  };

  // Small trailing arrow used on real (external) links to signal that
  // tapping actually navigates somewhere — helps the button read as
  // tappable, especially on touch devices where :hover isn't available.
  const externalArrow = () =>
    `<svg class="link-arrow" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>`;

  const projectLinks = (p) => {
    if (p.links) {
      return `<div class="project-links">${p.links
        .map((l) => {
          if (l.status === "soon") {
            return `<button type="button" class="project-link-btn is-soon" onclick="window.showComingSoon('${esc(l.label)}')">${platformIcon(l.label)}${esc(l.label)} · Soon</button>`;
          }
          if (l.status === "inactive") {
            return `<button type="button" class="project-link-btn is-inactive" onclick="window.showInactiveApp('${esc(l.label)}')">${platformIcon(l.label)}${esc(l.label)} · Inactive</button>`;
          }
          return `<a href="${esc(l.href)}" class="project-link-btn" target="_blank" rel="noopener noreferrer">${platformIcon(l.label)}${esc(l.label)}${externalArrow()}</a>`;
        })
        .join("")}</div>`;
    }
    return `<a href="${esc(p.link)}" class="project-link" target="_blank" rel="noopener noreferrer">View writeup →</a>`;
  };

  // Renders the project's icon area: a single icon, an overlapping stack
  // of icons for an app family (p.icons), or a letter placeholder.
  // Each stacked icon falls back to its initial if the image 404s.
  const projectIcon = (p) => {
    if (p.icons && p.icons.length) {
      return `<div class="project-icon-stack">${p.icons
        .map(
          (ic) => `
          <div class="project-icon project-icon-stacked" title="${esc(ic.label)}">
            <span class="project-icon-fallback">${esc(ic.label.charAt(0))}</span>
            <img src="${esc(ic.src)}" alt="${esc(ic.label)} icon" loading="lazy" onerror="this.style.display='none'">
          </div>`,
        )
        .join("")}</div>`;
    }
    if (p.icon) {
      return `<img class="project-icon" src="${esc(p.icon)}" alt="${esc(p.title)} icon" loading="lazy">`;
    }
    return `<div class="project-icon project-icon-placeholder">${esc(p.title.charAt(0))}</div>`;
  };

  let projectCardCount = 0;
  const projectCard = (p) => {
    const descId = `project-desc-${projectCardCount++}`;
    return `
      <div class="project">
        <div>
          <div class="project-head">
            ${projectIcon(p)}
            <div class="project-head-text">
              <h3>${esc(p.title)}</h3>
              <span class="status${p.status && p.status.toLowerCase() === "inactive" ? " status-inactive" : ""}">${esc(p.status)}</span>
            </div>
          </div>
          ${
            p.availability
              ? `<div class="project-availability"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11z"></path><circle cx="12" cy="10" r="2.5"></circle></svg>${esc(p.availability)}</div>`
              : ""
          }
          ${
            p.contribution
              ? `<div class="project-contribution"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>${esc(p.contribution)}</div>`
              : ""
          }
          <p class="project-desc" id="${descId}">${esc(p.description)}</p>
          <button type="button" class="project-desc-toggle" data-target="${descId}" onclick="window.toggleProjectDesc(this)">See more</button>
          <div class="stack">${p.stack.map((s) => `<span>${esc(s)}</span>`).join("")}</div>
        </div>
        <div class="project-metrics">
          ${p.metrics
            .map(
              (m) =>
                `<div class="metric-row"><span class="k">${esc(m.label)}</span><span class="v">${esc(m.value)}</span></div>`,
            )
            .join("")}
          ${projectLinks(p)}
        </div>
      </div>`;
  };

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

  // Only show the "See more" toggle for descriptions that are actually
  // being clamped/truncated — short descriptions get no button at all.
  document.querySelectorAll(".project-desc").forEach((desc) => {
    const btn = document.querySelector(
      `.project-desc-toggle[data-target="${desc.id}"]`,
    );
    if (!btn) return;
    if (desc.scrollHeight > desc.clientHeight + 1) {
      btn.classList.add("is-visible");
    }
  });

  // ---------- Contact ----------
  const c = d.contact;
  document.getElementById("contact-heading").textContent = c.heading;
  document.getElementById("contact-body").textContent = c.body;
  document.getElementById("contact-info").innerHTML = `
    <div class="row"><span class="k">Email</span><span class="v"><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></span></div>
    <div class="row"><span class="k">GitHub</span><span class="v"><a href="${esc(c.github.href)}" target="_blank" rel="noopener noreferrer">${esc(c.github.label)}</a></span></div>
    <div class="row"><span class="k">LinkedIn</span><span class="v"><a href="${esc(c.linkedin.href)}" target="_blank" rel="noopener noreferrer">${esc(c.linkedin.label)}</a></span></div>
    <div class="row"><span class="k">X</span><span class="v"><a href="${esc(c.x.href)}" target="_blank" rel="noopener noreferrer">${esc(c.x.label)}</a></span></div>
    <div class="row"><span class="k">Location</span><span class="v">${esc(c.location)}</span></div>
  `;

  const form = document.getElementById("contact-form");
  form.addEventListener("submit", function (ev) {
    if (!c.formEndpoint) {
      ev.preventDefault();
      window.showAppModal(
        "Message not sent",
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
    .map(
      (s) =>
        `<a href="${esc(s.href)}" target="_blank" rel="noopener noreferrer">${esc(s.label)}</a>`,
    )
    .join("");
})();
